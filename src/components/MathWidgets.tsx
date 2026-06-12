/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Check, ArrowRightLeft, HelpCircle } from 'lucide-react';

// Help helper for GCD (for fraction reduction)
const gcd = (a: number, b: number): number => {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
};

// Helper to reduce fractions
const reduceFraction = (numerator: number, denominator: number): [number, number] => {
  const common = gcd(numerator, denominator);
  return [numerator / common, denominator / common];
};

// Helper: Standard angles and their exact mathematical attributes
const STANDARD_ANGLES = [
  { deg: 0, radStr: '0', sinStr: '0', cosStr: '1', tanStr: '0', cscStr: 'Undefined', secStr: '1', cotStr: 'Undefined', xStr: '1', yStr: '0' },
  { deg: 30, radStr: 'π/6', sinStr: '1/2', cosStr: '√3/2', tanStr: '√3/3', cscStr: '2', secStr: '2√3/3', cotStr: '√3', xStr: '√3/2', yStr: '1/2' },
  { deg: 45, radStr: 'π/4', sinStr: '√2/2', cosStr: '√2/2', tanStr: '1', cscStr: '√2', secStr: '√2', cotStr: '1', xStr: '√2/2', yStr: '√2/2' },
  { deg: 60, radStr: 'π/3', sinStr: '√3/2', cosStr: '1/2', tanStr: '√3', cscStr: '2√3/3', secStr: '2', cotStr: '√3/3', xStr: '1/2', yStr: '√3/2' },
  { deg: 90, radStr: 'π/2', sinStr: '1', cosStr: '0', tanStr: 'Undefined', cscStr: '1', secStr: 'Undefined', cotStr: '0', xStr: '0', yStr: '1' },
  { deg: 120, radStr: '2π/3', sinStr: '√3/2', cosStr: '-1/2', tanStr: '-√3', cscStr: '2√3/3', secStr: '-2', cotStr: '-√3/3', xStr: '-1/2', yStr: '√3/2' },
  { deg: 135, radStr: '3π/4', sinStr: '√2/2', cosStr: '-√2/2', tanStr: '-1', cscStr: '√2', secStr: '-√2', cotStr: '-1', xStr: '-√2/2', yStr: '√2/2' },
  { deg: 150, radStr: '5π/6', sinStr: '1/2', cosStr: '-√3/2', tanStr: '-√3/3', cscStr: '2', secStr: '-2√3/3', cotStr: '-√3', xStr: '-√3/2', yStr: '1/2' },
  { deg: 180, radStr: 'π', sinStr: '0', cosStr: '-1', tanStr: '0', cscStr: 'Undefined', secStr: '-1', cotStr: 'Undefined', xStr: '-1', yStr: '0' },
  { deg: 210, radStr: '7π/6', sinStr: '-1/2', cosStr: '-√3/2', tanStr: '√3/3', cscStr: '-2', secStr: '-2√3/3', cotStr: '√3', xStr: '-√3/2', yStr: '-1/2' },
  { deg: 225, radStr: '5π/4', sinStr: '-√2/2', cosStr: '-√2/2', tanStr: '1', cscStr: '-√2', secStr: '-√2', cotStr: '1', xStr: '-√2/2', yStr: '-√2/2' },
  { deg: 240, radStr: '4π/3', sinStr: '-√3/2', cosStr: '-1/2', tanStr: '√3', cscStr: '-2√3/3', secStr: '-2', cotStr: '√3/3', xStr: '-1/2', yStr: '-√3/2' },
  { deg: 270, radStr: '3π/2', sinStr: '-1', cosStr: '0', tanStr: 'Undefined', cscStr: '-1', secStr: 'Undefined', cotStr: '0', xStr: '0', yStr: '-1' },
  { deg: 300, radStr: '5π/3', sinStr: '-√3/2', cosStr: '1/2', tanStr: '-√3', cscStr: '-2√3/3', secStr: '2', cotStr: '-√3/3', xStr: '1/2', yStr: '-√3/2' },
  { deg: 315, radStr: '7π/4', sinStr: '-√2/2', cosStr: '√2/2', tanStr: '-1', cscStr: '-√2', secStr: '√2', cotStr: '-1', xStr: '√2/2', yStr: '-√2/2' },
  { deg: 330, radStr: '11π/6', sinStr: '-1/2', cosStr: '√3/2', tanStr: '-√3/3', cscStr: '-2', secStr: '2√3/3', cotStr: '-√3', xStr: '√3/2', yStr: '-1/2' },
  { deg: 360, radStr: '2π', sinStr: '0', cosStr: '1', tanStr: '0', cscStr: 'Undefined', secStr: '1', cotStr: 'Undefined', xStr: '1', yStr: '0' }
];

