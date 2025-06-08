import fs from 'fs/promises';
import https from 'https';
import OpenAI from 'openai';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

// Create HTTPS agent to disable SSL verification temporarily (dev only)
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

async function extractTextFromFile(filePath: string, mimeType: string): Promise<string> {
  const buffer = await fs.readFile(filePath);

  if (mimeType === 'application/pdf') {
    const data = await pdfParse(buffer);
    return data.text;
  } else if (
    mimeType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'application/msword'
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } else {
    // For txt or other formats fallback
    return buffer.toString('utf-8');
  }
}

interface ScoreResponse {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
}

export async function scoreResume(
  resumePath: string,
  resumeMimeType: string,
  jobDescription: string
): Promise<ScoreResponse> {
  // Extract resume text
  const resumeText = await extractTextFromFile(resumePath, resumeMimeType);

  // Craft prompt for OpenAI
  const prompt = `
You are an expert recruiter. Score the candidate resume text against the job description below.
Provide:
- a numeric score (0-100)
- a JSON array of matched skills found in the resume
- a JSON array of missing but important skills
- suggestions for improving the resume.

Job Description:
${jobDescription}

Resume:
${resumeText}

Respond in this JSON format only:

{
  "score": number,
  "matchedSkills": [string],
  "missingSkills": [string],
  "suggestions": [string]
}
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // or another GPT-4 or GPT-3.5 model
    messages: [{ role: 'user', content: prompt }],
  });

  // Parse JSON response safely
  let result: ScoreResponse;
  const content = completion.choices[0].message.content;
  if (!content) {
    throw new Error('OpenAI response content is null');
  }
  try {
    result = JSON.parse(content);
  } catch {
    throw new Error('Failed to parse OpenAI response JSON');
  }

  return result;
}
