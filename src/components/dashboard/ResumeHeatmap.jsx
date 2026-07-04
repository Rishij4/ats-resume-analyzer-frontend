import React from 'react';

function ResumeHeatmap({ sections = {} }) {
  // Completely blue-free color tokens to match the neutral charcoal theme
  const colors = {
    cardBg: 'bg-[#1c1c1e]',         // Dark charcoal/graphite matching your main panels
    borderTint: 'border-[#2c2c2e]', // Muted neutral grey structural borders
    
    // Status colors: Smooth text-specific contrast treatments rather than solid blocking
    presentBg: 'bg-[#00df89]/5',
    presentBorder: 'border-[#00df89]/10',
    presentText: 'text-[#00df89]',
    presentHover: 'hover:bg-[#00df89]/10 hover:border-[#00df89]/30',
    
    missingBg: 'bg-rose-500/5',
    missingBorder: 'border-rose-500/10',
    missingText: 'text-rose-400',
    missingHover: 'hover:bg-rose-500/10 hover:border-rose-500/30',
  };

  // Helper mapping to cleanly stagger inner grid element animations dynamically
  const delays = ['delay-75', 'delay-100', 'delay-150', 'delay-200', 'delay-300'];

  return (
    <div className={`${colors.cardBg} ${colors.borderTint} p-6 rounded-2xl border w-full text-left transition-all duration-300 shadow-2xl animate-fade-in-up`}>

      <h2 className="text-xl font-bold mb-4 text-zinc-200 tracking-wide select-none">
        Resume Section Analysis
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(sections).map(([section, exists], index) => {
          const delayClass = delays[index % delays.length];
          
          return (
            <div
              key={section}
              className={`p-4 rounded-xl border transition-all duration-300 transform hover:-translate-y-0.5 shadow-md flex flex-col justify-between min-h-[82px] ${delayClass} animate-fade-in-up ${
                exists
                  ? `${colors.presentBg} ${colors.presentBorder} ${colors.presentHover}`
                  : `${colors.missingBg} ${colors.missingBorder} ${colors.missingHover}`
              }`}
            >
              {/* Formatted section title */}
              <h3 className="capitalize text-xs font-bold tracking-wider text-zinc-400 mb-2 select-none">
                {section.replace(/([A-Z])/g, ' $1').trim()}
              </h3>

              {/* Status indicator badge layout with premium bullet pulses */}
              <div className={`text-sm font-semibold flex items-center justify-between ${
                exists ? colors.presentText : colors.missingText
              }`}>
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${exists ? 'bg-[#00df89] shadow-[0_0_8px_#00df89]' : 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]'}`} />
                  {exists ? 'Present' : 'Missing'}
                </span>
                <span className="text-xs select-none opacity-80 filter saturate-100">
                  {exists ? '✅' : '❌'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default ResumeHeatmap;