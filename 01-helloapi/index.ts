import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';

interface HelloApiTaskResponse {
  cookie: string;
}

const helloApi = async function () {
  await postGetTaskToken('helloapi');
  const { cookie } = await getTaskDetails<HelloApiTaskResponse>();

  await postTaskAnswer({ answer: cookie });
};

helloApi();
