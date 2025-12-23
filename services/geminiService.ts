import { GoogleGenAI } from "@google/genai";

// Initialize the API client
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const getGeminiCoaching = async (
  goal: string,
  feeling: string,
  stage: string
): Promise<string> => {
  if (!apiKey) return "（AI 助手未配置，请继续跟随内心指引...）";

  try {
    const prompt = `
      You are an expert facilitator of the Sedona Method (Lester Levenson's release technique).
      The user is currently in a releasing session.
      
      User's Goal: "${goal}"
      User's Current Feeling: "${feeling}"
      Current Stage: "${stage}"

      Please provide a very short, calming, and insightful tip or question (max 50 words) to help them release deeper. 
      If they are identifying the 'Want', explain simply whether it sounds like a want for Control, Approval, or Security.
      Speak in a gentle, supportive Chinese tone.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "深呼吸，感受当下的情绪。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "保持专注，跟随你的直觉。";
  }
};

export const suggestCoreWant = async (feeling: string, goal: string): Promise<string> => {
   if (!apiKey) return "";
   
   try {
    const prompt = `
      Based on the Sedona Method.
      Goal: "${goal}"
      Feeling: "${feeling}"
      
      Which of the three core wants is most likely driving this?
      1. Wanting Approval (Love/Liked)
      2. Wanting Control (Change it/Manage it)
      3. Wanting Security (Safety/Survival)
      
      Return ONLY the name of the want in Chinese, followed by a one sentence explanation.
    `;

     const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "";
   } catch (error) {
     return "";
   }
}
