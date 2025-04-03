import {
  GoogleGenAI,
  createUserContent,
  createPartFromText,
  createPartFromUri
} from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const text_file = await ai.files.upload({
  file: "./assets/a11.txt",
  config: { mimeType: "text/plain" },
});

const prompt = `
Find four lighthearted moments in this text file.
`;

async function main() {
    const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: createUserContent([
            createPartFromUri(text_file.uri, text_file.mimeType),
            createPartFromText(prompt)
        ])
    })
    console.log(result.text);
}

main()