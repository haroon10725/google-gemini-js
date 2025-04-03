import {
  createPartFromText,
  createUserContent,
  GoogleGenAI
} from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const instruction = `
You are a coding expert that specializes in creating web pages based on a user request.
You create correct and simple code that is easy to understand.
You implement all the functionality requested by the user.
You ensure your code works properly, and you follow best practices for HTML programming.
`;

const prompt = `
Create a web app called Opossum Search:
1. Every time you make a search query, it should redirect you to a Google search
with the same query, but with the word opossum before it.
2. It should be visually similar to Google search.
3. Instead of the google logo, it should have a picture of this opossum: https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Opossum_2.jpg/292px-Opossum_2.jpg.
4. It should be a single HTML file, with no separate JS or CSS files.
5. It should say Powered by opossum search in the footer.
6. Do not use any unicode characters.
Thank you!
`;

async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: createUserContent([
        createPartFromText(prompt)
      ]),
      config: {
        systemInstruction: {
          parts: [
            createPartFromText(instruction)
          ]
        }
      }
    })
    console.log(response.text);
}

main()