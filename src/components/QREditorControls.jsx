import React from 'react';

function ColorInput({ label, value, onChange }) {
  return (
    <label className="flex items-center justify-between gap-3 text-sm">
      <span className="text-gray-600">{label}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 w-12 rounded border p-1"
        aria-label={label}
      />
    </label>
  );
}

export default function QREditorControls({
  data,
  setData,
  size,
  setSize,
  margin,
  setMargin,
  ecLevel,
  setEcLevel,
  dotsShape,
  setDotsShape,
  cornerSquareShape,
  setCornerSquareShape,
  cornerDotShape,
  setCornerDotShape,
  fgColor,
  setFgColor,
  bgColor,
  setBgColor,
  logo,
  setLogo,
}) {
  return (
    <div className="w-full lg:w-1/2 xl:w-2/5 space-y-5">
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <h3 className="font-semibold mb-3">Content</h3>
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Type or paste the text / URL for your QR code"
          className="w-full min-h-[90px] resize-y rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/10"
        />
        <p className="text-xs text-gray-500 mt-2">Tip: Keep URLs short for the most reliable scanning.</p>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Size</label>
          <input
            type="range"
            min={128}
            max={1024}
            step={16}
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value, 10))}
            className="w-full"
          />
          <div className="text-xs text-gray-500">{size}px</div>
        </div>
        <div>
          <label className="text-sm text-gray-600">Margin</label>
          <input
            type="range"
            min={0}
            max={40}
            step={2}
            value={margin}
            onChange={(e) => setMargin(parseInt(e.target.value, 10))}
            className="w-full"
          />
          <div className="text-xs text-gray-500">{margin}px</div>
        </div>
        <div>
          <label className="text-sm text-gray-600">Error correction</label>
          <select
            value={ecLevel}
            onChange={(e) => setEcLevel(e.target.value)}
            className="w-full rounded-md border px-2 py-2"
          >
            <option value="L">L (7%)</option>
            <option value="M">M (15%)</option>
            <option value="Q">Q (25%)</option>
            <option value="H">H (30%)</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600">Dots shape</label>
          <select
            value={dotsShape}
            onChange={(e) => setDotsShape(e.target.value)}
            className="w-full rounded-md border px-2 py-2"
          >
            <option value="square">Square</option>
            <option value="dots">Dots</option>
            <option value="rounded">Rounded</option>
            <option value="extra-rounded">Extra rounded</option>
            <option value="classy">Classy</option>
            <option value="classy-rounded">Classy rounded</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600">Corner squares</label>
          <select
            value={cornerSquareShape}
            onChange={(e) => setCornerSquareShape(e.target.value)}
            className="w-full rounded-md border px-2 py-2"
          >
            <option value="square">Square</option>
            <option value="extra-rounded">Extra rounded</option>
            <option value="dot">Dot</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600">Corner dots</label>
          <select
            value={cornerDotShape}
            onChange={(e) => setCornerDotShape(e.target.value)}
            className="w-full rounded-md border px-2 py-2"
          >
            <option value="square">Square</option>
            <option value="dot">Dot</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm grid gap-4">
        <h3 className="font-semibold">Colors</h3>
        <ColorInput label="Foreground" value={fgColor} onChange={setFgColor} />
        <ColorInput label="Background" value={bgColor} onChange={setBgColor} />
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm grid gap-3">
        <h3 className="font-semibold">Logo (optional)</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) { setLogo(null); return; }
            const url = URL.createObjectURL(file);
            setLogo(url);
          }}
          className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border file:bg-black file:px-3 file:py-2 file:text-white hover:file:bg-black/90"
        />
        <p className="text-xs text-gray-500">Transparent PNGs work best. Use a high error correction level when placing a logo.</p>
      </div>
    </div>
  );
}
