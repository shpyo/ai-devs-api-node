import { chatWithAiFunctionCalling } from '../api/openai';
import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';
import { functions } from './functions';

interface ToolsTaskResponse {
  question: string;
}

const currentDate = new Date();

const systemPrompt = `
Jako AI assistent pomagasz ustalić czy wiadomość od użytkownika to zadanie typu "ToDo" czy "Calendar".
Odpowiadasz tylko i wyłącznie w postacie obiektu JSON:
{ "tool":"Calendar/ToDo", "desc":"krótkie podsumowanie zadanie", "date":"2024-04-11" }

"date" w opowiedzi pojawia się tylko i wyłącznie gdy użytkownik w swoim zapytaniu nawiązuje do jakieś terminu np. dentysta w poniedziałek, pojutrze wizyta u mechanika

przykład:
- Przypomnij mi, że mam kupić mleko = {"tool":"ToDo","desc":"Kup mleko" }
- Jutro mam spotkanie z Marianem = {"tool":"Calendar","desc":"Spotkanie z Marianem","date":"2024-04-11"}

fakt:
- aktualna data ${currentDate.getFullYear()}-${
  currentDate.getMonth() + 1
}-${currentDate.getDate()}`;

const tools = async function () {
  await postGetTaskToken('tools');
  const { question } = await getTaskDetails<ToolsTaskResponse>();

  const { message } = await chatWithAiFunctionCalling(
    functions,
    question,
    [
      {
        role: 'system',
        content: systemPrompt,
      },
    ],
    'gpt-4'
  );

  const { tool, desc, date } = JSON.parse(
    message.tool_calls[0].function.arguments
  ) as {
    tool: 'string';
    desc: 'string';
    date?: 'string';
  };
  console.log(message.tool_calls);
  await postTaskAnswer({
    answer: {
      tool,
      desc,
      date,
    },
  });
};

tools();
