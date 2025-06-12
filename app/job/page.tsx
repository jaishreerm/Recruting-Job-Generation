"use client";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
// import { ChatOpenAI } from "langchain/chat_models/openai";

interface FilterType {
  [key: string]: string | string[];
}

export default function ReviewJobDescription() {
  const [jobDescription, setJobDescription] = useState("");
  const [filters, setFilters] = useState<FilterType>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const userPrompt = localStorage.getItem("prompt");

  const geminiPrompt = `
You are an expert technical recruiter. Based on the following user input, generate a detailed, professional job description for a tech role.

User Input: ${userPrompt}

Format the job description as follows:
- Job Title
- Location
- Type (e.g., Full-Time, Part-Time, Contract)
- Experience Level (e.g., Mid-level, Senior, etc.)
- About Us: A brief company description (invent if not provided).
- A short summary inviting candidates to apply.
- What You'll Do: A bulleted list of 4-6 key responsibilities.
- (Optional) Qualifications or skills if mentioned by user.

Then, output a JSON object with the following fields:
{
  "job_description": "...full job description as plain text...",
  "filters": {
    "job_role": "...",
    "positions": "...",
    "years_of_experience": "...",
    "work_type": "...",
    "annual_salary_range": "...",
    "max_notice_period": "...",
    "job_location": "...",
    "closing_date": "...",
    "skills_tags": ["...", "..."],
    "search_tags": ["...", "..."]
  }
}
Return only the JSON object, no extra text.
`;

  const handleJobGeneration = async () => {
    setLoading(true);
    setError(null);

    try {
      const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.0-flash",
        maxOutputTokens: 2048,
        apiKey: "AIzaSyB9fRa0J9FwSb2jMeuvoAlR5jD5AsjDSFs",
      });

      const res = await model.invoke(["human", geminiPrompt]);
      console.log("Gemini response: ", res);
      console.log("Content response: ", res.content);
      let text = res.content.toString();
      // Remove leading ```
      text = text.replace(/^```json\s*/i, "");
      // Remove trailing ```
      text = text.replace(/```\s*$/, "");
      // Now trim any extra whitespace
      text = text.trim();
      let parsed = null;
      try {
        parsed = JSON.parse(text);
        console.log("Result of parse: ", parsed);
        console.log("Parsed job description: ", parsed?.job_description);
        console.log("Parsed filters: ", parsed?.filters);
        setJobDescription(parsed?.job_description);
        setFilters(parsed?.filters);
      } catch (error) {
        console.log("Error in parse: ", error);
        setError("Could not parse gemini response");
      }
    } catch (error) {
      console.log("Error in model response: ", error);
      setError("Error generating job description");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleJobGeneration();
  }, []);

  return (
    // <div className="min-h-screen bg-gradient-to-br from-[#15171a] to-[#18191a] flex flex-col">
    //   {/* Header */}
    //   <div className="flex items-center justify-between px-8 py-4 border-b border-[#232323]">
    //     <button className="text-2xl text-gray-300 hover:text-white">
    //       &larr;
    //     </button>
    //     <span className="text-gray-400 text-xs">Last Saved 4:00AM Jun 8</span>
    //     <button className="px-6 py-2 rounded-md bg-[#ededed] text-black font-semibold shadow-inner border border-[#bdbdbd] hover:bg-[#d6d6d6] transition">
    //       Submit
    //     </button>
    //   </div>

    //   {/* Main two-column layout */}
    //   <div className="flex flex-1">
    //     {/* Left: Job Description */}
    //     <div className="flex-1 flex flex-col justify-start p-12 pr-8">
    //       <div className="bg-[#18191a] border border-[#232323] rounded-xl shadow-lg w-full h-full p-8 mb-4">
    //         <pre className="whitespace-pre-wrap text-gray-100 text-sm font-mono">
    //           {jobDescription}
    //         </pre>
    //       </div>
    //       <div className="w-full flex items-center border border-[#232323] rounded-lg bg-[#232323] px-4 py-2 mt-2">
    //         <input
    //           className="flex-1 bg-transparent text-gray-200 focus:outline-none"
    //           placeholder="Give prompt to edit..."
    //         />
    //         <button className="ml-2 text-gray-400 hover:text-white text-lg">
    //           &#8594;
    //         </button>
    //       </div>
    //     </div>

    //     {/* Right: Filters */}
    //     <div className="w-[400px] bg-[#18191a] border-l border-[#232323] px-8 py-8 flex flex-col gap-4">
    //       {/* Job Role */}
    //       <div>
    //         <label className="block text-gray-400 text-xs mb-1">Job Role</label>
    //         <input
    //           className="w-full bg-[#232323] text-gray-100 rounded px-3 py-2 border border-[#353535] mb-4"
    //           value="Founding Frontend Engineer"
    //           readOnly
    //         />
    //       </div>
    //       {/* Positions and Years of Experience */}
    //       <div className="flex gap-4 mb-4">
    //         <div>
    //           <label className="block text-gray-400 text-xs mb-1">
    //             Positions
    //           </label>
    //           <input
    //             className="w-16 bg-[#232323] text-gray-100 rounded px-3 py-2 border border-[#353535]"
    //             value="8"
    //             readOnly
    //           />
    //         </div>
    //         <div>
    //           <label className="block text-gray-400 text-xs mb-1">
    //             Years of Experience
    //           </label>
    //           <input
    //             className="w-24 bg-[#232323] text-gray-100 rounded px-3 py-2 border border-[#353535]"
    //             value="8 to 8"
    //             readOnly
    //           />
    //         </div>
    //       </div>
    //       {/* Work Type */}
    //       <div>
    //         <label className="block text-gray-400 text-xs mb-1">
    //           Work Type
    //         </label>
    //         <div className="flex gap-2 mb-4">
    //           <span className="px-3 py-1 rounded bg-[#232323] text-gray-100 text-xs border border-[#353535]">
    //             Full-time
    //           </span>
    //           <span className="px-3 py-1 rounded bg-[#232323] text-gray-100 text-xs border border-[#353535]">
    //             Internship
    //           </span>
    //           <span className="px-3 py-1 rounded bg-[#232323] text-gray-100 text-xs border border-[#353535]">
    //             Contractual
    //           </span>
    //         </div>
    //       </div>
    //       {/* Annual Salary Range */}
    //       <div className="mb-4">
    //         <label className="block text-gray-400 text-xs mb-1">
    //           Annual Salary Range
    //         </label>
    //         <div className="flex gap-2">
    //           <input
    //             className="w-16 bg-[#232323] text-gray-100 rounded px-2 py-1 border border-[#353535]"
    //             value="INR"
    //             readOnly
    //           />
    //           <input
    //             className="w-32 bg-[#232323] text-gray-100 rounded px-2 py-1 border border-[#353535]"
    //             value="40,00,000"
    //             readOnly
    //           />
    //           <input
    //             className="w-32 bg-[#232323] text-gray-100 rounded px-2 py-1 border border-[#353535]"
    //             value="40,00,000"
    //             readOnly
    //           />
    //         </div>
    //       </div>
    //       {/* Max Notice Period */}
    //       <div className="mb-4">
    //         <label className="block text-gray-400 text-xs mb-1">
    //           Max Notice Period
    //         </label>
    //         <input
    //           className="w-full bg-[#232323] text-gray-100 rounded px-3 py-2 border border-[#353535]"
    //           value="Immediate"
    //           readOnly
    //         />
    //       </div>
    //       {/* Job Location */}
    //       <div className="mb-4">
    //         <label className="block text-gray-400 text-xs mb-1">
    //           Job Location
    //         </label>
    //         <input
    //           className="w-full bg-[#232323] text-gray-100 rounded px-3 py-2 border border-[#353535]"
    //           value="Bangalore, India"
    //           readOnly
    //         />
    //       </div>
    //       {/* Date of Closing Application */}
    //       <div className="mb-4">
    //         <label className="block text-gray-400 text-xs mb-1">
    //           Date of Closing Application
    //         </label>
    //         <input
    //           className="w-full bg-[#232323] text-gray-100 rounded px-3 py-2 border border-[#353535]"
    //           value="25 January, 2025"
    //           readOnly
    //         />
    //       </div>
    //       {/* Skills Tags */}
    //       <div className="mb-4">
    //         <label className="block text-gray-400 text-xs mb-1">
    //           Skills Tags (optional)
    //         </label>
    //         <div className="flex flex-wrap gap-2">
    //           <span className="bg-[#232323] text-gray-100 px-3 py-1 rounded-full text-xs border border-[#353535]">
    //             Javascript
    //           </span>
    //           <span className="bg-[#232323] text-gray-100 px-3 py-1 rounded-full text-xs border border-[#353535]">
    //             NextJS
    //           </span>
    //           <span className="bg-[#232323] text-gray-100 px-3 py-1 rounded-full text-xs border border-[#353535]">
    //             React
    //           </span>
    //           <span className="bg-[#232323] text-gray-100 px-3 py-1 rounded-full text-xs border border-[#353535]">
    //             Typescript
    //           </span>
    //           <span className="bg-[#232323] text-gray-100 px-3 py-1 rounded-full text-xs border border-[#353535]">
    //             API Integration
    //           </span>
    //         </div>
    //       </div>
    //       {/* Search Tags */}
    //       <div>
    //         <label className="block text-gray-400 text-xs mb-1">
    //           Search Tags (optional)
    //         </label>
    //         <div className="flex flex-wrap gap-2">
    //           <span className="bg-[#232323] text-gray-100 px-3 py-1 rounded-full text-xs border border-[#353535]">
    //             150299
    //           </span>
    //           <span className="bg-[#232323] text-gray-100 px-3 py-1 rounded-full text-xs border border-[#353535]">
    //             HumanBit
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gradient-to-br from-[#15171a] to-[#18191a] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-[#232323]">
        <button className="text-2xl text-gray-300 hover:text-white">
          &larr;
        </button>
        <span className="text-gray-400 text-xs">Last Saved 4:00AM Jun 8</span>
        <button className="px-6 py-2 rounded-md bg-[#ededed] text-black font-semibold shadow-inner border border-[#bdbdbd] hover:bg-[#d6d6d6] transition">
          Submit
        </button>
      </div>

      {/* Main two-column layout */}
      <div className="flex flex-1">
        {/* Left: Job Description */}
        <div className="flex-1 flex flex-col justify-start p-12 pr-8">
          <div className="bg-[#18191a] border border-[#232323] rounded-xl shadow-lg w-full h-full p-8 mb-4">
            {loading ? (
              <div className="text-gray-400">Generating job description...</div>
            ) : error ? (
              <div className="text-red-400">{error}</div>
            ) : (
              <div className="text-gray-100 text-sm font-mono">
                <ReactMarkdown>{jobDescription}</ReactMarkdown>
              </div>
            )}
          </div>
          <div className="w-full flex items-center border border-[#232323] rounded-lg bg-[#232323] px-4 py-2 mt-2">
            <input
              className="flex-1 bg-transparent text-gray-200 focus:outline-none"
              placeholder="Give prompt to edit..."
              // You can add onChange/onKeyDown here to support re-generation
            />
            <button
              className="ml-2 text-gray-400 hover:text-white text-lg"
              onClick={handleJobGeneration}
              disabled={loading}
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* Right: Filters */}
        <div className="w-[400px] bg-[#18191a] border-l border-[#232323] px-8 py-8 flex flex-col gap-4">
          <div>
            <label className="block text-gray-400 text-xs mb-1">Job Role</label>
            <input
              className="w-full bg-[#232323] text-gray-100 rounded px-3 py-2 border border-[#353535] mb-4"
              value={filters.job_role || ""}
              readOnly
            />
          </div>
          <div className="flex gap-4 mb-4">
            <div>
              <label className="block text-gray-400 text-xs mb-1">
                Positions
              </label>
              <input
                className="w-16 bg-[#232323] text-gray-100 rounded px-3 py-2 border border-[#353535]"
                value={filters.positions || ""}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">
                Years of Experience
              </label>
              <input
                className="w-24 bg-[#232323] text-gray-100 rounded px-3 py-2 border border-[#353535]"
                value={filters.years_of_experience || ""}
                readOnly
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1">
              Work Type
            </label>
            <input
              className="w-full bg-[#232323] text-gray-100 rounded px-3 py-2 border border-[#353535] mb-4"
              value={filters.work_type || ""}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-xs mb-1">
              Annual Salary Range
            </label>
            <input
              className="w-full bg-[#232323] text-gray-100 rounded px-3 py-2 border border-[#353535]"
              value={filters.annual_salary_range || ""}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-xs mb-1">
              Max Notice Period
            </label>
            <input
              className="w-full bg-[#232323] text-gray-100 rounded px-3 py-2 border border-[#353535]"
              value={filters.max_notice_period || ""}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-xs mb-1">
              Job Location
            </label>
            <input
              className="w-full bg-[#232323] text-gray-100 rounded px-3 py-2 border border-[#353535]"
              value={filters.job_location || ""}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-xs mb-1">
              Date of Closing Application
            </label>
            <input
              className="w-full bg-[#232323] text-gray-100 rounded px-3 py-2 border border-[#353535]"
              value={filters.closing_date || ""}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 text-xs mb-1">
              Skills Tags (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(filters.skills_tags) &&
                filters.skills_tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-[#232323] text-gray-100 px-3 py-1 rounded-full text-xs border border-[#353535]"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1">
              Search Tags (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(filters.search_tags) &&
                filters.search_tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-[#232323] text-gray-100 px-3 py-1 rounded-full text-xs border border-[#353535]"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
