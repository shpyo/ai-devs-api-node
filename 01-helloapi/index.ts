import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';

const helloApi = async function() {
  await postGetTaskToken('helloapi');
  const task = await getTaskDetails();

  await postTaskAnswer({ answer: task.cookie });
}

helloApi();