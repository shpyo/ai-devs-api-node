import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';
import { createEmbedding } from '../api/openai';

const embedding = async function () {
  await postGetTaskToken('embedding');
  await getTaskDetails();

  const embedding = await createEmbedding('Hawaiian pizza');

  postTaskAnswer({ answer: embedding });
};

embedding();
