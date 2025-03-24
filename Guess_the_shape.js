import {GoogleGenAI} from '@google/genai';
import fs from "fs";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType: mimeType
    },
  };
}

async function main() {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: [
      [
        {
          text: "Look at this sequence of three shapes. What shape should come as the fourth shape? Explain your reasoning with detailed descriptions of the first shapes."
        }
      ],
      [
        fileToGenerativePart("./triangle.png", "image/png"),
      ],
      [
        fileToGenerativePart("./square.png", "image/png"),
      ],
      [
        fileToGenerativePart("./pentagon.png", "image/png"),
      ]
    ]
  })
  console.log(response.text);
}

main();

// Output: 

/* 
The sequence of shapes provided seems to be progressing by increasing the number of sides of a polygon.

The first shape is a triangle, which has three sides.
The second shape is a quadrilateral, which has four sides.
The third shape is a pentagon, which has five sides.

Following this pattern, the next shape in the sequence should be a hexagon, which has six sides.
*/