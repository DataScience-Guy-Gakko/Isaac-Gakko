
import { GoogleGenAI, Type } from "@google/genai";

// API Key is injected by Vite's 'define' config
const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const geminiService = {
  async generateStudyGuide(subject: string, topic: string) {
    if (!apiKey) return "API Key not configured.";
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a concise 5-point study guide for a peer tutoring session on the subject "${subject}" specifically covering the topic "${topic}". Include key concepts and one practice question.`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Unable to generate study guide at this time.";
    }
  },

  async recommendTutors(studentNeeds: string, availableTutors: any[]) {
    if (!apiKey) return null;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Based on this student need: "${studentNeeds}", select the best tutor from this list: ${JSON.stringify(availableTutors)}. Return only the ID of the tutor and a brief explanation why.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedTutorId: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["recommendedTutorId", "reason"]
          }
        }
      });
      const jsonStr = response.text?.trim() || '{}';
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("Gemini Error:", error);
      return null;
    }
  },

  async summarizeSession(notes: string) {
    if (!apiKey) return "API Key not configured.";
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Summarize the following tutoring session notes into a professional progress report for the student: "${notes}". Highlight key takeaways and areas for improvement.`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Summary generation failed.";
    }
  }
};
