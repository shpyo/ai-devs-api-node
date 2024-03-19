import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api/index.js';

const helloApi = async function() {
  const taskToken = await postGetTaskToken('helloapi');
  const task = await getTaskDetails(taskToken);
  await postTaskAnswer(taskToken, { answer: task.cookie });
}

helloApi();