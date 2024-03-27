import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';
import { chatWithAi } from '../api/openai';

interface BloggerTaskResponse {
  blog: string[];
}

const blogger = async function () {
  await postGetTaskToken('blogger');
  const { blog, msg } = await getTaskDetails<BloggerTaskResponse>();

  const systemPrompt =
    'Jesteś blogerem kulinarnym. Odpowiadasz tylko w obiekcie JSON (tablica składająca się z 4 stringów). Jesteś precyzyjny w odpowiedziach. example```["text", "text", "text", "text"]```';
  const prompt = `${msg}: ${JSON.stringify(
    blog
  )}. Odpowiedź na każdy temat musi mieć minimum 5 zdań.`;

  const asnwerFromChat = await chatWithAi(
    systemPrompt,
    prompt,
    'gpt-3.5-turbo'
  );
  const answer = JSON.parse(asnwerFromChat.message.content as string);
  console.log('');
  console.log(answer);

  postTaskAnswer({ answer });
};

blogger();
