import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const moderate = async function (input: string) {
  console.log('[openAI] running moderation for', input);
  const moderation = await openai.moderations.create({ input });
  return moderation.results[0];
};

export const chatWithAi = async function (
  systemPrompt: string,
  prompt: string,
  model: 'gpt-3.5-turbo' | 'gpt-4'
) {
  console.log('');
  console.log('[OpenAI] prompt', prompt);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model,
  });

  console.log(completion.choices[0]);

  return completion.choices[0];
};
