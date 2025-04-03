import {
  GoogleGenAI,
  createUserContent,
  createPartFromText,
  createPartFromUri
} from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const title =  "The next generation of AI for developers and Google Workspace"

const sampleText = `Title: The next generation of AI for developers and Google Workspace

Full article:

Gemini API & Google AI Studio: An approachable way to explore and prototype with generative AI applications`;

const embeddings = await ai.models.embedContent({
    model: "text-embedding-004",
    contents: sampleText,
    config: {
        taskType: "RETRIEVAL_DOCUMENT",
        title: title
    }
});

// console.log(embeddings);

const DOCUMENT1 = {
    "title": "Operating the Climate Control System",
    "content": "Your Googlecar has a climate control system that allows you to adjust the temperature and airflow in the car. To operate the climate control system, use the buttons and knobs located on the center console.  Temperature: The temperature knob controls the temperature inside the car. Turn the knob clockwise to increase the temperature or counterclockwise to decrease the temperature. Airflow: The airflow knob controls the amount of airflow inside the car. Turn the knob clockwise to increase the airflow or counterclockwise to decrease the airflow. Fan speed: The fan speed knob controls the speed of the fan. Turn the knob clockwise to increase the fan speed or counterclockwise to decrease the fan speed. Mode: The mode button allows you to select the desired mode. The available modes are: Auto: The car will automatically adjust the temperature and airflow to maintain a comfortable level. Cool: The car will blow cool air into the car. Heat: The car will blow warm air into the car. Defrost: The car will blow warm air onto the windshield to defrost it."
}

const DOCUMENT2 = {
    "title": "Touchscreen",
    "content": "Your Googlecar has a large touchscreen display that provides access to a variety of features, including navigation, entertainment, and climate control. To use the touchscreen display, simply touch the desired icon.  For example, you can touch the \"Navigation\" icon to get directions to your destination or touch the \"Music\" icon to play your favorite songs."
} 

const DOCUMENT3 = {
    "title": "Shifting Gears",
    "content": "Your Googlecar has an automatic transmission. To shift gears, simply move the shift lever to the desired position.  Park: This position is used when you are parked. The wheels are locked and the car cannot move. Reverse: This position is used to back up. Neutral: This position is used when you are stopped at a light or in traffic. The car is not in gear and will not move unless you press the gas pedal. Drive: This position is used to drive forward. Low: This position is used for driving in snow or other slippery conditions."
}

const documents = [DOCUMENT1, DOCUMENT2, DOCUMENT3]
const documents_embeddings = []


async function embed_fn(title, text) {
    return await ai.models.embedContent({
        model: "text-embedding-004",
        contents: text,
        config: {
            taskType: "RETRIEVAL_DOCUMENT",
            title: title
        }
    })
}

for (let i = 0; i < documents.length; i++) {
    const document_title = documents[i].title;
    const document_content = documents[i].content;
    const document_embedding = embed_fn(document_title, document_content);
    documents_embeddings.push(document_embedding);
}

const query = "How to shift gears in the Google car?";

async function find_best_passage(query, documents_embeddings) {
    const request = await ai.models.embedContent({
        model: "text-embedding-004",
        contents: query,
        config: {
            taskType: "RETRIEVAL_QUERY"
        }
    })
}

find_best_passage(query, documents_embeddings)

// currently working on