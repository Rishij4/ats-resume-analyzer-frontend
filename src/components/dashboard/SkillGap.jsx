import React from 'react';

function SkillGap({ matchedSkills = [], missingSkills = [] }) {
  // Completely blue-free color tokens matching your dark neutral theme
  const colors = {
    cardBg: 'bg-[#1c1c1e]',         // Dark charcoal panel container
    innerBoxBg: 'bg-[#121214]/60',  // Slightly deeper neutral surface layer for content
    borderTint: 'border-[#2c2c2e]', // Muted neutral structural grey borders
    
    // Matched skills style tokens (Neon Mint Green)
    matchText: 'text-[#00df89]',
    matchBadgeBg: 'bg-[#00df89]/10',
    matchBadgeBorder: 'border-[#00df89]/20',
    matchBadgeHover: 'hover:bg-[#00df89]/20 hover:border-[#00df89]/40',
    
    // Missing skills style tokens (Soft Salmon/Rose Red)
    missingText: 'text-rose-400',
    missingBadgeBg: 'bg-rose-500/10',
    missingBadgeBorder: 'border-rose-500/20',
    missingBadgeHover: 'hover:bg-rose-500/20 hover:border-rose-500/40',
    
    textMuted: 'text-zinc-400'
  };

  return (
    <div className={`${colors.cardBg} ${colors.borderTint} p-6 rounded-2xl border w-full text-left transition-all duration-300 shadow-2xl animate-fade-in-up`}>
      
      <h2 className="text-xl font-bold mb-6 text-zinc-200 tracking-wide select-none">
        Skill Gap Analysis
      </h2>

      {/* Matched Skills Container */}
      <div className={`${colors.innerBoxBg} p-5 rounded-xl border border-zinc-900/60 mb-6 transition-all duration-500 delay-75 animate-fade-in-up hover:border-zinc-700`}>
        <h3 className={`text-sm font-bold tracking-wide mb-4 flex items-center gap-2 ${colors.matchText} select-none`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00df89] shadow-[0_0_8px_#00df89]" />
          Matched Skills
        </h3>

        <div className="flex flex-wrap gap-2.5">
          {matchedSkills.length > 0 ? (
            matchedSkills.map((skill, index) => (
              <span
                key={index}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border uppercase transition-all duration-200 transform hover:-translate-y-0.5 select-none ${colors.matchText} ${colors.matchBadgeBg} ${colors.matchBadgeBorder} ${colors.matchBadgeHover}`}
              >
                {skill}
              </span>
            ))
          ) : (
            <p className={`text-sm ${colors.textMuted} italic select-none`}>No matched skills found</p>
          )}
        </div>
      </div>

      {/* Missing Skills Container */}
      <div className={`${colors.innerBoxBg} p-5 rounded-xl border border-zinc-900/60 transition-all duration-500 delay-150 animate-fade-in-up hover:border-zinc-700`}>
        <h3 className={`text-sm font-bold tracking-wide mb-4 flex items-center gap-2 ${colors.missingText} select-none`}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]" />
          Missing Skills
        </h3>

        <div className="flex flex-wrap gap-2.5">
          {missingSkills.length > 0 ? (
            missingSkills.map((skill, index) => (
              <span
                key={index}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border uppercase transition-all duration-200 transform hover:-translate-y-0.5 select-none ${colors.missingText} ${colors.missingBadgeBg} ${colors.missingBadgeBorder} ${colors.missingBadgeHover}`}
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-zinc-300 text-sm font-medium tracking-wide flex items-center gap-1.5 select-none bg-emerald-500/5 border border-emerald-500/10 px-4 py-2 rounded-xl">
              No missing skills <span className="text-xs animate-bounce">🎉</span>
            </p>
          )}
        </div>
      </div>

    </div>
  );
}

export default SkillGap;