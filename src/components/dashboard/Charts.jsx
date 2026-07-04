// Charts.jsx
import React from 'react';

function Charts({ score = 0, matchPercentage = 0 }) {
  // Completely blue-free color tokens matching your dark neutral theme in image_5dcb26.png
  const colors = {
    cardBg: 'bg-[#1c1c1e]',         // Dark charcoal/graphite matching your main panels
    borderTint: 'border-[#2c2c2e]', // Muted neutral grey structural borders
    neonText: 'text-[#00df89]',     // Your signature mint green accent text
    neonBg: 'bg-[#00df89]',         // Your signature mint green progress fill
    trackBg: 'bg-[#121214]'         // Deep neutral background container track for bars
  };

  return (
    <div className={`${colors.cardBg} ${colors.borderTint} text-white p-6 rounded-2xl border w-full`}>
      
      <h2 className="text-xl font-bold mb-6 text-zinc-200 tracking-wide">
        Performance Overview
      </h2>

      {/* ATS Score Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2 text-sm font-semibold tracking-wide">
          <span className="text-zinc-400">ATS Score</span>
          <span className={colors.neonText}>{score}%</span>
        </div>

        <div className={`w-full ${colors.trackBg} border ${colors.borderTint} rounded-full h-3 overflow-hidden`}>
          <div
            className={`${colors.neonBg} h-full rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${Math.min(score, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Match Percentage Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2 text-sm font-semibold tracking-wide">
          <span className="text-zinc-400">Job Match Percentage</span>
          <span className={colors.neonText}>{matchPercentage}%</span>
        </div>

        <div className={`w-full ${colors.trackBg} border ${colors.borderTint} rounded-full h-3 overflow-hidden`}>
          <div
            className={`${colors.neonBg} h-full rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${Math.min(matchPercentage, 100)}%` }}
          ></div>
        </div>
      </div>

    </div>
  );
}

export default Charts;