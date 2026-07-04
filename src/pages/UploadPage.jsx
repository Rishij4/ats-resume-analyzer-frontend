import { useState } from "react";
import axios from "axios";

function UploadPage() {
  const [resumeFile, setResumeFile] =
    useState(null);

  const [jobDescription, setJobDescription] =
    useState("");

  const [resumeText, setResumeText] =
    useState("");

  const [metadata, setMetadata] =
    useState(null);

  const [atsAnalysis, setAtsAnalysis] =
    useState(null);

  const [aiSuggestions, setAiSuggestions] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const handleUpload = async () => {
    try {
      if (!resumeFile || !jobDescription) {
        alert(
          "Please upload resume and paste job description"
        );
        return;
      }

      const allowedTypes = [
        "application/pdf",

        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

        "image/jpeg",
        "image/png",
        "image/jpg",
      ];

      if (
        !allowedTypes.includes(
          resumeFile.type
        )
      ) {
        alert(
          "Resume must be PDF, DOCX, JPG, PNG"
        );
        return;
      }

      setLoading(true);

      const formData = new FormData();

      formData.append(
        "resume",
        resumeFile
      );

      // Sending text instead of file
      formData.append(
        "jobDescription",
        jobDescription
      );

      const response = await axios.post(
        "https://ats-resume-analyzer-backend-enli.onrender.com/api/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      setResumeText(
        response.data.extractedText
      );

      setMetadata(
        response.data.metadata
      );

      setAtsAnalysis(
        response.data.atsAnalysis
      );

      setAiSuggestions(
        response.data.aiSuggestions
      );

      alert(
        "Resume Analysis Completed"
      );

    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log(
          error.response.data
        );
      }

      alert("Upload Failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#020b2d",
        color: "white",
        padding: "40px",
      }}
    >
      <h1>ATS Resume Analyzer</h1>

      {/* Resume Upload */}
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <h3>Upload Resume</h3>

        <input
          type="file"
          accept=".pdf,.docx,.jpg,.jpeg,.png"
          onChange={(e) =>
            setResumeFile(
              e.target.files[0]
            )
          }
        />

        {resumeFile && (
          <p
            style={{
              marginTop: "10px",
            }}
          >
            Selected Resume:{" "}
            {resumeFile.name}
          </p>
        )}
      </div>

      {/* Job Description Textarea */}
      <div
        style={{
          marginTop: "30px",
        }}
      >
        <h3>
          Paste Job Description
        </h3>

        <textarea
          rows="10"
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(
              e.target.value
            )
          }
          placeholder="Paste job description here..."
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
          }}
        />
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          cursor: "pointer",
        }}
      >
        {loading
          ? "Analyzing..."
          : "Analyze Resume"}
      </button>

      {/* Resume Text */}
      {resumeText && (
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <h2>
            Extracted Resume Text
          </h2>

          <textarea
            value={resumeText}
            readOnly
            rows="12"
            style={{
              width: "100%",
              padding: "10px",
            }}
          />
        </div>
      )}

      {/* Metadata */}
      {metadata && (
        <div
          style={{
            marginTop: "30px",
            backgroundColor:
              "#101c44",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>
            Resume Metadata
          </h2>

          <p>
            <strong>Email:</strong>{" "}
            {metadata.email}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {metadata.phone}
          </p>

          <p>
            <strong>Links:</strong>
          </p>

          <ul>
            {metadata.links.map(
              (link, index) => (
                <li key={index}>
                  {link}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* ATS Analysis */}
      {atsAnalysis && (
        <div
          style={{
            marginTop: "30px",
            backgroundColor:
              "#101c44",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>
            ATS Analysis
          </h2>

          <h3>
            ATS Score:{" "}
            {atsAnalysis.score}%
          </h3>

          <p>
            Match Percentage:{" "}
            {
              atsAnalysis.matchPercentage
            }
            %
          </p>

          <h4>
            Matched Skills
          </h4>

          <ul>
            {atsAnalysis.matchedSkills.map(
              (
                skill,
                index
              ) => (
                <li key={index}>
                  {skill}
                </li>
              )
            )}
          </ul>

          <h4>
            Missing Skills
          </h4>

          <ul>
            {atsAnalysis.missingSkills.map(
              (
                skill,
                index
              ) => (
                <li key={index}>
                  {skill}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {/* AI Suggestions */}
      {aiSuggestions && (
        <div
          style={{
            marginTop: "30px",
            backgroundColor:
              "#101c44",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>
            AI Resume Suggestions
          </h2>

          <h4>Strengths</h4>

          <ul>
            {aiSuggestions.strengths?.map(
              (
                item,
                index
              ) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>

          <h4>
            Weaknesses
          </h4>

          <ul>
            {aiSuggestions.weaknesses?.map(
              (
                item,
                index
              ) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>

          <h4>
            Suggestions
          </h4>

          <ul>
            {aiSuggestions.suggestions?.map(
              (
                item,
                index
              ) => (
                <li key={index}>
                  {item}
                </li>
              )
            )}
          </ul>

          <h4>
            Recruiter Feedback
          </h4>

          <p>
            {
              aiSuggestions.recruiterFeedback
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default UploadPage;
