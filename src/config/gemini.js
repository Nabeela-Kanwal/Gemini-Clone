import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const modelName = import.meta.env.VITE_GEMINI_MODEL || "gemini-2.0-flash";

async function runChat(prompt) {
  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY in your .env file.");
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const response = result.response;

    return response.text();
  } catch (error) {
    const message = error.message || "";

    if (message.includes("[429") || message.includes("quota")) {
      throw new Error(
        "Gemini quota exceeded for this API key. Wait a minute and try again, switch to another model, or enable billing/check quota in Google AI Studio.",
      );
    }

    throw error;
  }
}

export default runChat;
