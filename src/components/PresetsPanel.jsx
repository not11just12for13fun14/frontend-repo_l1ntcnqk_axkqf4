import React from 'react';

const presets = [
  { name: 'Classic', fg: '#111112', bg: '#ffffff' },
  { name: 'Midnight', fg: '#0f172a', bg: '#e2e8f0' },
  { name: 'Emerald', fg: '#065f46', bg: '#ecfdf5' },
  { name: 'Royal', fg: '#1d4ed8', bg: '#eff6ff' },
  { name: 'Sunset', fg: '#b45309', bg: '#fffbeb' },
];

export default function PresetsPanel({ setFgColor, setBgColor }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Quick styles</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {presets.map((p) => (
          <button
            key={p.name}
            onClick={() => { setFgColor(p.fg); setBgColor(p.bg); }}
            className="group relative rounded-lg border p-3 text-left hover:shadow"
          >
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full border" style={{ background: p.fg }} />
              <span className="h-6 w-6 rounded-full border" style={{ background: p.bg }} />
            </div>
            <div className="mt-2 text-xs text-gray-600">{p.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
