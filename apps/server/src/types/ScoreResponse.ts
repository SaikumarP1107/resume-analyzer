export interface ScoreResponse {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
}
