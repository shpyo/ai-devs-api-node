import {
  getTaskDetails,
  postTaskAnswer,
  postQuestionToTask,
  postGetTaskToken,
} from '../api';
import { chatWithAi } from '../api/openai';

const liar = async function () {
  const question = 'What is the capital of Poland?';
  await postGetTaskToken('liar');
  await getTaskDetails();
  const q = await postQuestionToTask(question);

  const systemPrompt =
    'You check if the answer is correct for a given answer. In the response you return just a string YES or NO.';
  const prompt = 'question```' + question + '``` answer```' + q.answer + '```';

  const asnwerFromChat = await chatWithAi(
    systemPrompt,
    prompt,
    'gpt-3.5-turbo'
  );

  postTaskAnswer({ answer: asnwerFromChat.message.content });
};

liar();
