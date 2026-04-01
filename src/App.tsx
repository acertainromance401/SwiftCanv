/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Menu, 
  RotateCcw, 
  Pencil, 
  Undo2, 
  Redo2, 
  LayoutGrid, 
  Layers, 
  Save,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Utilities ---

const hslToRgb = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [
    Math.round(255 * f(0)),
    Math.round(255 * f(8)),
    Math.round(255 * f(4)),
  ];
};

const rgbToHex = (r: number, g: number, b: number) => {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
};

// --- Components ---

const Slider = ({ label, value, max, onChange, unit = '', gradient }: { 
  label: string, 
  value: number, 
  max: number, 
  onChange: (val: number) => void,
  unit?: string,
  gradient?: string
}) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
      <span>{label}</span>
      <span className="text-slate-900">{value}{unit}</span>
    </div>
    <div className="relative h-1.5 w-full rounded-full overflow-hidden bg-slate-100">
      <div 
        className="absolute inset-0 h-full w-full" 
        style={{ background: gradient || '#e2e8f0' }} 
      />
      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
      />
      <div 
        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-[#0846ED] rounded-full shadow-sm pointer-events-none transition-all duration-75"
        style={{ left: `calc(${(value / max) * 100}% - 10px)` }}
      />
    </div>
  </div>
);

