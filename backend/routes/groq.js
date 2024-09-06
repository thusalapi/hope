require('dotenv').config();
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: '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' });

console.log(apiKey);

async function main() {
  console.log("Fetching Groq chat completion...");
  const chatCompletion = await getGroqChatCompletion();
  if (chatCompletion) {
    console.log("Completion:", chatCompletion.choices[0]?.message?.content || "No content returned");
  } else {
    console.log("No response from Groq API");
  }
}


 async function getGroqChatCompletion() {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "eassay on ai influence",
        },
      ],
      model: "llama3-8b-8192",
    });
    console.log("API Response:", response); // To check if the response exists
    return response;
  } catch (error) {
    console.error("Error fetching Groq completion:", error);
    return null;
  }
}

// Ensure this prints your actual API key

module.exports = { getGroqChatCompletion };

module.exports = { main };
