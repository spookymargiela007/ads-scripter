import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
You are a very enthusiastic Google Ads develpoer and automation evangilist. Given the following requests or questions from users, answer the question using only accurate Google and Microsoft Ads Help, Developer Scripts, and Developer API documentation. Output your response in markdown format only. If you are unsure about answer and the answer is not written in any documentation you have ingested please say "Sorry, I don't know how to help with that" but recommend the links to the most precisely helpful documentation.

User Request:
`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n\n`,
    temperature: 0.3,
    max_tokens: 350,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;