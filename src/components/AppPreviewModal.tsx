/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { X, ExternalLink, RefreshCw, Smartphone, Monitor } from 'lucide-react';
import { MathApp } from '../types';
import { BuiltInWidgetContainer } from './MathWidgets';

interface AppPreviewModalProps {
  app: MathApp | null;
  onClose: () => void;
}

export default function AppPreviewModal({ app, onClose }: AppPreviewModalProps) {
  if (!app) return null;

  const [iframeKey, setIframeKey] = React.useState<number>(0);
  const [isMobilePreview, setIsMobilePreview] = React.useState<boolean>(false);

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-stretch md:items-center justify-center bg-slate-950/80 backdrop-blur-sm p-0 md:p-4"
      id="app-preview-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Animated content frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-white flex flex-col w-full h-full md:max-w-6xl md:h-[90vh] md:rounded-2xl shadow-2xl border-t-8 border-[#BA0C2F] overflow-hidden"
      >
        
        {/* Top bar control room */}
        <div className="bg-zinc-950 text-white px-5 py-4 flex items-center justify-between gap-4 border-b-4 border-black">
          <div className="flex items-center gap-3">
            <span className="text-[9px] uppercase font-mono font-black tracking-widest px-2.5 py-1 rounded bg-[#BA0C2F] border border-[#d60e35]">
              {app.isBuiltIn ? 'Direct Lab' : 'IFrame Applet'}
            </span>
            <div>
              <h2 id="modal-title" className="text-sm md:text-base font-sans font-black tracking-tight text-white leading-none uppercase">
                {app.title}
              </h2>
              <p className="hidden md:block text-[11px] font-sans text-zinc-400 font-medium mt-1 leading-none uppercase tracking-wide">
                Subject Focus: <span className="font-extrabold text-[#BA0C2F]">{app.category}</span>
              </p>
            </div>
          </div>

          {/* Action cluster */}
          <div className="flex items-center gap-2">
            
            {/* View layout simulators (for testing responsive behaviors) */}
            {!app.isBuiltIn && (
              <div className="hidden sm:flex bg-zinc-900 rounded p-0.5 border border-zinc-800">
                <button
                  onClick={() => setIsMobilePreview(false)}
                  className={`p-1.5 rounded text-xs transition-colors duration-200 ${!isMobilePreview ? 'bg-[#BA0C2F] text-white font-extrabold' : 'text-zinc-400 hover:text-white'}`}
                  title="Desktop Preview Scale"
                >
                  <Monitor size={14} />
                </button>
                <button
                  onClick={() => setIsMobilePreview(true)}
                  className={`p-1.5 rounded text-xs transition-colors duration-200 ${isMobilePreview ? 'bg-[#BA0C2F] text-white font-extrabold' : 'text-zinc-400 hover:text-white'}`}
                  title="Mobile App Simulator Scale"
                >
                  <Smartphone size={14} />
                </button>
              </div>
            )}

            {!app.isBuiltIn && app.url && (
              <>
                <button
                  onClick={handleRefresh}
                  className="p-2 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 rounded font-medium text-xs transition-colors border border-zinc-800"
                  title="Reload Applet Mirror"
                >
                  <RefreshCw size={14} />
                </button>
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#BA0C2F] hover:bg-[#990000] text-white rounded font-sans font-extrabold text-xs flex items-center gap-1.5 transition-colors uppercase tracking-wider cursor-pointer"
                  id="tab-redirect"
                >
                  <ExternalLink size={13} />
                  <span className="hidden sm:inline">New Tab</span>
                </a>
              </>
            )}

            <div className="w-[1px] h-6 bg-zinc-800 mx-1"></div>

            {/* Exit/Close Button */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#BA0C2F] text-zinc-400 hover:text-white rounded transition-colors focus:ring-2 focus:ring-[#BA0C2F]"
              aria-label="Exit current educational activity"
              id="btn-close-modal"
            >
              <X size={18} />
            </button>

          </div>
        </div>

        {/* Info advice panel overlay */}
        <div className="bg-zinc-50 border-b border-zinc-200 px-6 py-3 flex flex-wrap items-center justify-between text-xs font-sans font-semibold text-zinc-700 gap-2">
          <span className="italic border-l-2 border-red-100 pl-2 text-zinc-650">🎯 {app.description}</span>
          {!app.isBuiltIn && (
            <span className="text-[10px] text-zinc-500 bg-white border border-zinc-200 px-2 py-0.5 rounded uppercase font-mono tracking-wider font-extrabold">
              Tip: Interactive controls are fully active. Use mouse actions or sliders.
            </span>
          )}
        </div>

        {/* Content body platform play-field */}
        <div className="flex-1 bg-zinc-100 flex items-center justify-center p-6 overflow-y-auto">
          {app.isBuiltIn && app.builtInKey ? (
            <div className="w-full max-w-4xl">
              <BuiltInWidgetContainer widgetKey={app.builtInKey} />
            </div>
          ) : (
            <div 
              className={`w-full h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ${
                isMobilePreview ? 'max-w-sm md:max-w-md h-[95%]' : 'max-w-full h-full'
              }`}
            >
              {app.url ? (
                <iframe
                  key={iframeKey}
                  src={app.url}
                  title={app.title}
                  className="w-full h-full border-0"
                  referrerPolicy="no-referrer"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                  loading="lazy"
                  id="applet-iframe-player"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-gray-500 font-sans">
                  <p className="font-semibold">App URL is currently not available.</p>
                  <p className="text-xs">Please contact the mathematics department to verify hosting parameters.</p>
                </div>
              )}
            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
}
