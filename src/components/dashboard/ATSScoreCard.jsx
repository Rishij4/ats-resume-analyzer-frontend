import React, { useState, useEffect } from "react";

function ATSScoreCard({ score = 85, matchPercentage = 85 }) {
  // Animated internal states for smooth count-up tracking
  const [displayScore, setDisplayScore] = useState(0);
  const [displayMatch, setDisplayMatch] = useState(0);

  const colors = {
    cardBg: "bg-[#1c1c1e]",         // Dark charcoal/graphite matching main panels
    borderTint: "border-[#2c2c2e]", // Muted neutral grey structural borders
    neonText: "text-[#00df89]",     // Signature mint green accent text
    neonStroke: "#00df89",          // Signature mint green for the SVG stroke
    neonBg: "bg-[#00df89]",         // Signature mint green for the progress bar
    trackStroke: "#121214",         // Pure dark charcoal inner circle track background
    progressBarTrack: "bg-[#121214]" // Deep neutral background container
  };

  // SVG Circle math (Radius = 70, Circumference = 2 * pi * r ≈ 439.82)
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  
  // Tie the stroke animations explicitly to the count-up step frames
  const strokeDashoffset = circumference - (Math.min(displayScore, 100) / 100) * circumference;

  // Handle synchronized linear count-up frames on mount or value updates
  useEffect(() => {
    let scoreStart = 0;
    let matchStart = 0;
    const duration = 1000; // 1 second total duration matching transition-all classes
    const frameRate = 60;  // High fluid refresh intervals
    const totalFrames = (duration / 1000) * frameRate;
    
    const scoreStep = score / totalFrames;
    const matchStep = matchPercentage / totalFrames;

    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      
      scoreStart += scoreStep;
      matchStart += matchStep;

      if (currentFrame >= totalFrames) {
        clearInterval(timer);
        setDisplayScore(score);
        setDisplayMatch(matchPercentage);
      } else {
        setDisplayScore(Math.floor(scoreStart));
        setDisplayMatch(Math.floor(matchStart));
      }
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, [score, matchPercentage]);

  return (
    <div className={`${colors.cardBg} ${colors.borderTint} text-white p-6 rounded-2xl border w-full h-full flex flex-col justify-between text-left transition-all duration-300 shadow-2xl animate-fade-in-up`}>
      
      <h2 className="text-xl font-bold mb-8 text-center text-zinc-200 tracking-wide">
        ATS Resume Score
      </h2>

      {/* Dynamic SVG Score Circle */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="relative w-44 h-44 flex items-center justify-center group">
          
          {/* Subtle Outer Neon Ambient Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-[#00df89]/5 scale-95 blur-xl group-hover:bg-[#00df89]/10 transition-all duration-500" />
          
          <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 160 160">
            {/* Background Track with true charcoal grey */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={colors.trackStroke}
              strokeWidth="12"
              fill="transparent"
            />
            {/* UI Sync Neon Progress Indicator */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={colors.neonStroke}
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-75 ease-out shadow-[0_0_8px_#00df89]"
            />
          </svg>

          {/* Centered Score Text */}
          <div className="absolute text-center z-10 transform transition-transform duration-300 group-hover:scale-105">
            <span className={`text-5xl font-extrabold tracking-tight ${colors.neonText} tabular-nums`}>
              {displayScore}
            </span>
            <span className="text-xs block text-zinc-500 font-semibold uppercase tracking-wider mt-1 select-none">
              / 100
            </span>
          </div>
        </div>

        <p className="text-sm font-medium text-zinc-400 mt-6 tracking-wide select-none">
          Overall ATS Score
        </p>
      </div>

      {/* Match Percentage Progress Bar */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-3 text-sm font-semibold tracking-wide">
          <span className="text-zinc-400">Job Description Match</span>
          <span className={`${colors.neonText} tabular-nums`}>{displayMatch}%</span>
        </div>

        <div className={`w-full ${colors.progressBarTrack} border ${colors.borderTint} rounded-full h-3 overflow-hidden p-[1px]`}>
          <div
            className={`${colors.neonBg} h-full rounded-full transition-all duration-75 ease-out`}
            style={{ width: `${Math.min(displayMatch, 100)}%` }}
          />
        </div>
      </div>

    </div>
  );
}

export default ATSScoreCard;