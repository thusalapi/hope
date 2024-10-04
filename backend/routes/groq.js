const Groq = require('groq-sdk');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const groq = new Groq({ apiKey: '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' });

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
        content: "sing a song",
      },
    ],
    model: "llama3-8b-8192",
  });
}

// Run the main function
main();
