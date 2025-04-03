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
    file: "./assets/berlin.mp4",
    config: { mimeType: "video/mp4" },
});

while (!myfile.state || myfile.state.toString() !== "ACTIVE") {
    console.log("Processing video...");
    console.log("File state: ", myfile.state);
    await sleep(5000);
    myfile = await ai.files.get({ name: myfile.name });
}

const system_prompt = `
You are historian who specializes in events caught on film.
When you receive a video answer following questions:
When did it happen?
Who is the most important person in video?
How the event is called?
`;

const safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE",
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE",
    },
];

async function main() {
    const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: createUserContent([
            createPartFromText("Analyze the video please"),
            createPartFromUri(myfile.uri, myfile.mimeType)
        ]),
        config: {
            systemInstruction: {
                parts: [
                    createPartFromText(system_prompt)
                ]
            },
            safetySettings: safety_settings
        }
    })
    console.log(result.text);
}

main()