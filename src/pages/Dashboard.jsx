import { useState } from "react";

import ResumeUpload from "../components/upload/ResumeUpload";
import ATSScoreCard from "../components/dashboard/ATSScoreCard";
import SkillGap from "../components/dashboard/SkillGap";
import Suggestions from "../components/dashboard/Suggestions";
import RecruiterFeedback from "../components/dashboard/RecruiterFeedback";
import ResumeHeatmap from "../components/dashboard/ResumeHeatmap";
import AIRewrite from "../components/ai/AIRewrite";
import InterviewQuestions from "../components/ai/InterviewQuestions";
import CareerSuggestions from "../components/ai/CareerSuggestions";
import { generateATSReport } from "../utils/pdfGenerator";

const TABS = [
  { id: "rewrite", label: "Rewrite" },
  { id: "questions", label: "Preparation" },
  { id: "career", label: "Roadmap" },
  { id: "suggestions", label: "Suggestions" },
  { id: "feedback", label: "Review" },
];

function Dashboard() {
  const [result, setResult] = useState(null);
  const [activeAITab, setActiveAITab] = useState("rewrite");

  const activeIndex = TABS.findIndex((tab) => tab.id === activeAITab);

  // FIX: This helper now retains the DOM layout but smoothly fades and slides elements
  const getTabWrapperClass = (tabId) => {
    return `w-full transition-all duration-500 ease-out transform dynamic-content-panel ${
      activeAITab === tabId
        ? "opacity-100 translate-y-0 scale-100 relative pointer-events-auto z-10 block"
        : "opacity-0 translate-y-4 scale-[0.98] absolute top-0 left-0 pointer-events-none z-0 hidden"
    }`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#161614] via-[#121211] to-[#0d0d0c] text-[#fcfcf9] antialiased">

      {/* HEADER */}
      <header className="border-b border-stone-800 bg-[#121211]/80 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shrink-0">
            <span className="font-black text-sm text-stone-950">ATS</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-stone-200 to-stone-400 bg-clip-text text-transparent">
              ATS Resume Analyzer
            </h1>
            <p className="text-xs text-stone-400 hidden sm:block">
              Solar-optimized parsing workspace
            </p>
          </div>
        </div>

        {result && (
          <button
            onClick={() => generateATSReport(result)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl font-semibold text-sm text-stone-950 transition hover:opacity-90"
          >
            Download Report
          </button>
        )}
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload State */}
        {!result && (
          <div className="max-w-3xl mx-auto text-center my-16 space-y-8">
            <div className="space-y-3">
              <span className="px-3 py-1 text-xs font-semibold tracking-wider text-amber-400 uppercase bg-amber-400/10 rounded-full border border-amber-400/20">
                Engine Status: Active
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-white">
                Land more interviews.
              </h2>
              <p className="text-stone-400">
                Compare your credentials with target requisitions instantly.
              </p>
            </div>

            <div className="p-1 rounded-2xl bg-[#1c1c1a] border border-stone-800 shadow-2xl">
              <ResumeUpload setResult={setResult} />
            </div>
          </div>
        )}

        {/* Dashboard */}
        {result && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">

            {/* LEFT COLUMN */}
            <section className="lg:col-span-4 flex flex-col gap-6">
              {/* Telemetry */}
              <div className="p-6 rounded-2xl bg-[#161614] border border-stone-800 shadow-xl">
                <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-4">
                  <h3 className="font-semibold text-stone-400 text-xs uppercase">
                    Telemetry Metrics
                  </h3>
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                </div>
                <ATSScoreCard
                  score={result.atsAnalysis.score}
                  matchPercentage={result.atsAnalysis.matchPercentage}
                />
              </div>

              {/* Resume Analysis Overview */}
              <div className="p-6 rounded-2xl bg-[#161614] border border-stone-800 shadow-xl">
                <h3 className="font-bold text-amber-400 mb-4">
                  Resume Analysis Overview
                </h3>
                <SkillGap
                  matchedSkills={result.atsAnalysis.matchedSkills}
                  missingSkills={result.atsAnalysis.missingSkills}
                />
              </div>

              {/* Resume Section Analysis */}
              <div className="p-6 rounded-2xl bg-[#161614] border border-stone-800 shadow-xl">
                <h3 className="font-bold text-amber-400 mb-4">
                  Resume Section Analysis
                </h3>
                <ResumeHeatmap sections={result.atsAnalysis.sections} />
              </div>
            </section>

            {/* RIGHT COLUMN */}
            <section className="lg:col-span-8 space-y-6">
              {/* AI Modules */}
              <div className="rounded-2xl border border-stone-800 bg-[#161614]/60 overflow-hidden shadow-xl">
                
                <div className="flex flex-col xl:flex-row xl:items-center justify-between border-b border-stone-800 bg-[#0d0d0c]/80 px-4 sm:px-6 py-4 gap-4">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-400/10 px-2 py-0.5 rounded">
                      Core
                    </span>
                    <h3 className="font-bold text-stone-200 text-sm">
                      Optimization Modules
                    </h3>
                  </div>

                  {/* Sliding Pill Bar */}
                  <nav className="relative w-full xl:w-[480px] flex items-center bg-[#121211] p-1 rounded-xl border border-stone-800 select-none">
                    <div 
                      className="absolute top-1 bottom-1 left-1 rounded-lg bg-amber-500 transition-transform duration-300 ease-out z-0"
                      style={{ 
                        width: 'calc((100% - 8px) / 5)',
                        transform: `translateX(calc(${activeIndex} * 100%))` 
                      }}
                    />

                    {TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveAITab(tab.id)}
                        className={`relative z-10 flex-1 min-w-0 py-2 text-[10px] sm:text-xs font-bold text-center truncate transition-colors duration-200 ${
                          activeAITab === tab.id
                            ? "text-black"
                            : "text-stone-400 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* TAB CONTENT WITH PERMANENTLY MOUNTED ANIMATION PANELS */}
                <div className="p-4 sm:p-6 min-h-[250px] relative transition-all duration-500">
                  
                  {/* We render all components but selectively use classes to control visual animations */}
                  <div className={getTabWrapperClass("rewrite")}>
                    <AIRewrite data={result.resumeRewrite} />
                  </div>

                  <div className={getTabWrapperClass("questions")}>
                    <InterviewQuestions data={result.interviewQuestions} />
                  </div>

                  <div className={getTabWrapperClass("career")}>
                    <CareerSuggestions data={result.careerSuggestions} />
                  </div>

                  <div className={getTabWrapperClass("suggestions")}>
                    <Suggestions suggestions={result.aiSuggestions.suggestions} />
                  </div>

                  <div className={getTabWrapperClass("feedback")}>
                    <RecruiterFeedback feedback={result.aiSuggestions.recruiterFeedback} />
                  </div>

                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;