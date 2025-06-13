
const userPrompt = localStorage.getItem("prompt");
export const geminiPrompt = `
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