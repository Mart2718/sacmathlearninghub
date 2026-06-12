/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, GraduationCap, BookOpen, Layers, Sparkles } from 'lucide-react';
import { MathCategory } from '../types';

interface AppPortalHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: 'all' | MathCategory;
  setSelectedCategory: (cat: 'all' | MathCategory) => void;
  activeFilterType: 'all' | 'builtin' | 'external';
  setActiveFilterType: (type: 'all' | 'builtin' | 'external') => void;
  totalCount: number;
}

export default function AppPortalHeader({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  activeFilterType,
  setActiveFilterType,
  totalCount,
}: AppPortalHeaderProps) {
  return (
    <header className="bg-slate-950 text-white border-b-4 border-[#BA0C2F] shadow-md" id="portal-header">
      {/* Top Banner: University Branding block */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Branding text */}
        <div className="flex items-center gap-3">
          <div className="bg-[#BA0C2F] text-white p-2.5 rounded-lg shadow-inner flex items-center justify-center border border-red-500">
            <GraduationCap size={32} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-widest text-red-500 font-sans uppercase">
                Santa Ana College
              </span>
              <div className="w-1 h-3 bg-red-600 rounded"></div>
              <span className="text-[11px] font-mono text-gray-400 font-medium">Est. 1915</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-white mt-0.5">
              CalcBridge <span className="text-[#e2e8f0]">Learning Hub</span>
            </h1>
            <p className="text-xs text-gray-300 mt-1 max-w-xl font-sans font-medium">
              High-visibility digital resources coordinated by the SAC Math Department to help math students master foundational and advanced concepts.
            </p>
          </div>
        </div>

        {/* Info quick badges */}
        <div className="flex gap-2 self-start md:self-center font-sans">
          <div className="bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-md text-center">
            <span className="block text-[10px] text-gray-400 font-bold uppercase font-mono tracking-wider">Loaded Modules</span>
            <span className="text-lg font-black text-red-500">{totalCount} Applets</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-md text-center">
            <span className="block text-[10px] text-gray-400 font-bold uppercase font-mono tracking-wider">WCAG 2.0 Standard</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              Accessible Tones
            </span>
          </div>
        </div>

      </div>

      {/* Control Area (Search, Tabs, and filter scopes) */}
      <div className="bg-slate-900/90 py-5 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-4 items-stretch justify-between">
          
          {/* Main search input with Lucide icon */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by topic, keyword, or application title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-750 text-white rounded-md pl-11 pr-4 py-2.5 text-sm font-sans placeholder-gray-500 focus:outline-none focus:border-[#BA0C2F] focus:ring-1 focus:ring-[#BA0C2F] transition-all"
              id="search-input"
            />
          </div>

          {/* Categorized Filter Tabs (Algebra, Trig, Calculus) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            {/* Primary Category Switcher */}
            <div className="flex bg-slate-950 rounded-md p-1 border border-slate-800" id="category-filter-tabs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-1.5 text-xs font-sans font-bold rounded transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#BA0C2F] text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                All Courses
              </button>
              <button
                onClick={() => setSelectedCategory('algebra')}
                className={`px-4 py-1.5 text-xs font-sans font-bold rounded transition-colors ${
                  selectedCategory === 'algebra'
                    ? 'bg-[#BA0C2F] text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                Algebra
              </button>
              <button
                onClick={() => setSelectedCategory('trig')}
                className={`px-4 py-1.5 text-xs font-sans font-bold rounded transition-colors ${
                  selectedCategory === 'trig'
                    ? 'bg-[#BA0C2F] text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                Trigonometry
              </button>
              <button
                onClick={() => setSelectedCategory('calculus')}
                className={`px-4 py-1.5 text-xs font-sans font-bold rounded transition-colors ${
                  selectedCategory === 'calculus'
                    ? 'bg-[#BA0C2F] text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                Calculus
              </button>
            </div>

            {/* Filter by App Source - Built-in vs Netlify iframe */}
            <div className="flex bg-slate-950 rounded-md p-1 border border-slate-800" id="widget-source-tabs">
              <button
                onClick={() => setActiveFilterType('all')}
                className={`px-2.5 py-1.5 text-[11px] font-sans font-bold rounded transition-colors ${
                  activeFilterType === 'all'
                    ? 'bg-gray-850 text-white border-b-2 border-red-600'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                All Apps
              </button>
              <button
                onClick={() => setActiveFilterType('builtin')}
                className={`px-2.5 py-1.5 text-[11px] font-sans font-bold rounded transition-colors ${
                  activeFilterType === 'builtin'
                    ? 'bg-gray-850 text-white border-b-2 border-red-600'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Direct Built-in Labs
              </button>
              <button
                onClick={() => setActiveFilterType('external')}
                className={`px-2.5 py-1.5 text-[11px] font-sans font-bold rounded transition-colors ${
                  activeFilterType === 'external'
                    ? 'bg-gray-850 text-white border-b-2 border-red-600'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                External Applets
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
