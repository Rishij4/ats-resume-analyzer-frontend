import React from "react";

function CareerSuggestions({ data }) {
  // safe fallback structure
  const careerData = {
    roles: Array.isArray(data?.roles) ? data.roles : [],
    skillsToLearn: Array.isArray(data?.skillsToLearn) ? data.skillsToLearn : [],
    roadmap: Array.isArray(data?.roadmap) ? data.roadmap : [],
    salaryEstimate: data?.salaryEstimate || "",
  };

  const colors = {
    cardBg: "bg-[#1c1c1e]",
    innerBoxBg: "bg-[#121214]/60",
    borderTint: "border-[#2c2c2e]",
    neonAccent: "text-[#00df89]",
  };

  const listStyles = {
    "Recommended Roles": {
      border: "border-l-4 border-l-cyan-500/80 hover:border-l-cyan-400",
      text: "text-cyan-400",
      delay: "delay-75",
    },
    "Skills To Learn": {
      border: "border-l-4 border-l-amber-500/80 hover:border-l-amber-400",
      text: "text-amber-400",
      delay: "delay-100",
    },
    "Learning Roadmap": {
      border: "border-l-4 border-l-purple-500/80 hover:border-l-purple-400",
      text: "text-purple-400",
      delay: "delay-150",
    },
  };

  const renderList = (title, items) => {
  if (!items.length) return null;

  const style = listStyles[title];

  // Fix AI response coming as one long roadmap paragraph
  let formattedItems = items;

  if (title === "Learning Roadmap") {
    formattedItems = items.flatMap((item) => {
      // If AI sends one paragraph, split by numbered points or sentences
      if (typeof item === "string") {
        return item
          .replace(/\*\*/g, "") // remove markdown **
          .split(/(?=\d+\.)|(?=Phase \d+)/i) // split at 1. 2. or Phase 1
          .map((part) => part.trim())
          .filter(Boolean);
      }
      return item;
    });
  }

  return (
    <div
      className={`mb-6 transition-all duration-500 ${style.delay} animate-fade-in-up`}
    >
      <h3
        className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${style.text}`}
      >
        {title}
      </h3>

      <div className="space-y-3">
        {formattedItems.map((item, index) => (
          <div
            key={index}
            className={`${colors.innerBoxBg} ${colors.borderTint} ${style.border}
            p-4 rounded-xl border text-zinc-300 text-sm leading-relaxed
            flex gap-2.5 transition-all duration-200 transform
            hover:-translate-y-0.5 hover:border-zinc-700`}
          >
            <span className={`${style.text} font-bold text-xs mt-1`}>
              ✓
            </span>

            {/* preserve line breaks */}
            <span className="whitespace-pre-line break-words">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

  return (
    <div
      className={`${colors.cardBg} ${colors.borderTint} p-6 rounded-2xl border w-full text-left transition-all duration-300 shadow-2xl animate-fade-in-up`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 transition-all">
        <span className="w-2 h-2 rounded-full bg-[#00df89] shadow-[0_0_12px_#00df89] animate-pulse"></span>
        <h2 className="text-xl font-bold text-zinc-200 tracking-wide">
          AI Career Suggestions
        </h2>
      </div>

      <div className="space-y-6">
        {renderList("Recommended Roles", careerData.roles)}
        {renderList("Skills To Learn", careerData.skillsToLearn)}
        {renderList("Learning Roadmap", careerData.roadmap)}

        {/* Salary Estimation Block */}
        {careerData.salaryEstimate && (
          <div className="bg-[#00df89]/5 border border-[#00df89]/20 p-5 rounded-xl flex items-center justify-between transition-all duration-500 delay-200 animate-fade-in-up hover:bg-[#00df89]/10 hover:border-[#00df89]/40">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-0.5">
                Salary Estimate
              </h3>
              <p className={`text-xl font-extrabold tracking-tight ${colors.neonAccent}`}>
                {careerData.salaryEstimate}
              </p>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest bg-zinc-900/60 px-2.5 py-1 rounded text-zinc-500 border border-zinc-800 select-none">
              Market Data
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CareerSuggestions;