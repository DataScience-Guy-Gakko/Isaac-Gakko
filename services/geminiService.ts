
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Google GenAI client with the API key directly from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async generateStudyGuide(subject: string, topic: string) {
    try {
      // Use gemini-3-flash-preview for text generation tasks
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
    try {
      // Request structured JSON output using gemini-3-flash-preview and a response schema
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
      // Correctly extract the text property and parse the JSON string
      const jsonStr = response.text?.trim() || '{}';
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("Gemini Error:", error);
      return null;
    }
  },

  async summarizeSession(notes: string) {
    try {
      // Generate a session summary using gemini-3-flash-preview
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
