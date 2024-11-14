import OpenAI from "openai";
import { GeminiClient } from 'gemini-client'; 
import { GEMINI_KEY } from "./constants";

// const openai = new OpenAI({
//   apiKey: OPENAI_KEY,
//   dangerouslyAllowBrowser: true,
// });

const geminiClient = new GeminiClient({
  apiKey: GEMINI_KEY,
  // Other configuration options as required by the Gemini API
});

export default geminiClient;
