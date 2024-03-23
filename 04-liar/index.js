import { getTaskDetails, postTaskAnswer, postQuestionToTask, postGetTaskToken } from '../api/index.js';
import { chatWithAi } from '../api/openai.js';

const liar = async function() {
  const question = 'What is the capital of Poland?';
  const taskToken = await postGetTaskToken('liar');
  const task = await getTaskDetails(taskToken);
  const q = await postQuestionToTask(taskToken, question);

  const systemPrompt = 'You check if the answer is correct for a given answer. In the response you return just a string YES or NO.';
  const prompt = 'question```'+question+'``` answer```'+ q.answer +'```';

  const asnwerFromChat = await chatWithAi(systemPrompt, prompt, 'gpt-3.5-turbo');

  postTaskAnswer(taskToken, { answer: asnwerFromChat.message.content });
}

liar();