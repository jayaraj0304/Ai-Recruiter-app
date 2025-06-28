// vapiClient.js
import Vapi from "@vapi-ai/web";

let vapiInstance = null;

export const getVapiClient = () => {
  const apiKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

  if (!apiKey) {
    console.error("❌ VAPI API key is missing. Please check your .env file.");
    return null;
  }

  if (!vapiInstance) {
    vapiInstance = new Vapi(apiKey);
  }

  return vapiInstance;
};