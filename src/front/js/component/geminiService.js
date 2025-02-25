import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getGeminiResponse(prompt, retries = 3, delay = 3000) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error getting response from Gemini:", error);

    if (error.message.includes("503") && retries > 0) {
      console.warn(`Servidor sobrecargado. Reintentando en ${delay / 1000} segundos...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return getGeminiResponse(prompt, retries - 1, delay);
    }

    return "There was a problem with the AI. Please try again later.";
  }
}