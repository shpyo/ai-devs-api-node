import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api/index.js';
import { chatWithAi } from '../api/openai.js';

const blogger = async function() {
  const taskToken = await postGetTaskToken('blogger');
  const task = await getTaskDetails(taskToken);

  const systemPrompt = 'Jesteś blogerem kulinarnym. Odpowiadasz tylko w obiekcie JSON (tablica składająca się z 4 stringów). Jesteś precyzyjny w odpowiedziach. example```["text", "text", "text", "text"]```';
  const prompt = `${task.msg}: ${JSON.stringify(task.blog)}. Odpowiedź na każdy temat musi mieć minimum 5 zdań.`;

  const asnwerFromChat = await chatWithAi(systemPrompt, prompt, 'gpt-3.5-turbo');
  const answer = JSON.parse(asnwerFromChat.message.content);
  console.log('');
  console.log(answer)
  
  postTaskAnswer(taskToken, { answer });
}

blogger();