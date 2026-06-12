/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { mathApps } from './data/appsData';
import { MathApp, MathCategory } from './types';
import AppPortalHeader from './components/AppPortalHeader';
import AppCard from './components/AppCard';
import AppPreviewModal from './components/AppPreviewModal';
import { BookOpen, GraduationCap, ArrowRight, HelpCircle, UserCheck, Inbox, Flame } from 'lucide-react';

export default function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | MathCategory>('all');
  const [activeFilterType, setActiveFilterType] = useState<'all' | 'builtin' | 'external'>('all');
  const [selectedApp, setSelectedApp] = useState<MathApp | null>(null);

  // Dynamic filter lists
  const filteredApps = useMemo(() => {
    return mathApps.filter((app) => {
      // 1. Course category filter
      if (selectedCategory !== 'all' && app.category !== selectedCategory) {
        return false;
      }

      // 2. Resource type filter (Built-in vs External Netlify)
      if (activeFilterType === 'builtin' && !app.isBuiltIn) return false;
      if (activeFilterType === 'external' && app.isBuiltIn) return false;

      // 3. Text search filter
      const searchTarget = searchTerm.toLowerCase().trim();
      if (!searchTarget) return true;

      const titleMatch = app.title.toLowerCase().includes(searchTarget);
      const descMatch = app.description.toLowerCase().includes(searchTarget);
      const topicsMatch = app.topics.some((topic) => topic.toLowerCase().includes(searchTarget));
      const categoryMatch = app.category.toLowerCase().includes(searchTarget);

      return titleMatch || descMatch || topicsMatch || categoryMatch;
    });
  }, [searchTerm, selectedCategory, activeFilterType]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setActiveFilterType('all');
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-between selection:bg-red-100 selection:text-red-950" id="portal-root">
      
      {/* 1. Header Navigation System */}
      <AppPortalHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        activeFilterType={activeFilterType}
        setActiveFilterType={setActiveFilterType}
        totalCount={mathApps.length}
      />

      {/* 2. Main content arena */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex-1 w-full space-y-8">
        
        {/* Welcome Study Hub Guidelines banner */}
        <section className="bg-white border-2 border-zinc-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-stretch shadow-sm transition-all hover:border-[#BA0C2F] duration-300" id="welcome-banner">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#BA0C2F] rounded-full"></span>
              <h2 className="font-sans font-extrabold text-lg text-zinc-900 uppercase tracking-tight">
                Student Learning Guidelines
              </h2>
            </div>
            
            <p className="text-xs text-zinc-600 font-medium leading-relaxed font-sans max-w-3xl border-l-2 border-zinc-100 pl-3">
              Welcome to the digital activity portal for Santa Ana College's Math Department. These highly interactive math micro-experiments have been designed by math faculty to match your course syllabus. Engage with the graphs, shift the variables, and study complex curves visually to ace your tests! 
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex items-center justify-center shrink-0 bg-red-50 text-[#BA0C2F] rounded-full font-bold font-mono text-xs">1</div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 font-sans tracking-wide uppercase">Choose Your Core Topic</h4>
                  <p className="text-[10px] text-zinc-500 font-sans mt-1 leading-normal">Filter using custom categories above to find relevant exam materials.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex items-center justify-center shrink-0 bg-red-50 text-[#BA0C2F] rounded-full font-bold font-mono text-xs">2</div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 font-sans tracking-wide uppercase">Deconstruct Sliders</h4>
                  <p className="text-[10px] text-zinc-500 font-sans mt-1 leading-normal">Interacting directly moves graphs in real-time to reinforce memory.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex items-center justify-center shrink-0 bg-red-50 text-[#BA0C2F] rounded-full font-bold font-mono text-xs">3</div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 font-sans tracking-wide uppercase">Visit Math Tutoring</h4>
                  <p className="text-[10px] text-zinc-500 font-sans mt-1 leading-normal">Save your observations and discuss challenging problems with tutors.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick info promo box */}
          <div className="w-full md:w-64 bg-zinc-900 text-white rounded-xl p-5 flex flex-col justify-between border-b-4 border-[#BA0C2F] shadow-sm">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-mono font-black tracking-widest text-[#BA0C2F] flex items-center gap-1.5">
                <Flame size={12} className="animate-pulse" />
                Featured Topic Labs
              </span>
              <h3 className="text-base font-extrabold font-sans tracking-tight">Trig Core Basics</h3>
              <p className="text-[11px] text-zinc-400 font-sans mt-1 leading-normal">
                Explore our three fully-integrated math units built directly inside this browser system!
              </p>
            </div>
            
            <button 
              onClick={() => {
                setSelectedCategory('trig');
                setActiveFilterType('builtin');
              }}
              className="mt-4 w-full bg-[#BA0C2F] hover:bg-[#a8001e] text-white font-extrabold text-xs font-sans py-2 px-3.5 rounded uppercase tracking-wider transition-colors cursor-pointer"
              id="featured-launch-btn"
            >
              Examine Built-ins
            </button>
          </div>
        </section>

        {/* 3. Grid of application cards */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
            <span className="text-xs font-mono font-bold text-gray-500 tracking-wider uppercase">
              Displaying {filteredApps.length} Course App{filteredApps.length === 1 ? '' : 'lets'}
            </span>
            {searchTerm && (
              <button 
                onClick={handleResetFilters}
                className="text-xs font-sans font-semibold text-red-700 hover:text-red-900 hover:underline"
                id="reset-filter-link"
              >
                Clear all filters
              </button>
            )}
          </div>

          <AnimatePresence mode="popLayout">
            {filteredApps.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                id="app-cards-grid"
              >
                {filteredApps.map((app) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    key={app.id}
                  >
                    <AppCard 
                      app={app} 
                      onSelect={(selected) => setSelectedApp(selected)} 
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* No search results card */
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-gray-200 rounded-lg p-12 text-center max-w-xl mx-auto flex flex-col items-center justify-center space-y-4"
                id="no-results-panel"
              >
                <div className="bg-red-50 text-red-700 p-3.5 rounded-full border border-red-100">
                  <Inbox size={32} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-sans font-bold text-lg text-gray-900">No Math Applications Found</h3>
                  <p className="text-xs text-gray-500 max-w-md font-sans">
                    We couldn't find any activities matching <span className="font-mono font-bold text-red-700 font-semibold">"{searchTerm}"</span> or under the selected parameters. Try adjusting your category choice.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-sans font-bold text-xs py-2 px-4 rounded-md transition-colors shadow-sm cursor-pointer"
                  id="reset-search-btn"
                >
                  Reset Filtering Parameters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </main>

      {/* 4. Overlay Player Modal (Supports both IFrame & Custom Widgets) */}
      <AnimatePresence>
        {selectedApp && (
          <AppPreviewModal 
            app={selectedApp} 
            onClose={() => setSelectedApp(null)} 
          />
        )}
      </AnimatePresence>

      {/* 5. Accessible Footer */}
      <footer className="bg-zinc-950 text-white border-t-4 border-black mt-16 font-sans select-none" id="portal-footer">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
          
          {/* Department column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap size={22} className="text-[#BA0C2F]" />
              <span className="font-extrabold uppercase tracking-widest text-sm font-sans text-white">SAC Math Department</span>
            </div>
            <p className="text-zinc-400 font-medium leading-relaxed">
              Serving the academic and professional advancement of students in Orange County through high-quality visual modeling and dedicated educational technology solutions.
            </p>
          </div>

          {/* Quick links & resources */}
          <div className="space-y-3 font-medium">
            <span className="font-black text-zinc-300 uppercase tracking-widest text-[10px] block">Useful SAC Outlets</span>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href="https://sac.edu" target="_blank" rel="noopener noreferrer" className="hover:text-[#BA0C2F] transition-colors hover:underline">
                  Santa Ana College Home Office
                </a>
              </li>
              <li>
                <a href="https://sac.edu/AcademicProgs/MathSci/Math" target="_blank" rel="noopener noreferrer" className="hover:text-[#BA0C2F] transition-colors hover:underline">
                  Math Science Divisional Directory
                </a>
              </li>
              <li>
                <a href="https://sac.edu/StudentServices/MESA" target="_blank" rel="noopener noreferrer" className="hover:text-[#BA0C2F] transition-colors hover:underline">
                  MESA student STEM center
                </a>
              </li>
            </ul>
          </div>

          {/* Campus coordinates / Accessibility standards */}
          <div className="space-y-3 text-zinc-400 font-medium">
            <span className="font-black text-zinc-300 uppercase tracking-widest text-[10px] block">Contact & Support</span>
            <p className="leading-relaxed text-zinc-400">
              Rancho Santiago Community College District Office<br />
              Santa Ana College Math Department<br />
              1530 W. 17th Street, Santa Ana, CA 92706
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-widest">
                SYSTEM STATUS: OPERATIONAL
              </p>
            </div>
          </div>

        </div>
        
        {/* District Rights bottom rail */}
        <div className="bg-black py-5 border-t border-zinc-900 text-center text-[10px] text-zinc-500 font-mono font-extrabold uppercase tracking-wider">
          © {new Date().getFullYear()} Santa Ana College (SAC). Licensed for public and student study purposes.
        </div>
      </footer>

    </div>
  );
}
