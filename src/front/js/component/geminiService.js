import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getGeminiResponse(prompt, retries = 3, delay = 3000) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    if (result && result.response && result.response.candidates && result.response.candidates.length > 0) {
      const contenido = result.response.candidates[0].content;

      if (contenido && contenido.parts && contenido.parts.length > 0) {
        const textPart = contenido.parts[0].text;

        try {
          const jsonString = textPart.replace(/```json\n|\n```/g, '').trim();

          const rutinaJSON = JSON.parse(jsonString); 
          
          return rutinaJSON; 
        } catch (parseError) {
          console.warn("Error al procesar el JSON:", parseError);
          return "No se generó contenido válido.";
        }
      } else {
        console.warn("El contenido no tiene partes o está vacío.");
        return "No se generó contenido válido.";
      }
    } else {
      console.warn("No se encontraron candidatos en la respuesta de Gemini.");
      return "No se generó contenido.";
    }
  } catch (error) {
    console.error("Error generating the routine:", error);

    if (error.message.includes("503") && retries > 0) {
      console.warn(`Servidor sobrecargado. Reintentando en ${delay / 1000} segundos...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return getGeminiResponse(prompt, retries - 1, delay);
    }

    return "Hubo un problema con la IA. Por favor, intenta nuevamente más tarde.";
  }
}
