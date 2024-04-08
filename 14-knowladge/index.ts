import { chatWithAiFunctionCalling } from '../api/openai';
import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';
import { functions, fn } from './functions';

interface KnowledgeTaskResponse {
  question: string;
}

const knowledge = async function () {
  await postGetTaskToken('knowledge');
  const { msg, question } = await getTaskDetails<KnowledgeTaskResponse>();

  const { finish_reason, message } = await chatWithAiFunctionCalling(
    functions,
    question
  );

  if (finish_reason === 'tool_calls') {
    const fnToCall = message.tool_calls[0].function.name as
      | 'getCurrency'
      | 'getCountryPopulation';
    const argsToPass = JSON.parse(message.tool_calls[0].function.arguments) as {
      arg: string;
    };
    const response = await fn[fnToCall](argsToPass.arg);
    await postTaskAnswer({ answer: response });
  } else {
    await postTaskAnswer({ answer: message.content });
  }
};

knowledge();
