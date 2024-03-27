import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api/index';
import { chatWithAi } from '../api/openai';

interface InPromptTaskDetails {
  input: string[];
  question: string;
}

const inprompt = async function() {
  await postGetTaskToken('inprompt');
  const { input, question } = await getTaskDetails() as InPromptTaskDetails;

  const systemPrompt = 'Zwracasz tylko imię z podanego zdania. Zanim zwrócisz imię usuń zbędne znaki np. przecinek, kropka.';

  const asnwerFromChat = await chatWithAi(systemPrompt, question, 'gpt-3.5-turbo');
  const realName = asnwerFromChat.message.content;

  const filteredName = input.filter(info => info.includes(realName));
  
  if (filteredName) {
    const answer = await chatWithAi(filteredName[0], question, 'gpt-3.5-turbo');

    postTaskAnswer({ answer: answer.message.content });
  } else {
    console.log('[inprompt] nie znalazł imienia', realName)
  }
}

inprompt();