// ==========================================
// 1. RADIAN DEGREE CONVERTER
// ==========================================
export function RadianDegreeConverterWidget() {
  const [degreeMode, setDegreeMode] = useState<boolean>(true); // true = degree to radian, false = radian to degree
  const [degreeInput, setDegreeInput] = useState<number>(45);
  const [radianNumerator, setRadianNumerator] = useState<number>(1);
  const [radianDenominator, setRadianDenominator] = useState<number>(4);

  // Sync inputs
  const handleDegreeChange = (val: number) => {
    // Round to nearest integer for simple fraction formulas
    setDegreeInput(val);
    // Convert to fractions of pi
    const angle = val % 360;
    const absAngle = Math.abs(angle);
    if (absAngle === 0) {
      setRadianNumerator(0);
      setRadianDenominator(1);
    } else {
      const [num, den] = reduceFraction(absAngle, 180);
      setRadianNumerator(angle < 0 ? -num : num);
      setRadianDenominator(den);
    }
  };

  const handleRadianFractionChange = (num: number, den: number) => {
    const denominator = den === 0 ? 1 : den;
    setRadianNumerator(num);
    setRadianDenominator(denominator);
    // Calc degree value
    const degVal = Math.round((num / denominator) * 180);
    setDegreeInput(degVal);
  };

  // Preset picker
  const applyPreset = (deg: number) => {
    handleDegreeChange(deg);
  };

  // Convert for rendering coordinates
  const renderAngleRad = (degreeInput * Math.PI) / 180;
  const targetX = 80 + 60 * Math.cos(-renderAngleRad);
  const targetY = 80 + 60 * Math.sin(-renderAngleRad);

  return (
    <div className="bg-white p-5 rounded-lg border-2 border-gray-200 shadow-sm" id="widget-radian-degree">
      <div className="flex flex-col md:flex-row items-stretch gap-6">
        
        {/* Left column: Controls & Formula */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-sans font-bold text-lg text-gray-900 border-l-4 border-red-700 pl-2">Angle Conversion Lab</h3>
            <button 
              onClick={() => setDegreeMode(!degreeMode)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-medium transition-colors"
              id="toggle-conv-mode"
            >
              <ArrowRightLeft size={13} />
              Switch Mode
            </button>
          </div>

          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-500">
              Current Mode
            </span>
            <p className="text-sm font-sans font-semibold text-gray-800">
              {degreeMode ? 'Degrees (°) to Radians (rad)' : 'Radians (rad) to Degrees (°)'}
            </p>
          </div>

          {degreeMode ? (
            <div className="space-y-3">
              <label className="block text-xs font-medium text-gray-700">
                Input Angle: <span className="font-mono text-sm font-bold text-red-700">{degreeInput}°</span>
              </label>
              <input
                type="range"
                min="-360"
                max="720"
                step="5"
                value={degreeInput}
                onChange={(e) => handleDegreeChange(parseInt(e.target.value))}
                className="w-full accent-red-700 cursor-pointer"
                id="deg-slider"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={degreeInput}
                  onChange={(e) => handleDegreeChange(parseInt(e.target.value) || 0)}
                  className="w-24 px-2 py-1 text-sm border border-gray-300 rounded font-mono text-center focus:outline-none focus:ring-1 focus:ring-red-600"
                  id="deg-num-input"
                />
                <span className="text-sm self-center font-sans text-gray-600">degrees</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <label className="block text-xs font-medium text-gray-700">Radian Fraction:</label>
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    value={radianNumerator}
                    onChange={(e) => handleRadianFractionChange(parseInt(e.target.value) || 0, radianDenominator)}
                    className="w-16 px-1.5 py-1 text-sm border border-gray-300 rounded font-mono text-center focus:outline-none focus:ring-1 focus:ring-red-600"
                    id="rad-num-input"
                  />
                  <div className="w-12 h-0.5 bg-gray-500 my-1"></div>
                  <input
                    type="number"
                    value={radianDenominator}
                    onChange={(e) => handleRadianFractionChange(radianNumerator, parseInt(e.target.value) || 1)}
                    className="w-16 px-1.5 py-1 text-sm border border-gray-300 rounded font-mono text-center focus:outline-none focus:ring-1 focus:ring-red-600"
                    id="rad-den-input"
                  />
                </div>
                <span className="text-xl font-medium font-sans">×</span>
                <span className="text-lg font-bold font-mono text-red-700">π</span>
                <span className="text-sm text-gray-500 font-sans ml-2">radians</span>
              </div>
            </div>
          )}

          {/* Preset Buttons */}
          <div className="space-y-1.5">
            <span className="block text-xs font-medium text-gray-500">Quick Standard Angles:</span>
            <div className="flex flex-wrap gap-1">
              {[30, 45, 60, 90, 120, 135, 180, 270, 360].map((angle) => (
                <button
                  key={angle}
                  onClick={() => applyPreset(angle)}
                  className={`px-2 py-1 text-xs border rounded transition-colors ${
                    degreeInput === angle
                      ? 'bg-red-700 text-white border-red-700 font-semibold'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {angle}°
                </button>
              ))}
            </div>
          </div>

          {/* Mathematical Proof Steps */}
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 font-mono">Conversion Formula:</h4>
            {degreeMode ? (
              <div className="space-y-1 text-sm font-mono text-gray-700">
                <p>θ_rad = θ_deg × (π / 180)</p>
                <p className="text-xs text-gray-500">Substitute:</p>
                <p className="text-red-700 font-semibold">
                  {degreeInput}° × (π / 180) ={' '}
                  {degreeInput === 0 ? (
                    '0'
                  ) : (
                    <>
                      {radianNumerator === 1 ? '' : radianNumerator === -1 ? '-' : radianNumerator}π
                      {radianDenominator === 1 ? '' : ` / ${radianDenominator}`}
                    </>
                  )}{' '}
                  rad
                </p>
                <p className="text-[11px] text-gray-400 mt-1 font-sans">
                  Decimal: {(degreeInput * Math.PI / 180).toFixed(4)} radians
                </p>
              </div>
            ) : (
              <div className="space-y-1 text-sm font-mono text-gray-700">
                <p>θ_deg = θ_rad × (180 / π)</p>
                <p className="text-xs text-gray-500">Substitute:</p>
                <p className="text-red-700 font-semibold">
                  ({radianNumerator}π / {radianDenominator}) × (180 / π) = {degreeInput}°
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Dynamic Angle Visualizer (SVG gauges) */}
        <div className="w-full md:w-52 flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg border border-gray-100">
          <span className="text-xs font-bold font-mono text-gray-500 mb-1">Visualizer Tracker</span>
          
          <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 160 160">
              {/* Grid axes */}
              <line x1="10" y1="80" x2="150" y2="80" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="80" y1="10" x2="80" y2="150" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* Outer circle boundary */}
              <circle cx="80" cy="80" r="60" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="80" cy="80" r="4" fill="#000000" />
              
              {/* Highlight active arc path */}
              {degreeInput !== 0 && (
                <path
                  d={`M ${80 + 30} 80 A 30 30 0 ${Math.abs(degreeInput) > 180 ? 1 : 0} ${degreeInput < 0 ? 1 : 0} ${
                    80 + 30 * Math.cos(-renderAngleRad)
                  } ${80 + 30 * Math.sin(-renderAngleRad)}`}
                  fill="none"
                  stroke="#BA0C2F"
                  strokeWidth="3.5"
                />
              )}

              {/* Laser vector ray */}
              <line 
                x1="80" 
                y1="80" 
                x2={targetX} 
                y2={targetY} 
                stroke="#000000" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />
              
              {/* End arrow head */}
              <circle cx={targetX} cy={targetY} r="4.5" fill="#BA0C2F" />
            </svg>
            
            {/* Quadrant labelings */}
            <div className="absolute top-1 right-1 text-[10px] font-mono text-gray-400 font-bold">QI</div>
            <div className="absolute top-1 left-2 text-[10px] font-mono text-gray-400 font-bold">QII</div>
            <div className="absolute bottom-1 left-2 text-[10px] font-mono text-gray-400 font-bold">QIII</div>
            <div className="absolute bottom-1 right-2 text-[10px] font-mono text-gray-400 font-bold">QIV</div>
          </div>

          <div className="mt-3 text-center">
            <span className="block text-xs text-gray-400 font-sans font-medium uppercase">Current Quadrant</span>
            <span className="text-sm font-bold font-sans text-gray-800">
              {degreeInput % 360 === 0 
                ? 'Axis boundaries' 
                : (degreeInput % 360 + 360) % 360 < 90 ? 'Quadrant I' 
                : (degreeInput % 360 + 360) % 360 < 180 ? 'Quadrant II'
                : (degreeInput % 360 + 360) % 360 < 270 ? 'Quadrant III' : 'Quadrant III / IV'
              }
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 2. 6 TRIG VALUES EXPLORER
// ==========================================
export function SixTrigValuesWidget() {
  const [activeDeg, setActiveDeg] = useState<number>(30);
  const [customAngle, setCustomAngle] = useState<string>('30');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const currentData = STANDARD_ANGLES.find(a => a.deg === activeDeg);

  const handleCustomInput = (text: string) => {
    setCustomAngle(text);
    const parsed = parseInt(text, 10);
    if (isNaN(parsed)) {
      setErrorMsg('Please enter a valid integer angle');
      return;
    }
    setErrorMsg('');
    // Normalize to standard angle values if in range, otherwise calculate approximations
    const norm = ((parsed % 360) + 360) % 360;
    const matched = STANDARD_ANGLES.find(a => a.deg === norm);
    if (matched) {
      setActiveDeg(matched.deg);
    } else {
      // Find closest standard angle just to anchor calculations, or handle custom decimal approximation
      setActiveDeg(norm);
    }
  };

  // Safe calculators for any custom degree
  const computeApprox = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    const sinV = Math.sin(rad);
    const cosV = Math.cos(rad);
    const tanV = Math.abs(cosV) < 1e-10 ? NaN : Math.tan(rad);
    const cscV = Math.abs(sinV) < 1e-10 ? NaN : 1 / sinV;
    const secV = Math.abs(cosV) < 1e-10 ? NaN : 1 / cosV;
    const cotV = Math.abs(sinV) < 1e-10 ? NaN : 1 / Math.tan(rad);

    return {
      sin: isNaN(sinV) ? 'Undefined' : sinV.toFixed(4),
      cos: isNaN(cosV) ? 'Undefined' : cosV.toFixed(4),
      tan: isNaN(tanV!) || Math.abs(tanV!) > 1000 ? 'Undefined' : tanV!.toFixed(4),
      csc: isNaN(cscV) || Math.abs(cscV) > 1000 ? 'Undefined' : cscV.toFixed(4),
      sec: isNaN(secV) || Math.abs(secV) > 1000 ? 'Undefined' : secV.toFixed(4),
      cot: isNaN(cotV) || Math.abs(cotV) > 1000 ? 'Undefined' : cotV.toFixed(4),
    };
  };

  const getExactOrApprox = (key: 'sinStr' | 'cosStr' | 'tanStr' | 'cscStr' | 'secStr' | 'cotStr', approxVal: string) => {
    if (currentData) {
      return currentData[key];
    }
    return approxVal;
  };

  const customCalc = computeApprox(activeDeg);

  // Unit circle coordinate ray SVG setup
  const renderAngleRad = (activeDeg * Math.PI) / 180;
  const unitX = Math.cos(renderAngleRad);
  const unitY = Math.sin(renderAngleRad);
  const graphX = 80 + 55 * unitX;
  const graphY = 80 - 55 * unitY; // Negated because SVG canvas Y increases downward

  return (
    <div className="bg-white p-5 rounded-lg border-2 border-gray-200 shadow-sm" id="widget-six-trig">
      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        
        {/* SVG Circle visualizer */}
        <div className="w-full lg:w-64 bg-gray-50 flex flex-col items-center justify-center p-4 rounded-lg border border-gray-100">
          <span className="text-xs font-mono font-bold text-gray-500 mb-2">Interactive Cartesian Grid</span>
          
          <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 160 160">
              {/* Axes lines */}
              <line x1="8" y1="80" x2="152" y2="80" stroke="#000000" strokeWidth="1.5" />
              <line x1="80" y1="8" x2="80" y2="152" stroke="#000000" strokeWidth="1.5" />
              
              {/* Grid helpers */}
              <circle cx="80" cy="80" r="55" fill="none" stroke="#d1d5db" strokeWidth="1" />
              
              {/* Interactive ray */}
              <line 
                x1="80" 
                y1="80" 
                x2={graphX} 
                y2={graphY} 
                stroke="#C21807" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
              
              {/* Dropped triangle helper lines for trig relations */}
              <line 
                x1={graphX} 
                y1="80" 
                x2={graphX} 
                y2={graphY} 
                stroke="#4b5563" 
                strokeWidth="1" 
                strokeDasharray="2 2"
              />
              <line 
                x1="80" 
                y1="80" 
                x2={graphX} 
                y2="80" 
                stroke="#1f2937" 
                strokeWidth="1.5" 
              />
              
              {/* Coord endpoint marker */}
              <circle cx={graphX} cy={graphY} r="5" fill="#000000" />
            </svg>
          </div>

          <div className="mt-4 text-center space-y-1">
            <p className="text-xs text-gray-500 font-medium">Coordinate Ray Point P(x, y)</p>
            <p className="text-sm font-mono font-bold text-red-700 bg-white px-3 py-1 rounded shadow-sm border border-gray-100">
              P({currentData ? `${currentData.xStr}, ${currentData.yStr}` : `${unitX.toFixed(2)}, ${unitY.toFixed(2)}`})
            </p>
          </div>
        </div>

        {/* Calculations display */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-gray-100 pb-3">
            <div>
              <h3 className="font-sans font-bold text-lg text-gray-900 border-l-4 border-red-700 pl-2">6 Trigonometric Ratios</h3>
              <p className="text-xs text-gray-500">Solve all foundational unit-circle functions for standard angles</p>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-gray-600">Degrees:</label>
              <input
                type="text"
                value={customAngle}
                onChange={(e) => handleCustomInput(e.target.value)}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-center font-mono text-sm focus:outline-none focus:ring-1 focus:ring-red-600"
                maxLength={4}
                id="custom-trig-input"
              />
              <span className="text-sm text-gray-500 font-sans">°</span>
            </div>
          </div>

          {errorMsg && <p className="text-xs text-red-600 font-mono font-bold">{errorMsg}</p>}

          {/* Quick angle selection buttons */}
          <div className="space-y-1">
            <span className="block text-xs font-semibold text-gray-500">Pick any circle division:</span>
            <div className="grid grid-cols-6 md:grid-cols-9 gap-1">
              {[0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360].map((angle) => (
                <button
                  key={angle}
                  onClick={() => {
                    setActiveDeg(angle);
                    setCustomAngle(angle.toString());
                    setErrorMsg('');
                  }}
                  className={`px-1.5 py-1 text-xs border rounded transition-colors font-mono font-medium ${
                    activeDeg === angle
                      ? 'bg-red-700 text-white border-red-700 font-bold shadow-sm'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {angle}°
                </button>
              ))}
            </div>
          </div>

          {/* Result Matrix of the 6 Trig Values */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            
            {/* SINE */}
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200 transition-all hover:shadow-sm">
              <span className="text-xs font-mono font-bold text-gray-500 block">Sine Ratio</span>
              <span className="text-sm font-bold block text-gray-950 font-mono">sin(θ) = y</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-base font-bold font-mono text-red-700">
                  {getExactOrApprox('sinStr', customCalc.sin)}
                </span>
                {currentData && currentData.sinStr !== customCalc.sin && (
                  <span className="text-[10px] text-gray-400 font-mono">({customCalc.sin})</span>
                )}
              </div>
            </div>

            {/* COSINE */}
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200 transition-all hover:shadow-sm">
              <span className="text-xs font-mono font-bold text-gray-500 block">Cosine Ratio</span>
              <span className="text-sm font-bold block text-gray-950 font-mono">cos(θ) = x</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-base font-bold font-mono text-red-700">
                  {getExactOrApprox('cosStr', customCalc.cos)}
                </span>
                {currentData && currentData.cosStr !== customCalc.cos && (
                  <span className="text-[10px] text-gray-400 font-mono">({customCalc.cos})</span>
                )}
              </div>
            </div>

            {/* TANGENT */}
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200 transition-all hover:shadow-sm">
              <span className="text-xs font-mono font-bold text-gray-500 block">Tangent Ratio</span>
              <span className="text-sm font-bold block text-gray-950 font-mono">tan(θ) = y / x</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className={`text-base font-bold font-mono ${getExactOrApprox('tanStr', customCalc.tan) === 'Undefined' ? 'text-gray-400' : 'text-red-700'}`}>
                  {getExactOrApprox('tanStr', customCalc.tan)}
                </span>
                {currentData && currentData.tanStr !== 'Undefined' && currentData.tanStr !== customCalc.tan && (
                  <span className="text-[10px] text-gray-400 font-mono">({customCalc.tan})</span>
                )}
              </div>
            </div>

            {/* COSECANT (csc) */}
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200 transition-all hover:shadow-sm">
              <span className="text-xs font-mono font-bold text-gray-500 block">Cosecant Ratio</span>
              <span className="text-sm font-bold block text-gray-950 font-mono">csc(θ) = 1 / y</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className={`text-base font-bold font-mono ${getExactOrApprox('cscStr', customCalc.csc) === 'Undefined' ? 'text-gray-400' : 'text-red-700'}`}>
                  {getExactOrApprox('cscStr', customCalc.csc)}
                </span>
                {currentData && currentData.cscStr !== 'Undefined' && currentData.cscStr !== customCalc.csc && (
                  <span className="text-[10px] text-gray-400 font-mono">({customCalc.csc})</span>
                )}
              </div>
            </div>

            {/* SECANT (sec) */}
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200 transition-all hover:shadow-sm">
              <span className="text-xs font-mono font-bold text-gray-500 block">Secant Ratio</span>
              <span className="text-sm font-bold block text-gray-950 font-mono">sec(θ) = 1 / x</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className={`text-base font-bold font-mono ${getExactOrApprox('secStr', customCalc.sec) === 'Undefined' ? 'text-gray-400' : 'text-red-700'}`}>
                  {getExactOrApprox('secStr', customCalc.sec)}
                </span>
                {currentData && currentData.secStr !== 'Undefined' && currentData.secStr !== customCalc.sec && (
                  <span className="text-[10px] text-gray-400 font-mono">({customCalc.sec})</span>
                )}
              </div>
            </div>

            {/* COTANGENT (cot) */}
            <div className="p-3 bg-gray-50 rounded-md border border-gray-200 transition-all hover:shadow-sm">
              <span className="text-xs font-mono font-bold text-gray-500 block">Cotangent Ratio</span>
              <span className="text-sm font-bold block text-gray-950 font-mono">cot(θ) = x / y</span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className={`text-base font-bold font-mono ${getExactOrApprox('cotStr', customCalc.cot) === 'Undefined' ? 'text-gray-400' : 'text-red-700'}`}>
                  {getExactOrApprox('cotStr', customCalc.cot)}
                </span>
                {currentData && currentData.cotStr !== 'Undefined' && currentData.cotStr !== customCalc.cot && (
                  <span className="text-[10px] text-gray-400 font-mono">({customCalc.cot})</span>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 3. INVERSE TRIG MASTER
// ==========================================
type InverseFuncType = 'arcsin' | 'arccos' | 'arctan';

export function InverseTrigMasterWidget() {
  const [funcType, setFuncType] = useState<InverseFuncType>('arcsin');
  const [inputValue, setInputValue] = useState<number>(0.5); // Domain input

  // Standard math computations
  const evaluateInverse = (type: InverseFuncType, val: number) => {
    let resultRad = 0;
    if (type === 'arcsin') {
      resultRad = Math.asin(val);
    } else if (type === 'arccos') {
      resultRad = Math.acos(val);
    } else {
      resultRad = Math.atan(val); // arctan input goes theoretically from -inf to +inf
    }
    const resultDeg = (resultRad * 180) / Math.PI;
    return { rad: resultRad, deg: resultDeg };
  };

  const currentResult = evaluateInverse(funcType, inputValue);

  const getExactLabel = (type: InverseFuncType, val: number): { rad: string, deg: string } => {
    // Return exact textbook matches for common inputs to help precalc students!
    const key = `${type}_${val}`;
    const standardLookup: Record<string, { rad: string, deg: string }> = {
      'arcsin_1': { rad: 'π/2', deg: '90°' },
      'arcsin_0.866': { rad: 'π/3', deg: '60°' },
      'arcsin_0.707': { rad: 'π/4', deg: '45°' },
      'arcsin_0.5': { rad: 'π/6', deg: '30°' },
      'arcsin_0': { rad: '0', deg: '0°' },
      'arcsin_-0.5': { rad: '-π/6', deg: '-30°' },
      'arcsin_-0.707': { rad: '-π/4', deg: '-45°' },
      'arcsin_-0.866': { rad: '-π/3', deg: '-60°' },
      'arcsin_-1': { rad: '-π/2', deg: '-90°' },

      'arccos_1': { rad: '0', deg: '0°' },
      'arccos_0.866': { rad: 'π/6', deg: '30°' },
      'arccos_0.707': { rad: 'π/4', deg: '45°' },
      'arccos_0.5': { rad: 'π/3', deg: '60°' },
      'arccos_0': { rad: 'π/2', deg: '90°' },
      'arccos_-0.5': { rad: '2π/3', deg: '120°' },
      'arccos_-0.707': { rad: '3π/4', deg: '135°' },
      'arccos_-0.866': { rad: '5π/6', deg: '150°' },
      'arccos_-1': { rad: 'π', deg: '180°' },

      'arctan_1.732': { rad: 'π/3', deg: '60°' },
      'arctan_1': { rad: 'π/4', deg: '45°' },
      'arctan_0.577': { rad: 'π/6', deg: '30°' },
      'arctan_0': { rad: '0', deg: '0°' },
      'arctan_-0.577': { rad: '-π/6', deg: '-30°' },
      'arctan_-1': { rad: '-π/4', deg: '-45°' },
      'arctan_-1.732': { rad: '-π/3', deg: '-60°' },
    };

    // Tolerate floating rounding offsets
    const keys = Object.keys(standardLookup);
    const matchedKey = keys.find(k => {
      const parts = k.split('_');
      if (parts[0] !== type) return false;
      const numVal = parseFloat(parts[1]);
      return Math.abs(numVal - val) < 0.03;
    });

    if (matchedKey) {
      return standardLookup[matchedKey];
    }

    return {
      rad: `${currentResult.rad.toFixed(4)} rad`,
      deg: `${Math.round(currentResult.deg)}°`
    };
  };

  const exactMatches = getExactLabel(funcType, inputValue);

  // Graph elements: Draw unit circle highlighted sectors for principal ranges
  const getSectorPath = (type: InverseFuncType) => {
    if (type === 'arcsin' || type === 'arctan') {
      // Quadrants I & IV: -90deg to +90deg (in SVG: -Math.PI/2 to Math.PI/2)
      // SVG angles are inverted, right half.
      return "M 80 25 A 55 55 0 0 1 80 135";
    } else {
      // Quadrants I & II: 0 to 180deg (in SVG: 0 to Math.PI)
      // Top half.
      return "M 135 80 A 55 55 0 0 0 25 80";
    }
  };

  // Target angle laser rendering
  const radAngle = currentResult.rad;
  const rayX = 80 + 55 * Math.cos(-radAngle);
  const rayY = 80 + 55 * Math.sin(-radAngle);

  // Define scale limits for sliders
  const isTrigArcTan = funcType === 'arctan';
  const minSlider = -1.0;
  const maxSlider = 1.0;

  return (
    <div className="bg-white p-5 rounded-lg border-2 border-gray-200 shadow-sm" id="widget-inverse-trig">
      <div className="flex flex-col md:flex-row items-stretch gap-6">
        
        {/* Left Side: Formula, Restricted Domain and Input slider */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-1.5 border-b border-gray-100 pb-3" id="inverse-selector">
            {(['arcsin', 'arccos', 'arctan'] as InverseFuncType[]).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setFuncType(type);
                  // Readjust domains when shifting functions
                  if (type === 'arctan' && Math.abs(inputValue) === 1.0) {
                    setInputValue(1.0);
                  } else {
                    setInputValue(0.5);
                  }
                }}
                className={`px-3 py-1 text-sm font-sans font-bold capitalize rounded transition-colors ${
                  funcType === type
                    ? 'bg-red-700 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-750 hover:bg-gray-250'
                }`}
              >
                {type}(x)
              </button>
            ))}
          </div>

          {/* Quick explanations of local branch bounds */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-2.5 rounded border border-gray-200">
            <div>
              <span className="font-semibold block text-gray-500 font-mono">Restricted Domain [x]</span>
              <span className="font-mono font-bold text-gray-800">
                {funcType === 'arcsin' && '[-1.0, 1.0]'}
                {funcType === 'arccos' && '[-1.0, 1.0]'}
                {funcType === 'arctan' && '( -∞ , +∞ ) [Explore -3 to 3]'}
              </span>
            </div>
            <div>
              <span className="font-semibold block text-gray-500 font-mono">Principal Range [y (θ)]</span>
              <span className="font-mono font-bold text-gray-800">
                {funcType === 'arcsin' && '[-π/2, π/2] (Q I & IV)'}
                {funcType === 'arccos' && '[0, π] (Q I & II)'}
                {funcType === 'arctan' && '(-π/2, π/2) (Q I & IV)'}
              </span>
            </div>
          </div>

          {/* Input Control Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Choose input value <span className="font-mono font-bold text-red-700">x</span>:
              </label>
              <div className="flex gap-1.5 font-mono text-sm font-semibold bg-gray-100 px-2 py-0.5 rounded text-gray-800">
                <span>x =</span>
                <span className="text-red-700">{inputValue.toFixed(3)}</span>
              </div>
            </div>

            <input
              type="range"
              min={isTrigArcTan ? -3.0 : minSlider}
              max={isTrigArcTan ? 3.0 : maxSlider}
              step="0.05"
              value={inputValue}
              onChange={(e) => setInputValue(parseFloat(e.target.value))}
              className="w-full accent-red-700 cursor-pointer"
              id="inverse-slider"
            />

            {/* Quick value presets */}
            <div className="flex flex-wrap gap-1">
              <span className="text-xs font-medium text-gray-400 self-center mr-1">Presets:</span>
              {(isTrigArcTan ? [-1.732, -1, -0.577, 0, 0.577, 1, 1.732] : [-1, -0.866, -0.707, -0.5, 0, 0.5, 0.707, 0.866, 1]).map((val) => (
                <button
                  key={val}
                  onClick={() => setInputValue(val)}
                  className={`px-2 py-0.5 text-xs border rounded transition-colors font-mono ${
                    Math.abs(inputValue - val) < 0.01
                      ? 'bg-red-700 text-white border-red-700 font-bold'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {val === -0.866 ? '-√3/2' 
                    : val === 0.866 ? '√3/2' 
                    : val === -0.707 ? '-√2/2'
                    : val === 0.707 ? '√2/2'
                    : val === -0.577 ? '-√3/3'
                    : val === 0.577 ? '√3/3'
                    : val === 1.732 ? '√3'
                    : val === -1.732 ? '-√3'
                    : val.toString()}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-red-50 rounded-lg border border-red-100 space-y-1">
            <span className="block text-xs uppercase tracking-wider text-red-800 font-bold font-mono">Calculated Output:</span>
            <p className="text-sm font-sans font-medium text-gray-700">
              The principal angle <span className="font-mono font-semibold">θ</span> where <span className="font-mono font-medium font-bold text-gray-950">{funcType === 'arcsin' ? 'sin' : funcType === 'arccos' ? 'cos' : 'tan'}(θ) = {inputValue.toFixed(3)}</span>:
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div className="bg-white border border-red-200 px-3 py-1.5 rounded shadow-sm text-center">
                <span className="block text-[10px] text-gray-400 font-sans uppercase">Radians</span>
                <span className="text-lg font-bold font-mono text-red-700">{exactMatches.rad}</span>
              </div>
              <div className="bg-white border border-red-200 px-3 py-1.5 rounded shadow-sm text-center">
                <span className="block text-[10px] text-gray-400 font-sans uppercase">Degrees</span>
                <span className="text-lg font-bold font-mono text-red-700">{exactMatches.deg}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Graph highlighting legal branch region */}
        <div className="w-full md:w-56 bg-gray-50 flex flex-col items-center justify-center p-3 rounded-lg border border-gray-100">
          <span className="text-xs font-mono font-bold text-gray-500 mb-2">Valid Branch Quadrants</span>
          
          <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 160 160">
              {/* Coordinate Axes */}
              <line x1="12" y1="80" x2="148" y2="80" stroke="#9ca3af" strokeWidth="1" />
              <line x1="80" y1="12" x2="80" y2="148" stroke="#9ca3af" strokeWidth="1" />
              
              {/* Underlay total unit circle helper */}
              <circle cx="80" cy="80" r="55" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
              
              {/* Highlight valid branch domain sector in Santa Ana Crimson red-200 */}
              <path 
                d={getSectorPath(funcType)} 
                fill="none" 
                stroke="#fca5a5" 
                strokeWidth="7" 
                strokeLinecap="round"
              />

              {/* End laser solution ray */}
              <line 
                x1="80" 
                y1="80" 
                x2={rayX} 
                y2={rayY} 
                stroke="#BA0C2F" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
              />
              
              {/* End pointer bullet point */}
              <circle cx={rayX} cy={rayY} r="4.5" fill="#000000" />
            </svg>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mt-1">
              <span className="text-[10px] font-sans font-bold bg-white/90 shadow px-1.5 py-0.5 rounded text-gray-700">
                {funcType}(x)
              </span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className="text-[10px] text-gray-400 font-sans block leading-tight">Colored circular band</span>
            <span className="text-[11px] font-semibold text-red-700 uppercase tracking-wide font-sans block">
              Allowed Output Sector
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

// Unified default switcher launcher for embedding
interface BuiltInWidgetContainerProps {
  widgetKey: 'radian-degree' | 'six-trig-values' | 'inverse-trig';
}

export function BuiltInWidgetContainer({ widgetKey }: BuiltInWidgetContainerProps) {
  switch (widgetKey) {
    case 'radian-degree':
      return <RadianDegreeConverterWidget />;
    case 'six-trig-values':
      return <SixTrigValuesWidget />;
    case 'inverse-trig':
      return <InverseTrigMasterWidget />;
    default:
      return null;
  }
}
