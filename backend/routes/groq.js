const Groq = require('groq-sdk');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: GROQ_API_KEY });

async function main() {
  try {
    const chatCompletion = await getGroqChatCompletion();
    // Print the completion returned by the LLM.
    console.log(chatCompletion.choices[0]?.message?.content || "");
  } catch (error) {
    console.error("Error fetching chat completion:", error);
  }
}

async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "return a letter, just letter nothing else",
      },
    ],
    model: "llama3-8b-8192",
  });
}

// Run the main function
main();
