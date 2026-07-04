import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { uploadResume } from "../../services/uploadService";

function ResumeUpload({ setResult }) {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jdMode, setJdMode] = useState("text");
  const [jdFile, setJdFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isJdDragActive, setIsJdDragActive] = useState(false); // Separated state for JD drag

  const handleAnalyze = async () => {
    if (
      !resume ||
      (jdMode === "text" && !jobDescription.trim()) ||
      (jdMode === "file" && !jdFile)
    )
      return;

    const formData = new FormData();
    formData.append("resume", resume);

    if (jdMode === "text") {
      formData.append("jobDescription", jobDescription.trim());
    }

    if (jdMode === "file") {
      formData.append("jobDescriptionFile", jdFile);
    }

    try {
      setLoading(true);
      const data = await uploadResume(formData);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // Resume Drag Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (loading) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const extension = file.name.split('.').pop().toLowerCase();
      if (['pdf', 'doc', 'docx'].includes(extension)) {
        setResume(file);
      } else {
        alert("Invalid file type. Please upload a PDF or Word document.");
      }
    }
  };

  // Job Description Drag Handlers
  const handleJdDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (loading) return;
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsJdDragActive(true);
    } else if (e.type === "dragleave") {
      setIsJdDragActive(false);
    }
  };

  const handleJdDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsJdDragActive(false);
    if (loading) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const extension = file.name.split('.').pop().toLowerCase();
      if (['pdf', 'doc', 'docx', 'txt'].includes(extension)) {
        setJdFile(file);
      } else {
        alert("Invalid file type. Please upload a PDF, Word, or Text document.");
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const extension = file.name.split(".").pop().toLowerCase();

    if (["pdf", "doc", "docx"].includes(extension)) {
      setResume(file);
    } else {
      alert("Invalid Resume file");
    }
  };

  const handleJdFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const extension = file.name.split(".").pop().toLowerCase();

    if (["pdf", "doc", "docx", "txt"].includes(extension)) {
      setJdFile(file);
    } else {
      alert("Invalid JD file");
    }
  };

  const isFormValid =
    resume &&
    ((jdMode === "text" && jobDescription.trim()) || (jdMode === "file" && jdFile));

  return (
    <div className="relative max-w-5xl mx-auto group/container">
      {/* Dynamic Background Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-70 group-hover/container:opacity-100 transition duration-1000 pointer-events-none" />

      <div className="relative bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-2xl space-y-8">
        
        {/* Dynamic Title / Status Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800/60">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Analyze Application Alignment
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Fill out both steps below to feed the AI scanning workspace.
            </p>
          </div>
          
          {/* Verification Pill Badges */}
          <div className="flex gap-2">
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-all duration-300 ${resume ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]' : 'bg-slate-800/40 border-slate-700/40 text-slate-500'}`}>
              {resume ? "✓ Resume Ready" : "01. Missing File"}
            </span>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-all duration-300 ${isFormValid ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]' : 'bg-slate-800/40 border-slate-700/40 text-slate-500'}`}>
              {((jdMode === "text" && jobDescription.trim()) || (jdMode === "file" && jdFile)) ? "✓ JD Ready" : "02. Missing JD"}
            </span>
          </div>
        </div>

        {/* Two Column Split Content */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* LEFT COLUMN: Resume File Upload Area */}
          <div className="flex flex-col space-y-3 h-full">
            <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">
              Step 1: Resume File
            </label>
            
            <motion.div 
              layout
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              animate={{
                borderColor: isDragActive ? "#818cf8" : resume ? "rgba(16, 185, 129, 0.25)" : "rgba(51, 65, 85, 0.5)",
                backgroundColor: isDragActive ? "rgba(49, 46, 129, 0.15)" : resume ? "rgba(6, 78, 59, 0.05)" : "rgba(2, 6, 23, 0.3)"
              }}
              transition={{ duration: 0.2 }}
              className={`flex-1 min-h-[260px] h-full relative group flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl transition-shadow ${
                isDragActive ? 'shadow-[inset_0_0_20px_rgba(129,140,248,0.15)]' : 'hover:shadow-lg'
              }`}
            >
              <AnimatePresence mode="wait">
                {!resume ? (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full h-full flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      disabled={loading}
                    />
                    <div className="h-12 w-12 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-center group-hover:scale-110 group-hover:border-indigo-500/50 transition-all duration-300 shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        Drag & drop file, or <span className="text-indigo-400 font-semibold group-hover:text-indigo-300 underline underline-offset-4 dynamic-underline">browse</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-1.5">Accepts PDF, DOCX, or DOC formats</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="file-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center space-y-4 z-20"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/20">
                      <svg xmlns="http://www.w3.org/2000/xl" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                      </svg>
                    </div>
                    <div className="max-w-[220px] mx-auto">
                      <p className="text-sm font-semibold text-slate-200 truncate" title={resume.name}>
                        {resume.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 bg-slate-800/50 inline-block px-2 py-0.5 rounded-md border border-slate-700/50">
                        {(resume.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={(e) => { e.preventDefault(); setResume(null); }}
                      disabled={loading}
                      className="px-3 py-1.5 bg-slate-800/80 hover:bg-rose-950/30 border border-slate-700 hover:border-rose-900/40 text-xs font-semibold text-slate-300 hover:text-rose-400 rounded-lg transition-colors duration-200 disabled:opacity-50"
                    >
                      Remove File
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Job Description Input Area */}
<div className="flex flex-col space-y-3 h-full">
  
  {/* Robust Header Grid to Prevent Row Squishing */}
<div className="grid grid-cols-[1fr_auto] items-center gap-4 min-h-8">
  <label className="text-xs font-bold tracking-wider text-slate-400 uppercase truncate">
    Step 2: Target Job Description
  </label>
  
  {/* Smooth Animated Pills Toggle Container */}
  <div className="flex items-center bg-slate-950/60 p-1 rounded-xl border border-slate-800/80 backdrop-blur-md relative isolation-auto">
    
    {/* Button 1: Paste JD */}
    <button
      type="button"
      onClick={() => { setJdMode("text"); setJdFile(null); }}
      className={`relative px-3 py-1 rounded-lg text-xs font-semibold tracking-wide transition-colors duration-300 z-10 whitespace-nowrap ${
        jdMode === "text" ? "text-white" : "text-slate-400 hover:text-slate-200"
      }`}
    >
      {jdMode === "text" && (
        <motion.div
          layoutId="activeJdBg"
          className="absolute inset-0 bg-indigo-600 rounded-lg -z-10 shadow-md shadow-indigo-950/40"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      Paste JD
    </button>

    {/* Button 2: Upload JD File */}
    <button
      type="button"
      onClick={() => { setJdMode("file"); setJobDescription(""); }}
      className={`relative px-3 py-1 rounded-lg text-xs font-semibold tracking-wide transition-colors duration-300 z-10 whitespace-nowrap ${
        jdMode === "file" ? "text-white" : "text-slate-400 hover:text-slate-200"
      }`}
    >
      {jdMode === "file" && (
        <motion.div
          layoutId="activeJdBg"
          className="absolute inset-0 bg-indigo-600 rounded-lg -z-10 shadow-md shadow-indigo-950/40"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      Upload JD File
    </button>

  </div>
</div>

  {/* Content Container matching Step 1 height exactly */}
  {/* ... rest of your textarea/drag-drop zone code ... */}

            {/* Content Container matching Step 1 height exactly */}
            <div className="flex-1 min-h-[260px] h-full relative">
              <AnimatePresence mode="wait">
                {jdMode === "text" ? (
                  <motion.textarea
                    key="jd-textarea"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.15 }}
                    rows="8"
                    placeholder="Paste job description details here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full h-full p-4 bg-slate-950/30 border border-slate-800/80 hover:border-slate-700/80 focus:border-indigo-500/50 rounded-2xl text-slate-200 text-sm placeholder:text-slate-600 outline-none transition-colors resize-none shadow-inner"
                  />
                ) : (
                  <motion.div
                    key="jd-file-zone"
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      borderColor: isJdDragActive ? "#818cf8" : jdFile ? "rgba(16, 185, 129, 0.25)" : "rgba(51, 65, 85, 0.5)",
                      backgroundColor: isJdDragActive ? "rgba(49, 46, 129, 0.15)" : jdFile ? "rgba(6, 78, 59, 0.05)" : "rgba(2, 6, 23, 0.3)"
                    }}
                    exit={{ opacity: 0, scale: 0.99 }}
                    onDragEnter={handleJdDrag}
                    onDragOver={handleJdDrag}
                    onDragLeave={handleJdDrag}
                    onDrop={handleJdDrop}
                    className={`w-full h-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 group/jd transition-shadow duration-200 ${
                      isJdDragActive ? 'shadow-[inset_0_0_20px_rgba(129,140,248,0.15)]' : 'hover:shadow-lg'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {!jdFile ? (
                        <motion.div 
                          key="jd-empty"
                          className="w-full h-full flex flex-col items-center justify-center text-center space-y-4"
                        >
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.txt"
                            onChange={handleJdFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            disabled={loading}
                          />
                          <div className="h-12 w-12 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-center group-hover/jd:scale-110 group-hover/jd:border-indigo-500/50 transition-all duration-300 shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-400 group-hover/jd:text-indigo-300 transition-colors">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-200">
                              Drag & drop file, or <span className="text-indigo-400 font-semibold group-hover/jd:text-indigo-300 underline underline-offset-4 dynamic-underline">browse</span>
                            </p>
                            <p className="text-xs text-slate-500 mt-1.5">Accepts PDF, DOCX, or TXT variants</p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="jd-loaded"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center space-y-4 z-20"
                        >
                          <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/20">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-400">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="max-w-[220px] mx-auto">
                            <p className="text-sm font-semibold text-slate-200 truncate" title={jdFile.name}>
                              {jdFile.name}
                            </p>
                            <p className="text-xs text-slate-400 mt-1 bg-slate-800/50 inline-block px-2 py-0.5 rounded-md border border-slate-700/50">
                              {(jdFile.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={(e) => { e.preventDefault(); setJdFile(null); }}
                            disabled={loading}
                            className="px-3 py-1.5 bg-slate-800/80 hover:bg-rose-950/30 border border-slate-700 hover:border-rose-900/40 text-xs font-semibold text-slate-300 hover:text-rose-400 rounded-lg transition-colors duration-200 disabled:opacity-50"
                          >
                            Remove File
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Modern High-Impact Submission Button */}
        <div className="pt-2">
          <motion.button
            onClick={handleAnalyze}
            disabled={loading || !isFormValid}
            whileHover={!loading && isFormValid ? { y: -2 } : {}}
            whileTap={!loading && isFormValid ? { y: 0 } : {}}
            className="w-full relative flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-500 hover:via-violet-500 hover:to-purple-500 disabled:from-slate-800 disabled:to-slate-800 disabled:via-slate-800 text-white disabled:text-slate-500 rounded-2xl font-bold text-base transition-all duration-300 shadow-xl disabled:shadow-none disabled:cursor-not-allowed overflow-hidden border border-indigo-500/20 disabled:border-none"
          >
            {/* Shimmer overlay animation during loading states */}
            {loading && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                animate={{ x: ["100%", "-100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            )}

            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loading-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="tracking-wide animate-pulse">Parsing Artifacts & Generating Insights...</span>
                </motion.div>
              ) : (
                <motion.div 
                  key="normal-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <span>Initialize ATS AI Scanning Match</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

      </div>
    </div>
  );
}

export default ResumeUpload;