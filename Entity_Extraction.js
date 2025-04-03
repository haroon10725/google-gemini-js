import {
    GoogleGenAI,
    createUserContent,
    createPartFromText
} from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

const directions = `
To reach the Colosseum from Rome's Fiumicino Airport (FCO), your options are diverse.
Take the Leonardo Express train from FCO to Termini Station, then hop on metro line A towards Battistini and alight at Colosseo station.
Alternatively, hop on a direct bus, like the Terravision shuttle, from FCO to Termini, then walk a short distance to the Colosseum on Via dei Fori Imperiali.
If you prefer a taxi, simply hail one at the airport and ask to be taken to the Colosseum.
The taxi will likely take you through Via del Corso and Via dei Fori Imperiali.
A private transfer service offers a direct ride from FCO to the Colosseum, bypassing the hustle of public transport.
If you're feeling adventurous, consider taking the train from FCO to Ostiense station,
then walking through the charming Trastevere neighborhood, crossing Ponte Palatino to reach the Colosseum, passing by the Tiber River and Via della Lungara.
Remember to validate your tickets on the metro and buses, and be mindful of pickpockets, especially in crowded areas.
No matter which route you choose, you're sure to be awed by the grandeur of the Colosseum.
`
const directions_prompt = `
From the given text, extract the following entities and return a list of them.
Entities to extract: street name, form of transport.
Text: ${directions}
Street = []
Transport = []
`
async function main() {
    const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: createUserContent(
            createPartFromText(directions_prompt)
        )
    })
    console.log(result.text)
}

main()