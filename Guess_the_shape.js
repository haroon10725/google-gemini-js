import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
  createPartFromText
} from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const triangle = await ai.files.upload({
  file: "./assets/triangle.png",
  config: { mimeType: "image/png" },
});

const square = await ai.files.upload({
  file: "./assets/square.png",
  config: { mimeType: "image/png" },
});

const pentagon = await ai.files.upload({
  file: "./assets/pentagon.png",
  config: { mimeType: "image/png" },
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: createUserContent([
      createPartFromUri(triangle.uri, triangle.mimeType),
      createPartFromUri(square.uri, square.mimeType),
      createPartFromUri(pentagon.uri, pentagon.mimeType),
      createPartFromText("Look at this sequence of three shapes. What shape should come as the fourth shape? Explain your reasoning with detailed descriptions of the first shapes.")
    ])
  })
  console.log(response.text);
}

main();