export default function App() {
  const [h, setH] = useState(224);
  const [s, setS] = useState(94);
  const [l, setL] = useState(48);

  const [rgb, setRgb] = useState([8, 70, 237]);
  const [hex, setHex] = useState('#0846ED');

  useEffect(() => {
    const [r, g, b] = hslToRgb(h, s, l);
    setRgb([r, g, b]);
    setHex(rgbToHex(r, g, b));
  }, [h, s, l]);

  const history = [
    '#FF5722', '#00BCD4', '#7C4DFF', '#FFC107', '#00E676', 
    '#FF5252', '#E0E0E0', '#212121'
  ];

  return (
    <div className="min-h-screen bg-[#F5F6F7] pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Menu size={20} className="text-slate-600" />
          </button>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight text-[#0846ED]">The Invisible Gallery</span>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Studio</span>
          </div>
        </div>
        <button className="px-6 py-2 bg-[#6384FF] text-white font-bold text-sm rounded-full shadow-lg shadow-blue-200 hover:scale-105 transition-transform">
          Export
        </button>
      </header>

      <main className="max-w-md mx-auto px-4 pt-6 space-y-6">
        {/* Studio Palette Card */}
        <section className="bg-white rounded-[40px] p-8 shadow-sm space-y-8">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h1 className="font-display font-extrabold text-3xl tracking-tight text-slate-900">Studio Palette</h1>
              <p className="text-slate-500 text-sm font-medium">Fine-tune your creative signature</p>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-slate-50 text-slate-400 rounded-full hover:text-slate-600 transition-colors">
                <Pencil size={18} />
              </button>
              <button className="p-3 bg-slate-50 text-slate-400 rounded-full hover:text-slate-600 transition-colors">
                <RotateCcw size={18} />
              </button>
            </div>
          </div>

          {/* Color Wheel Visualization */}
          <div className="relative flex justify-center items-center py-4">
            <div className="w-64 h-64 rounded-full p-8 relative flex items-center justify-center">
              {/* The Rainbow Ring */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)',
                  maskImage: 'radial-gradient(transparent 55%, black 56%)',
                  WebkitMaskImage: 'radial-gradient(transparent 55%, black 56%)',
                }}
              />
              
              {/* Inner Circle with Hex */}
              <div className="w-40 h-40 bg-white rounded-full shadow-inner flex flex-col items-center justify-center space-y-2">
                <div 
                  className="w-20 h-20 rounded-full shadow-lg transition-colors duration-200"
                  style={{ backgroundColor: hex }}
                />
                <span className="font-display font-extrabold text-2xl tracking-tight text-slate-900">{hex}</span>
              </div>

              {/* Indicator on Ring */}
              <div 
                className="absolute w-4 h-4 bg-white border-2 border-slate-900 rounded-full shadow-md transition-all duration-200"
                style={{
                  transform: `rotate(${h - 90}deg) translate(110px) rotate(-${h - 90}deg)`
                }}
              />
            </div>
          </div>
        </section>

        {/* HSL Precision */}
        <section className="bg-white/60 rounded-[32px] p-6 space-y-6">
          <h2 className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">HSL Precision</h2>
          <div className="space-y-6">
            <Slider 
              label="Hue" 
              value={h} 
              max={360} 
              unit="°"
              onChange={setH} 
              gradient="linear-gradient(to right, red, yellow, lime, aqua, blue, magenta, red)"
            />
            <Slider 
              label="Saturation" 
              value={s} 
              max={100} 
              unit="%"
              onChange={setS} 
              gradient={`linear-gradient(to right, #cbd5e1, ${hex})`}
            />
            <Slider 
              label="Lightness" 
              value={l} 
              max={100} 
              unit="%"
              onChange={setL} 
              gradient={`linear-gradient(to right, black, ${hex}, white)`}
            />
          </div>
        </section>

        {/* RGB Channels */}
        <section className="bg-white/60 rounded-[32px] p-6 space-y-6">
          <h2 className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">RGB Channels</h2>
          <div className="space-y-4">
            {['R', 'G', 'B'].map((channel, i) => (
              <div key={channel} className="flex items-center gap-4">
                <span className="text-[11px] font-bold text-slate-400 w-4">{channel}</span>
                <div className="flex-1 relative h-1 bg-slate-100 rounded-full">
                  <div 
                    className="absolute h-full rounded-full"
                    style={{ 
                      width: `${(rgb[i] / 255) * 100}%`,
                      backgroundColor: i === 0 ? '#ef4444' : i === 1 ? '#3b82f6' : '#8b5cf6'
                    }}
                  />
                  <input 
                    type="range" 
                    min="0" 
                    max="255" 
                    value={rgb[i]}
                    readOnly
                    className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
                  />
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-sm"
                    style={{ 
                      left: `calc(${(rgb[i] / 255) * 100}% - 6px)`,
                      backgroundColor: i === 0 ? '#ef4444' : i === 1 ? '#3b82f6' : '#8b5cf6'
                    }}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-900 w-8 text-right">{rgb[i]}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Active Palette */}
        <section className="bg-white rounded-[40px] p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-display font-bold text-xl text-slate-900">Active Palette</h2>
            <button className="text-[11px] font-bold text-[#0846ED] uppercase tracking-wider">Save Collection</button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div 
              className="h-48 rounded-3xl p-6 flex flex-col justify-end"
              style={{ backgroundColor: hex }}
            >
              <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Primary</span>
            </div>
            <div className="space-y-4">
              <div 
                className="h-[92px] rounded-3xl flex items-center justify-center"
                style={{ backgroundColor: `hsl(${h}, ${s}%, ${Math.min(l + 20, 100)}%)` }}
              >
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Light</span>
              </div>
              <div 
                className="h-[92px] rounded-3xl flex items-center justify-center"
                style={{ backgroundColor: `hsl(${h}, ${s}%, ${Math.max(l - 20, 0)}%)` }}
              >
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">Deep</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {[15, 30, 45, 60].map(offset => (
              <div 
                key={offset}
                className="aspect-square rounded-2xl"
                style={{ backgroundColor: `hsl(${(h + offset) % 360}, ${s}%, ${l}%)` }}
              />
            ))}
          </div>
        </section>

        {/* Studio History */}
        <section className="space-y-4 px-2">
          <h2 className="text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">Studio History</h2>
          <div className="flex flex-wrap gap-3">
            {history.map((color, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-full cursor-pointer shadow-sm"
                style={{ backgroundColor: color }}
                onClick={() => {
                  // Simple logic to parse hex back to HSL would go here
                  setHex(color);
                }}
              />
            ))}
          </div>
        </section>

        {/* Artist Tip */}
        <section className="bg-white rounded-[32px] p-6 flex gap-6 items-center shadow-sm">
          <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
            <img 
              src="https://picsum.photos/seed/abstract/200/200" 
              alt="Art" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#0846ED] uppercase tracking-widest">Artist Tip</span>
            <p className="text-xs text-slate-500 leading-relaxed">
              Use <span className="font-bold text-slate-900">Secondary Sunset</span> to complement your current palette highlights.
            </p>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-sm">
        <div className="glass rounded-full p-2 flex items-center justify-between shadow-2xl shadow-slate-200 border border-white/20">
          <div className="flex items-center gap-1 px-2">
            <button className="p-3 text-slate-400 hover:text-slate-600 transition-colors">
              <Undo2 size={20} />
            </button>
            <button className="p-3 text-slate-400 hover:text-slate-600 transition-colors">
              <Redo2 size={20} />
            </button>
          </div>
          
          <div className="h-8 w-[1px] bg-slate-200" />
          
          <div className="flex items-center gap-1 px-2">
            <button className="p-3 text-slate-400 hover:text-slate-600 transition-colors">
              <LayoutGrid size={20} />
            </button>
            <button className="p-3 text-slate-400 hover:text-slate-600 transition-colors">
              <Layers size={20} />
            </button>
          </div>

          <button className="w-14 h-14 bg-[#0846ED] text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-300 hover:scale-105 transition-transform">
            <Save size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
