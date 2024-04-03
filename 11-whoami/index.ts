import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';
import { chatWithAiWithHistory } from '../api/openai';
import { delay } from './utils';
import { addUserChat, addAssistantChat, getChatHistory } from './chatHistory';

const systemPrompt = `Na podstawie podanych wskazówek zgadnik imię i nazwisko znanej osoby.
Wskazówki mogą odnosić się do wyglądu, zachowania, osiągnięć lub innych cech godnych uwagi.
Jeśli nie jesteś pewien w ponad 95% o jaką osobę chodzi odpowiedz: 'Nie jestem pewien. Potrzebuję więcej wskazówek'.
Jeśli wiesz w ponad 95% o jaką osobę chodzi odpowiedz: 'Tak. Mowa o [nazwa osoby]'
Rozważ uważnie każdą wskazówkę, aby ustalić, czy masz wystarczającą ilość informacji do pewnej identyfikacji.`;

const guessPerson = async function () {
  const { hint } = await getTaskDetails<{ hint: string }>();
  addUserChat(hint);

  const chat = await chatWithAiWithHistory(
    systemPrompt,
    getChatHistory(),
    'gpt-3.5-turbo'
  );
  const assistantResponse = chat.message.content;

  if (assistantResponse.includes('Nie jestem pewien')) {
    addAssistantChat(assistantResponse);
    await delay();
    await guessPerson();
    return;
  }

  const response = await postTaskAnswer({ answer: assistantResponse });
  if (response.msg === 'this is NOT the correct answer') {
    addAssistantChat(assistantResponse);
    addUserChat('To nie jest poprawna odpowiedź.');
    await delay();
    await guessPerson();
    return;
  }
  return;
};

const whoami = async function () {
  await postGetTaskToken('whoami');

  await guessPerson();
};

whoami();
