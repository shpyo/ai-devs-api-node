import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import 'dotenv/config';
import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';

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
  console.log('[OpenAI] starting conversation');

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

  console.log('[OpenAI] response:');
  console.log(completion.choices[0].message.content);

  return completion.choices[0];
};

export type ChatHistory = ChatCompletionMessageParam;

export const chatWithAiWithHistory = async function (
  systemPrompt: string,
  history: ChatCompletionMessageParam[],
  model: 'gpt-3.5-turbo' | 'gpt-4'
) {
  console.log('');
  console.log('[OpenAI] starting conversation');

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      ...history,
    ],
    model,
  });

  console.log('[OpenAI] response:');
  console.log(completion.choices[0].message.content);

  return completion.choices[0];
};

export const createEmbedding = async function (input: string) {
  console.log('');
  console.log('[OpenAI] embedding for', input);

  const response = await openai.embeddings.create({
    input,
    model: 'text-embedding-ada-002',
  });

  return response.data[0].embedding;
};

export const audioToTextFromUrl = async function (url: string) {
  const blob = await fetch(url).then((r) => r.blob());
  const file = new File([blob], 'audio.mp3');
  const transcription = await openai.audio.transcriptions.create({
    file,
    model: 'whisper-1',
  });

  return transcription.text;
};

export const audioToTextFromStorage = async function (fileName: string) {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(path.join(__dirname, '../storage/', fileName)),
    model: 'whisper-1',
  });

  return transcription.text;
};

export type FunctionsType = ChatCompletionCreateParamsBase['tools'];
export const chatWithAiFunctionCalling = async function (
  functions: FunctionsType,
  content: string,
  system?: ChatCompletionMessageParam[],
  model?: 'gpt-3.5-turbo-0125' | 'gpt-4'
) {
  console.log('');
  console.log('[OpenAI] starting conversation');

  const completion = await openai.chat.completions.create({
    messages: [
      ...system,
      {
        role: 'user',
        content,
      },
    ],
    tools: functions,
    model: model || 'gpt-3.5-turbo-0125',
  });

  console.log('[OpenAI] response:');
  console.log(completion.choices[0]);

  return completion.choices[0];
};
