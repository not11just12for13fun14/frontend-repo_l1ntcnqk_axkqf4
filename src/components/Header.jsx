import React from 'react';
import { QrCode, Settings } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-black text-white">
            <QrCode size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">QR Studio</h1>
            <p className="text-xs text-gray-500">Create, style, and download beautiful QR codes</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-gray-600">
          <Settings size={18} />
          <span className="text-sm">Live editor</span>
        </div>
      </div>
    </header>
  );
}
