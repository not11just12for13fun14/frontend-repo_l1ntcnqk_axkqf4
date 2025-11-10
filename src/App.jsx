import React, { useState } from 'react';
import Header from './components/Header.jsx';
import QREditorControls from './components/QREditorControls.jsx';
import QRPreview from './components/QRPreview.jsx';
import PresetsPanel from './components/PresetsPanel.jsx';

export default function App() {
  const [data, setData] = useState('https://example.com');
  const [size, setSize] = useState(320);
  const [margin, setMargin] = useState(16);
  const [ecLevel, setEcLevel] = useState('M');
  const [dotsShape, setDotsShape] = useState('square');
  const [cornerSquareShape, setCornerSquareShape] = useState('square');
  const [cornerDotShape, setCornerDotShape] = useState('square');
  const [fgColor, setFgColor] = useState('#111111');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [logo, setLogo] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 grid gap-6">
        <section className="rounded-2xl border bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8">
            <QREditorControls
              data={data}
              setData={setData}
              size={size}
              setSize={setSize}
              margin={margin}
              setMargin={setMargin}
              ecLevel={ecLevel}
              setEcLevel={setEcLevel}
              dotsShape={dotsShape}
              setDotsShape={setDotsShape}
              cornerSquareShape={cornerSquareShape}
              setCornerSquareShape={setCornerSquareShape}
              cornerDotShape={cornerDotShape}
              setCornerDotShape={setCornerDotShape}
              fgColor={fgColor}
              setFgColor={setFgColor}
              bgColor={bgColor}
              setBgColor={setBgColor}
              logo={logo}
              setLogo={setLogo}
            />
            <QRPreview
              data={data}
              size={size}
              margin={margin}
              ecLevel={ecLevel}
              fgColor={fgColor}
              bgColor={bgColor}
              dotsShape={dotsShape}
              cornerSquareShape={cornerSquareShape}
              cornerDotShape={cornerDotShape}
              logo={logo}
            />
          </div>
        </section>

        <PresetsPanel setFgColor={setFgColor} setBgColor={setBgColor} />

        <section className="text-center text-sm text-gray-500">
          <p>
            Scan results depend on contrast and error correction. For logos or complex backgrounds, raise error correction and size.
          </p>
        </section>
      </main>
    </div>
  );
}
