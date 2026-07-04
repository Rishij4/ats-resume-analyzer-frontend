import React, { useState } from "react";

function AIRewrite({ data }) {
  const [copied, setCopied] = useState(false);

  // fallback safe structure
  const improvedResume = {
    summary: data?.summary || "",
    projects: Array.isArray(data?.projects) ? data.projects : [],
    experience: Array.isArray(data?.experience) ? data.experience : [],
    skills: Array.isArray(data?.skills) ? data.skills : [],
    improvements: Array.isArray(data?.improvements) ? data.improvements : [],
  };

  const colors = {
    cardBg: "bg-[#1c1c1e]",
    innerBoxBg: "bg-[#121214]/60",
    borderTint: "border-[#2c2c2e]",
    neonAccent: "text-[#00df89]",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(improvedResume, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`${colors.cardBg} ${colors.borderTint} p-6 rounded-2xl border w-full text-left transition-all duration-300 shadow-2xl animate-fade-in-up`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 transition-all">
        <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.75)] animate-pulse"></span>
        <h2 className="text-xl font-bold text-zinc-200 tracking-wide">
          AI Resume Rewrite
        </h2>
      </div>

      <div className="space-y-6">
        {/* Summary */}
        {improvedResume.summary && (
          <div className="transition-all duration-500 delay-75 animate-fade-in-up">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
              Improved Summary
            </h3>
            <div
              className={`${colors.innerBoxBg} ${colors.borderTint} p-4 rounded-xl border text-zinc-300 text-sm leading-relaxed hover:border-zinc-700 transition-colors duration-200`}
            >
              {improvedResume.summary}
            </div>
          </div>
        )}

        {/* Projects */}
        {improvedResume.projects.length > 0 && (
          <div className="transition-all duration-500 delay-100 animate-fade-in-up">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
              Improved Projects
            </h3>
            <div className="space-y-3">
              {improvedResume.projects.map((project, index) => (
                <div
                  key={index}
                  className={`${colors.innerBoxBg} ${colors.borderTint} p-4 rounded-xl border border-l-4 border-l-purple-500/70 hover:border-l-purple-500 transition-all duration-200 transform hover:-translate-y-0.5`}
                >
                  {typeof project === "string" ? (
                    <p className="text-zinc-300 text-sm">{project}</p>
                  ) : (
                    <>
                      <p className="font-bold text-purple-400 text-sm">
                        {project.name}
                      </p>
                      <p className="text-zinc-300 text-sm mt-2">
                        {project.description}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {improvedResume.experience.length > 0 && (
          <div className="transition-all duration-500 delay-150 animate-fade-in-up">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
              Improved Experience
            </h3>
            <div className="space-y-3">
              {improvedResume.experience.map((exp, index) => (
                <div
                  key={index}
                  className={`${colors.innerBoxBg} ${colors.borderTint} p-4 rounded-xl border border-l-4 border-l-cyan-500/70 hover:border-l-cyan-500 transition-all duration-200 transform hover:-translate-y-0.5`}
                >
                  {typeof exp === "string" ? (
                    <p className="text-zinc-300 text-sm">{exp}</p>
                  ) : (
                    <>
                      <p className="font-bold text-cyan-400 text-sm">
                        {exp.title}
                      </p>
                      <p className="text-xs text-zinc-400 mt-1">
                        {exp.company} • {exp.duration}
                      </p>
                      <p className="text-zinc-300 text-sm mt-2">
                        {exp.description}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {improvedResume.skills.length > 0 && (
          <div className="transition-all duration-500 delay-200 animate-fade-in-up">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
              Optimized Skills
            </h3>
            
            {/* FIX: Handled dynamic rendering wrappers so strings fit clean row lines instead of breaking layout boxes */}
            <div className="flex flex-wrap gap-2">
              {improvedResume.skills.map((skill, index) => (
                <React.Fragment key={index}>
                  {typeof skill === "string" ? (
                    <span className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-xs font-bold hover:bg-purple-500/20 transition-colors duration-200">
                      {skill}
                    </span>
                  ) : (
                    <div className="w-full bg-[#121214]/60 p-4 rounded-xl border border-[#2c2c2e] hover:border-zinc-700 transition-colors duration-200">
                      <p className="font-bold text-purple-400 text-sm mb-2">
                        {skill.category}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(skill.items) &&
                          skill.items.map((item, i) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-xs font-bold hover:bg-purple-500/20 transition-colors duration-200"
                            >
                              {item}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Improvements */}
        {improvedResume.improvements.length > 0 && (
          <div className="transition-all duration-500 delay-300 animate-fade-in-up">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
              Key Improvements Added
            </h3>
            <div className="space-y-2.5">
              {improvedResume.improvements.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#00df89]/5 border border-[#00df89]/20 p-4 rounded-xl text-sm flex items-start gap-2.5 text-zinc-300 hover:bg-[#00df89]/10 transition-colors duration-200"
                >
                  <span className={`${colors.neonAccent} font-bold select-none`}>
                    ✓
                  </span>
                  <span>{typeof item === "string" ? item : JSON.stringify(item)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Copy Button with interactive transition */}
      <button
        onClick={handleCopy}
        className={`w-full mt-6 py-3 border rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 select-none transform active:scale-[0.99] ${
          copied
            ? "bg-[#00df89]/20 border-[#00df89] text-[#00df89]"
            : "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-200"
        }`}
      >
        {copied ? "✓ Copied Content Successfully!" : "📋 Copy Improved Resume Content"}
      </button>
    </div>
  );
}

export default AIRewrite;