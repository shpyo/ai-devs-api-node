import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';
import { createEmbedding } from '../api/openai';

interface InPromptTaskDetails {
  input: string[];
  question: string;
}

const embedding = async function () {
  await postGetTaskToken('embedding');
  await getTaskDetails();

  const embedding = await createEmbedding('Hawaiian pizza');

  postTaskAnswer({ answer: embedding });
};

embedding();
