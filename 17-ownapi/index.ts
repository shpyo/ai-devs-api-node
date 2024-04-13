import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';

const ownapi = async function () {
  await postGetTaskToken('ownapi');
  await getTaskDetails();

  await postTaskAnswer({ answer: 'https://fronthero.bieda.it/answer' });
};

ownapi();
