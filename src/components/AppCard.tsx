/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MathApp } from '../types';
import { ExternalLink, Play, BookOpen, Star, Sparkles } from 'lucide-react';

interface AppCardProps {
  app: MathApp;
  onSelect: (app: MathApp) => void;
}

export default function AppCard({ app, onSelect }: AppCardProps) {
  // Category coloring configs
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'algebra':
        return {
          bg: 'bg-amber-50 text-amber-900 border-amber-250',
          label: 'Algebra / Pre-Calc',
          symbol: 'x²'
        };
      case 'trig':
        return {
          bg: 'bg-red-50 text-red-900 border-red-200',
          label: 'Trigonometry',
          symbol: 'sin θ'
        };
      case 'calculus':
        return {
          bg: 'bg-blue-50 text-blue-900 border-blue-200',
          label: 'Calculus',
          symbol: '∫ dy/dx'
        };
      default:
        return {
          bg: 'bg-zinc-100 text-zinc-800 border-zinc-200',
          label: 'Mathematics',
          symbol: '∑'
        };
    }
  };

  const getDifficultyColor = (diff?: string) => {
    switch (diff) {
      case 'Introductory':
        return 'text-emerald-800 bg-emerald-50 border-emerald-200';
      case 'Intermediate':
        return 'text-blue-800 bg-blue-50 border-blue-200';
      case 'Advanced':
        return 'text-[#BA0C2F] bg-red-50 border-red-200 font-bold';
      default:
        return 'text-zinc-700 bg-zinc-50 border-zinc-200';
    }
  };

  const themeTheme = getCategoryTheme(app.category);

  return (
    <article 
      className="relative bg-white border-2 border-zinc-200 rounded-2xl shadow-sm hover:shadow-md hover:border-[#BA0C2F] transition-all flex flex-col focus-within:ring-2 focus-within:ring-[#BA0C2F] outline-none duration-300" 
      id={`app-card-${app.id}`}
    >
      <div className="absolute overflow-hidden w-full h-1.5 rounded-t-2xl bg-zinc-100 flex top-0 left-0">
        {/* Color bar matching the category */}
        <div className={`w-full ${app.category === 'algebra' ? 'bg-amber-500' : app.category === 'trig' ? 'bg-[#BA0C2F]' : 'bg-blue-600'}`}></div>
      </div>

      <div className="p-6 pt-7 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Core Metadata */}
        <div className="space-y-3">
          
          {/* Header row with badges and scientific category symbol */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`text-[10px] font-sans font-black uppercase px-2.5 py-0.5 rounded border ${themeTheme.bg}`}>
                {themeTheme.label}
              </span>
              {app.difficulty && (
                <span className={`text-[10px] font-sans font-medium px-2 py-0.5 rounded border ${getDifficultyColor(app.difficulty)}`}>
                  {app.difficulty}
                </span>
              )}
            </div>

            {/* Custom symbol container like the math center concept */}
            <span className="text-xs font-mono font-extrabold text-zinc-400 bg-zinc-50 border border-zinc-100 px-2 py-0.5 rounded">
              {themeTheme.symbol}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-base font-sans font-extrabold text-zinc-950 tracking-tight leading-snug">
            {app.title}
          </h2>

          {/* Description with high contrast quote/italic style on the left side */}
          <p className="text-xs font-sans text-zinc-650 leading-relaxed font-semibold italic border-l-2 border-red-50 pl-2.5">
            {app.description}
          </p>
        </div>

        {/* Math terms / topics tag clouds */}
        <div className="space-y-4">
          {app.topics && app.topics.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {app.topics.map((topic, i) => (
                <span 
                  key={i} 
                  className="text-[10px] font-mono font-semibold bg-zinc-50 text-zinc-600 px-1.5 py-0.5 rounded border border-zinc-150"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          <div className="w-full h-[1px] bg-zinc-100 my-1"></div>

          {/* Action Trigger row */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(app)}
              className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-950 hover:bg-[#BA0C2F] text-white text-xs font-sans font-extrabold py-2 px-3 rounded uppercase tracking-wider transition-colors duration-300 shadow-sm cursor-pointer"
              id={`btn-launch-${app.id}`}
            >
              <Play size={12} fill="currentColor" />
              {app.isBuiltIn ? 'Launch Lab' : 'Interactive App'}
            </button>
            
            {!app.isBuiltIn && app.url && (
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Launch fully full-screen in a new tab"
                className="p-2 border border-zinc-200 text-zinc-750 hover:border-zinc-900 rounded transition-colors focus:ring-2 focus:ring-[#BA0C2F]"
                id={`lnk-external-${app.id}`}
              >
                <ExternalLink size={13} />
              </a>
            )}
          </div>

        </div>

      </div>
    </article>
  );
}
