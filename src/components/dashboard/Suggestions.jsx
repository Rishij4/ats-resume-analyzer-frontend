// Suggestions.jsx
import React from 'react';

function Suggestions({ suggestions = [] }) {
  // Completely blue-free color tokens matching your dark neutral theme in image_5dcb26.png
  const colors = {
    cardBg: 'bg-[#1c1c1e]',         // Dark charcoal/graphite matching your main panels
    innerBoxBg: 'bg-[#121214]/60',  // Slightly deeper neutral surface layer for each item block
    borderTint: 'border-[#2c2c2e]', // Muted neutral grey structural borders
    textMuted: 'text-zinc-400'
  };

  return (
    <div className={`${colors.cardBg} ${colors.borderTint} p-6 rounded-2xl border w-full h-full flex flex-col`}>

      <h2 className="text-xl font-bold mb-6 text-zinc-200 tracking-wide">
        AI Resume Suggestions
      </h2>

      <div className="space-y-4 flex-1 overflow-y-auto">
        {suggestions && suggestions.length > 0 ? (
          suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`${colors.innerBoxBg} ${colors.borderTint} p-5 rounded-xl border border-l-4 border-l-cyan-500/80 transition-all duration-300 hover:border-zinc-700 hover:border-l-cyan-400`}
            >
              <p className="text-zinc-300 text-sm leading-relaxed font-normal">
                {suggestion}
              </p>
            </div>
          ))
        ) : (
          <div className={`${colors.innerBoxBg} ${colors.borderTint} p-6 rounded-xl border text-center`}>
            <p className={`text-sm ${colors.textMuted} italic`}>
              No suggestions available right now. Your resume looks optimal! ✨
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Suggestions;