import { GoogleGenAI, Type } from "@google/genai";
import { Template } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateFormData = async (template: Template, userPrompt: string): Promise<any> => {
  try {
    const ai = getClient();
    
    // Construct a schema based on the template fields
    const properties: any = {};
    const required: string[] = [];

    template.fields.forEach(field => {
      required.push(field.key);
      if (field.type === 'items') {
        properties[field.key] = {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              description: { type: Type.STRING },
              quantity: { type: Type.NUMBER },
              price: { type: Type.NUMBER }
            }
          }
        };
      } else if (field.type === 'number') {
        properties[field.key] = { type: Type.NUMBER };
      } else {
        properties[field.key] = { type: Type.STRING };
      }
    });

    const schema = {
      type: Type.OBJECT,
      properties: properties,
      required: required
    };

    const prompt = `
      You are a helpful assistant that generates form data for a document generator.
      The user wants to create a ${template.name}.
      
      User's Request: "${userPrompt}"
      
      Please generate realistic and professional data for the form fields based on the user's request.
      If the user doesn't specify something, make up reasonable professional placeholders.
      For dates, use today's date or a future date if appropriate.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("No data returned from AI");

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};