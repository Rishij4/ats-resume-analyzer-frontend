import { jsPDF } from "jspdf";

export const generateATSReport = (result) => {
  if (!result) return;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  // Dynamic parameters mapping matching your dashboard state structure
  const score = result.atsAnalysis?.score ?? 85;
  const matchPercentage = result.atsAnalysis?.matchPercentage ?? 85;
  const matchedSkills = result.atsAnalysis?.matchedSkills ?? [];
  const missingSkills = result.atsAnalysis?.missingSkills ?? [];
  
  // AI Resume Rewrite Extraction Fields
  const rewriteData = result.resumeRewrite || {};
  const improvedSummary = rewriteData.summary || rewriteData.improvedSummary || "";
  const improvedProjects = rewriteData.projects || rewriteData.improvedProjects || [];
  const improvedExperience = rewriteData.experience || rewriteData.improvedExperience || [];
  const optimizedSkills = rewriteData.skills || rewriteData.optimizedSkills || {};
  const improvements = result.improvements || rewriteData.improvements || [];
  
  // AI Suggestions Extraction Fields
  const resumeSuggestions = result.aiSuggestions?.suggestions || result.resumeSuggestions || [];
  const recruiterFeedback = result.aiSuggestions?.recruiterFeedback || "";

  // Dynamic text array extractions for the AI Modules
  const technicalQuestions = result.interviewQuestions?.technical || [];
  const projectQuestions = result.interviewQuestions?.projects || [];
  const hrQuestions = result.interviewQuestions?.hr || [];
  const codingQuestions = result.interviewQuestions?.coding || [];

  const careerRoles = result.careerSuggestions?.roles || [];
  const careerSkills = result.careerSuggestions?.skillsToLearn || [];
  const careerRoadmap = result.careerSuggestions?.roadmap || [];
  
  // Clean up the incoming string to clear symbol characters that break font maps
  let rawSalary = result.careerSuggestions?.salaryEstimate || "";
  
  // Fallback string matching your exact dashboard value if rawSalary is empty
  if (!rawSalary) {
    rawSalary = "As a Junior Data Scientist/Data Science Analyst in Hyderabad, India, with 0-2 years of experience and the current skill set, an estimated annual salary could range from INR 3,00,000 to 6,0,000. This estimate can significantly increase with the acquisition of more specialized data science skills and tools (Pandas, NumPy, Scikit-learn, cloud platforms, advanced ML frameworks) and practical project experience.";
  }

  const salaryEstimate = rawSalary
    .replace(/[^\x00-\x7F]/g, "") 
    .trim();             

  // Visual Theme Configuration
  const primaryColor = "#161614"; 
  const accentColor = "#f59e0b";  
  const mintGreen = "#00df89";    
  const softRose = "#f87171";     
  const textDark = "#1c1c1e";     

  let yPos = 20;

  // Helper function to manage dynamic text scaling across A4 pages safely
  const checkPageOverflow = (neededHeight) => {
    if (yPos + neededHeight > 275) {
      doc.addPage();
      yPos = 20;
      return true;
    }
    return false;
  };

  // --- PDF HEADER PANEL ---
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, 210, 40, "F");

  doc.setTextColor("#fcfcf9");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("ATS RESUME ANALYSIS REPORT", 15, 25);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(accentColor);
  doc.text("Solar-Optimized Analytics Workspace", 15, 32);

  yPos = 55;

  // --- 1. TELEMETRY METRICS ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(textDark);
  doc.text("Telemetry Metrics", 15, yPos);
  
  doc.setDrawColor("#2c2c2e");
  doc.setFillColor(primaryColor); 
  doc.roundedRect(15, yPos + 4, 180, 24, 3, 3, "FD");

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#fcfcf9"); 
  doc.text(`Overall ATS Score:`, 20, yPos + 14);
  
  doc.setFont("helvetica", "bold");
  doc.setTextColor(mintGreen);
  doc.text(`${score} / 100`, 60, yPos + 14);

  doc.setFont("helvetica", "normal");
  doc.setTextColor("#fcfcf9"); 
  doc.text(`Job Description Match:`, 20, yPos + 22);
  
  doc.setFont("helvetica", "bold");
  doc.setTextColor(mintGreen);
  doc.text(`${matchPercentage}%`, 65, yPos + 22);

  yPos += 40;

  // --- 2. SKILL GAP ANALYSIS ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(textDark);
  doc.text("Skill Gap Analysis", 15, yPos);
  yPos += 6;

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(mintGreen);
  doc.text("MATCHED SKILLS:", 15, yPos);
  yPos += 5;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textDark);
  
  const matchedText = matchedSkills.length > 0 ? matchedSkills.join(", ") : "None detected.";
  const splitMatched = doc.splitTextToSize(matchedText, 175);
  doc.text(splitMatched, 15, yPos);
  yPos += (splitMatched.length * 5) + 6;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(softRose);
  doc.text("MISSING SKILLS:", 15, yPos);
  yPos += 5;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(textDark);
  
  const missingText = missingSkills.length > 0 ? missingSkills.join(", ") : "None! Complete coverage achieved.";
  const splitMissing = doc.splitTextToSize(missingText, 175);
  doc.text(splitMissing, 15, yPos);
  yPos += (splitMissing.length * 5) + 12;


  // --- 3. AI RESUME REWRITE SECTION ---
  checkPageOverflow(30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(textDark);
  doc.text("AI Resume Rewrite", 15, yPos);
  yPos += 7;

  // 3a. Improved Summary
  if (improvedSummary) {
    checkPageOverflow(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(accentColor);
    doc.text("IMPROVED SUMMARY", 15, yPos);
    yPos += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(textDark);
    const splitSummary = doc.splitTextToSize(improvedSummary, 175);
    doc.text(splitSummary, 15, yPos);
    yPos += (splitSummary.length * 5) + 6;
  }

  // 3b. Improved Projects
  if (improvedProjects.length > 0) {
    checkPageOverflow(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(accentColor);
    doc.text("IMPROVED PROJECTS", 15, yPos);
    yPos += 5;

    improvedProjects.forEach((proj) => {
      const projText = typeof proj === "string" ? proj : `${proj.title || "Project"}: ${proj.description || ""}`;
      const splitProj = doc.splitTextToSize(`• ${projText}`, 175);
      checkPageOverflow((splitProj.length * 5) + 3);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(textDark);
      doc.text(splitProj, 15, yPos);
      yPos += (splitProj.length * 5) + 3;
    });
    yPos += 3;
  }

  // 3c. Improved Experience
  if (improvedExperience.length > 0) {
    checkPageOverflow(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(accentColor);
    doc.text("IMPROVED EXPERIENCE", 15, yPos);
    yPos += 5;

    improvedExperience.forEach((exp) => {
      let expText = "";
      
      if (typeof exp === "string") {
        expText = exp;
      } else {
        // Extract separate pieces cleanly
        const role = exp.role || exp.position || "";
        const company = exp.company || exp.organization || "";
        const duration = exp.duration || exp.period || "";
        const description = exp.description || exp.summary || "";

        // Build a professional header line matching your dashboard state
        let headerLine = role;
        if (company) headerLine += ` | ${company}`;
        if (duration) headerLine += ` (${duration})`;
        
        expText = headerLine ? `${headerLine}\n${description}` : description;
      }

      const splitExp = doc.splitTextToSize(`• ${expText}`, 175);
      checkPageOverflow((splitExp.length * 5) + 4);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(textDark);
      doc.text(splitExp, 15, yPos);
      yPos += (splitExp.length * 5) + 4;
    });
    yPos += 3;
  }

  // 3d. Optimized Skills
  if (Object.keys(optimizedSkills).length > 0) {
    checkPageOverflow(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(accentColor);
    doc.text("OPTIMIZED SKILLS", 15, yPos);
    yPos += 5;

    Object.entries(optimizedSkills).forEach(([category, skills]) => {
      if (skills) {
        const skillsString = Array.isArray(skills) ? skills.join(", ") : String(skills);
        const skillLine = `${category}: ${skillsString}`;
        const splitSkillLine = doc.splitTextToSize(skillLine, 175);
        
        checkPageOverflow((splitSkillLine.length * 5) + 3);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(textDark);
        doc.text(splitSkillLine, 15, yPos);
        yPos += (splitSkillLine.length * 5) + 3;
      }
    });
    yPos += 3;
  }

  // 3e. Bulleted Structural Corrections Breakdown
  if (improvements.length > 0) {
    checkPageOverflow(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(accentColor);
    doc.text("KEY IMPROVEMENTS ADDED", 15, yPos);
    yPos += 5;

    improvements.forEach((item) => {
      const cleanItem = typeof item === "string" ? item : JSON.stringify(item);
      const cleanString = cleanItem.replace(/^[•\s✓\-*({]+/, "").replace(/[)}]+$/, "").trim();
      const splitItem = doc.splitTextToSize(`- ${cleanString}`, 175);
      
      checkPageOverflow((splitItem.length * 5) + 2);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(textDark);
      doc.text(splitItem, 15, yPos);
      yPos += (splitItem.length * 5) + 2.5;
    });
  }
  yPos += 7;


  // --- 4. AI RESUME SUGGESTIONS ---
  if (resumeSuggestions.length > 0) {
    checkPageOverflow(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(textDark);
    doc.text("AI Resume Suggestions", 15, yPos);
    yPos += 7;

    resumeSuggestions.forEach((suggestion) => {
      const cleanSug = typeof suggestion === "string" ? suggestion : JSON.stringify(suggestion);
      const splitSug = doc.splitTextToSize(`• ${cleanSug.trim()}`, 175);
      
      checkPageOverflow((splitSug.length * 5) + 3);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(textDark);
      doc.text(splitSug, 15, yPos);
      yPos += (splitSug.length * 5) + 3;
    });
    yPos += 5;
  }


  // --- 5. AI INTERVIEW PREPARATION ---
  checkPageOverflow(30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(textDark);
  doc.text("AI Interview Preparation", 15, yPos);
  yPos += 8;

  const allQuestionTypes = [
    { label: "Technical Preparation", items: technicalQuestions },
    { label: "Project Questions", items: projectQuestions },
    { label: "Behavioral & HR Focus", items: hrQuestions },
    { label: "Coding Challenges", items: codingQuestions }
  ];

  let hasQuestions = false;

  allQuestionTypes.forEach((group) => {
    if (group.items.length > 0) {
      hasQuestions = true;
      checkPageOverflow(12);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(accentColor);
      doc.text(group.label, 15, yPos);
      yPos += 6;

      group.items.forEach((q, i) => {
        const splitQ = doc.splitTextToSize(`${i + 1}. ${q}`, 175);
        checkPageOverflow((splitQ.length * 5) + 2);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(textDark);
        doc.text(splitQ, 15, yPos);
        yPos += (splitQ.length * 5) + 2;
      });
      yPos += 3;
    }
  });

  if (!hasQuestions) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(textDark);
    doc.text("No dynamic interview questions generated.", 15, yPos);
    yPos += 10;
  }
  yPos += 5;


  // --- 6. AI CAREER ADVISOR ---
  checkPageOverflow(35);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(textDark);
  doc.text("AI Career Suggestions", 15, yPos);
  yPos += 8;

  if (careerRoles.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(mintGreen);
    doc.text("Recommended Roles:", 15, yPos);
    yPos += 5;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(textDark);
    const rolesText = careerRoles.join(" | ");
    const splitRoles = doc.splitTextToSize(rolesText, 175);
    doc.text(splitRoles, 15, yPos);
    yPos += (splitRoles.length * 5) + 6;
  }

  // 6a. Upskilling Milestones Subsection
  if (careerSkills.length > 0) {
    checkPageOverflow(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(accentColor);
    doc.text("Skills To Learn:", 15, yPos);
    yPos += 5;

    careerSkills.forEach((step, idx) => {
      const splitStep = doc.splitTextToSize(`Step ${idx + 1}: ${step}`, 175);
      checkPageOverflow((splitStep.length * 5) + 2);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(textDark);
      doc.text(splitStep, 15, yPos);
      yPos += (splitStep.length * 5) + 2.5;
    });
    yPos += 4;
  }

  // 6b. Learning Roadmap Subsection
  if (careerRoadmap.length > 0) {
    checkPageOverflow(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(accentColor);
    doc.text("LEARNING ROADMAP", 15, yPos);
    yPos += 6;

    careerRoadmap.forEach((phase) => {
      const cleanPhase = typeof phase === "string" ? phase : JSON.stringify(phase);
      const splitPhase = doc.splitTextToSize(cleanPhase, 175);
      
      checkPageOverflow((splitPhase.length * 5) + 3);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(textDark);
      doc.text(splitPhase, 15, yPos);
      yPos += (splitPhase.length * 5) + 3;
    });
    yPos += 5;
  }


  // --- 6c. TARGET MARKET VALUATION BOX (Fixes heading from image_05f4e9.png) ---
  if (salaryEstimate) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    
    // Split the body text using a clear alignment width inside the card boundary box
    const splitSalary = doc.splitTextToSize(salaryEstimate, 130);
    const calculatedBoxHeight = Math.max(16, (splitSalary.length * 5) + 8);

    checkPageOverflow(calculatedBoxHeight + 10);
    yPos += 4;

    doc.setDrawColor(mintGreen);
    doc.setFillColor("#f0fdf4"); 
    doc.roundedRect(15, yPos, 180, calculatedBoxHeight, 2, 2, "FD");

    // Dynamic Title mapping your UI perfectly
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(textDark);
    doc.text("SALARY ESTIMATE:", 20, yPos + 7);
    
    // Shift left edge to avoid text clashes with the new bounding title header
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(splitSalary, 58, yPos + 7);
    
    yPos += calculatedBoxHeight + 10;
  }

  // --- 7. AI RECRUITER FEEDBACK ---
  if (recruiterFeedback) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const splitFeedback = doc.splitTextToSize(recruiterFeedback, 175);
    
    checkPageOverflow((splitFeedback.length * 5) + 12);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(textDark);
    doc.text("AI Recruiter Feedback Summary", 15, yPos);
    yPos += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(textDark);
    doc.text(splitFeedback, 15, yPos);
  }

  doc.save(`ATS-Comprehensive-Analysis-Report-${Date.now()}.pdf`);
};