// RecruiterFeedback.jsx
import React from 'react';

function RecruiterFeedback({ feedback }) {
  // Completely blue-free color tokens to match the dark neutral/charcoal layout in image_5dcb26.png
  const colors = {
    cardBg: 'bg-[#1c1c1e]',         // Dark charcoal/graphite for the panels (replaces dark blue)
    innerBoxBg: 'bg-[#121214]',     // Even darker near-black background for inner text boxes
    borderTint: 'border-[#2c2c2e]', // Muted neutral grey structural borders
    neonText: 'text-[#00df89]',     // Your signature mint green accent
    textMuted: 'text-zinc-400'
  };

  const coreSections = [
    {
      title: "Executive Summary",
      text: feedback || "Rishikesh presents a solid technical foundation in frontend development, particularly with React.js, JavaScript, and responsive design.",
      borderColor: "border-l-4 border-cyan-500/80",
      accentText: "text-cyan-400"
    },
    {
      title: "Key Strengths Discovered",
      text: "The 'ForgeMobile' project is impressive, showcasing the ability to build complex applications with modern web technologies.",
      borderColor: "border-l-4 border-emerald-500/80",
      accentText: "text-emerald-400"
    },
    {
      title: "Critical Refinement Needed",
      text: "The resume needs adjustment to clarify experience dates, quantify achievements, and explicitly address core job description requirements like local state management configurations.",
      borderColor: "border-l-4 border-amber-500/80",
      accentText: "text-amber-400"
    }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-start space-y-4">
      
      {/* Header Panel - True Charcoal styled background */}
      <div className={`${colors.cardBg} ${colors.borderTint} p-5 rounded-xl border flex items-center justify-between`}>
        <h2 className="text-lg font-bold text-zinc-200 tracking-wide flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00df89] shadow-[0_0_8px_#00df89]"></span>
          AI Recruiter Feedback
        </h2>
        <span className="text-[10px] uppercase font-black tracking-widest bg-[#121214] px-2.5 py-1 rounded text-zinc-400 border border-zinc-800">
          Analysis Complete
        </span>
      </div>

      {/* Structured Card Content - No blue tints */}
      {coreSections.map((section, idx) => (
        <div 
          key={idx} 
          className={`${colors.cardBg} ${colors.borderTint} p-5 rounded-xl border ${section.borderColor} shadow-md transition-all duration-300 hover:border-zinc-700`}
        >
          <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${section.accentText}`}>
            {section.title}
          </h3>
          <div className={`${colors.innerBoxBg} p-4 rounded-lg border border-zinc-900/60`}>
            <p className="text-zinc-300 text-sm leading-relaxed font-normal">
              {section.text}
            </p>
          </div>
        </div>
      ))}

      {/* Recruiter Ready Status Module - Synced to match bottom line alignment */}
      <div className={`${colors.cardBg} ${colors.borderTint} p-4 rounded-xl border flex items-center justify-between text-xs font-semibold mt-auto`}>
        <span className={colors.textMuted}>Recruiter Ready Status:</span>
        <span className="text-[#00df89] bg-[#00df89]/10 px-3 py-1 rounded-md font-bold tracking-wide border border-[#00df89]/20">
          Highly Recommended
        </span>
      </div>

    </div>
  );
}

export default RecruiterFeedback;