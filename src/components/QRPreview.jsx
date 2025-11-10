import React, { useEffect, useRef } from 'react';

// We implement a light-weight QR renderer using a small dependency-free encoder via canvas
// Instead of adding packages, we'll use a tiny QR insertion based on "qr-code-styling"-like API with a CDN fallback
// However, to keep things self-contained in this sandbox, we generate via a dynamic import of a tiny encoder.

// Minimal QR generation using qrcode library via ESM dynamic import from jspm CDN

export default function QRPreview({
  data,
  size,
  margin,
  ecLevel,
  fgColor,
  bgColor,
  dotsShape,
  cornerSquareShape,
  cornerDotShape,
  logo,
}) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function render() {
      const { default: QRCode } = await import('https://cdn.skypack.dev/qrcode');
      if (!isMounted) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = size;
      canvas.height = size;

      const options = {
        errorCorrectionLevel: ecLevel,
        margin: Math.round(margin / 8),
        color: { dark: fgColor, light: bgColor },
        width: size,
      };

      // Draw base QR
      await QRCode.toCanvas(canvas, data || ' ', options);

      const ctx = canvas.getContext('2d');

      // Optional: draw a simple mask to hint at shapes (visual only)
      // We simulate dot/rounded styles by overlaying a slight corner radius mask
      if (dotsShape !== 'square') {
        const radius = dotsShape === 'rounded' ? 2 : dotsShape === 'extra-rounded' ? 4 : 1.5;
        // soft mask around finder patterns to emulate style
        ctx.globalCompositeOperation = 'destination-in';
        ctx.beginPath();
        const r = radius;
        const w = size;
        const h = size;
        ctx.moveTo(r, 0);
        ctx.arcTo(w, 0, w, h, r);
        ctx.arcTo(w, h, 0, h, r);
        ctx.arcTo(0, h, 0, 0, r);
        ctx.arcTo(0, 0, w, 0, r);
        ctx.closePath();
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
      }

      // Draw logo in center if provided
      if (logo) {
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        logoImg.onload = () => {
          const logoSize = Math.floor(size * 0.2);
          const x = (size - logoSize) / 2;
          const y = (size - logoSize) / 2;

          // white background pad
          ctx.fillStyle = '#ffffffcc';
          const pad = Math.round(logoSize * 0.15);
          const bgSize = logoSize + pad;
          const bgX = (size - bgSize) / 2;
          const bgY = (size - bgSize) / 2;
          ctx.roundRect(bgX, bgY, bgSize, bgSize, Math.max(4, pad / 2));
          ctx.fill();

          ctx.drawImage(logoImg, x, y, logoSize, logoSize);
        };
        logoImg.src = logo;
      }

      // Update downloadable PNG preview
      const url = canvas.toDataURL('image/png');
      if (imgRef.current) imgRef.current.src = url;
    }

    render();
    return () => {
      isMounted = false;
    };
  }, [data, size, margin, ecLevel, fgColor, bgColor, dotsShape, cornerSquareShape, cornerDotShape, logo]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = imgRef.current?.src || '';
    link.click();
  };

  return (
    <div className="w-full lg:w-1/2 xl:w-3/5 flex flex-col items-center gap-4">
      <div className="w-full grid place-items-center">
        <canvas ref={canvasRef} className="rounded-xl border bg-white" />
      </div>
      <div className="flex items-center gap-3">
        <button onClick={handleDownload} className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white hover:bg-black/90">
          <span>Download PNG</span>
        </button>
        <a ref={imgRef} className="hidden" aria-hidden />
      </div>
    </div>
  );
}
