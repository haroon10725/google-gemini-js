import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Converts local file information to base64
function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType
      },
    };
}

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Look at this sequence of three shapes. What shape should come as the fourth shape? Explain your reasoning with detailed descriptions of the first shapes.";

    const images = [
        fileToGenerativePart("assets/triangle.png", "image/png"),
        fileToGenerativePart("assets/square.png", "image/png"),
        fileToGenerativePart("assets/pentagon.png", "image/png")
    ];

    const generatedContent = await model.generateContent([prompt, ...images]);

    console.log(generatedContent.response.text());
}

run();