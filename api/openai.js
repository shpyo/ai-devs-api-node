import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const moderate = async function(input) {
  console.log('[openAI] running moderation for', input);
  const moderation = await openai.moderations.create({ input });
  return moderation.results[0];
}

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content: "You are a helpful assistant." }],
//     model: "",
//   });

//   console.log(completion.choices[0]);
// }

// main();