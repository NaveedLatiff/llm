import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";
import readlineSync from 'readline-sync'


// Store the chat history
const history = []

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

async function chatting(userProblem) {

    // Pushing the user message
    history.push({
        role: "user",
        parts: [{ text: userProblem }]
    })

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: history

        // By default it cant have he context of my prev messages //
        // contents: "i have told u my name  in the prev message",


        // We can maintain session context manually //
        // contents:[
        //     {
        //         role:"user",
        //         parts:[{text:"My name is naveed"}]
        //     },
        //     {
        //         role:"model",
        //         parts:[{text:"ello Naveed! It’s nice to meet you. How can I help you today?"}]
        //     },
        //     {
        //         role:"user",
        //         parts:[{text:"Do u remember my name"}]
        //     }
        // ]



    });

    history.push({
        role: "model",
        parts: [{ text: response.text}]
    })
    console.log("AI:",response.text);
}

async function main() {
    while (true) {
        const input = readlineSync.question("You: ");

        if (input.toLowerCase() === "exit") break;

        await chatting(input);
    }
}

main();