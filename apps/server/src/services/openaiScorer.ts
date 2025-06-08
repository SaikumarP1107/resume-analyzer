// services/openaiScorer.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // make sure this is set in your .env
});

export async function scoreResume(resume: string, jd: string) {
  const prompt = `
You are an AI resume evaluator.

Evaluate the resume below against the job description and return JSON like:
{
  "score": number,
  "matchedSkills": string[],
  "missingSkills": string[],
  "suggestions": string[]
}

Resume:
${resume}

Job Description:
${jd}
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4', // or 'gpt-3.5-turbo'
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
  });

  const content = response.choices[0].message?.content;
  return JSON.parse(content ?? '{}');
}
