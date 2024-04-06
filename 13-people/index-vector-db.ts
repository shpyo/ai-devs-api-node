import { chatWithAi } from '../api/openai';
import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';
import qdrant from './qdrant';

interface PeopleTaskResponse {
  question: string;
}

// run feed.ts first
const people = async function () {
  await postGetTaskToken('people');
  const { question } = await getTaskDetails<PeopleTaskResponse>();

  const q = qdrant('people');
  const search = await q.search(question);
  console.log(search);
  if (search.length) {
    const details = search[0].payload.data;
    const answer = await chatWithAi(
      `Odpowiedz krótko, zwięźle i na temat na pytanie o informację na temat danej osoby.
  Dane o osobie znajdziesz w postaci obiektu JSON:
  ${details}`,
      question,
      'gpt-3.5-turbo'
    );
    postTaskAnswer({ answer: answer.message.content });
  }
};

people();
