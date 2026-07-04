import React from "react";

function InterviewQuestions({ data }) {
  // safe fallback
  const questions = {
    technical: Array.isArray(data?.technical) ? data.technical : [],
    projects: Array.isArray(data?.projects) ? data.projects : [],
    hr: Array.isArray(data?.hr) ? data.hr : [],
    coding: Array.isArray(data?.coding) ? data.coding : [],
  };

  const colors = {
    cardBg: "bg-[#1c1c1e]",
    innerBoxBg: "bg-[#121214]/60",
    borderTint: "border-[#2c2c2e]",
  };

  const sectionStyles = {
    "Technical Questions": {
      border: "border-l-4 border-l-cyan-500/80 hover:border-l-cyan-400",
      text: "text-cyan-400",
      delay: "delay-75",
    },
    "Project Questions": {
      border: "border-l-4 border-l-purple-500/80 hover:border-l-purple-400",
      text: "text-purple-400",
      delay: "delay-100",
    },
    "HR Questions": {
      border: "border-l-4 border-l-amber-500/80 hover:border-l-amber-400",
      text: "text-amber-400",
      delay: "delay-150",
    },
    "Coding Questions": {
      border: "border-l-4 border-l-rose-500/80 hover:border-l-rose-400",
      text: "text-rose-400",
      delay: "delay-200",
    },
  };

  const renderSection = (title, items) => {
    if (!items.length) return null;

    const style = sectionStyles[title];

    return (
      <div className={`mb-6 transition-all duration-500 ${style.delay} animate-fade-in-up`}>
        <h3 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${style.text}`}>
          {title}
        </h3>

        <div className="space-y-3">
          {items.map((question, index) => (
            <div
              key={index}
              className={`${colors.innerBoxBg} ${colors.borderTint} ${style.border} p-4 rounded-xl border text-zinc-300 text-sm leading-relaxed transition-all duration-200 transform hover:-translate-y-0.5 hover:border-zinc-700`}
            >
              <span className={`font-bold mr-1.5 ${style.text}`}>
                {index + 1}.
              </span>
              {question}
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
          AI Interview Preparation
        </h2>
      </div>

      <div className="space-y-6">
        {renderSection("Technical Questions", questions.technical)}
        {renderSection("Project Questions", questions.projects)}
        {renderSection("HR Questions", questions.hr)}
        {renderSection("Coding Questions", questions.coding)}
      </div>
    </div>
  );
}

export default InterviewQuestions;