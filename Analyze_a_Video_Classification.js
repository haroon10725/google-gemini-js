import {
    GoogleGenAI,
    createUserContent,
    createPartFromUri,
    createPartFromText
} from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

// Helper for sleeping (used in video polling)
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let myfile = await ai.files.upload({
    file: "./assets/black_bear.mp4",
    config: { mimeType: "video/mp4" },
});

while (!myfile.state || myfile.state.toString() !== "ACTIVE") {
    console.log("Processing video...");
    console.log("File state: ", myfile.state);
    await sleep(5000);
    myfile = await ai.files.get({ name: myfile.name });
}

const system_prompt = `
You are a zoologist whose job is to name animals in videos.
You should always provide an english and latin name.
`;

async function main() {
    const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: createUserContent([
            createPartFromText("Please identify the animal(s) in this video"),
            createPartFromUri(myfile.uri, myfile.mimeType),
        ]),
        config: {
            systemInstruction: {
                parts: [
                    createPartFromText(system_prompt)
                ]
            }
        }
    });
    console.log(result.text);
}

main()