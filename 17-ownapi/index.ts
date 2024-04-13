import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';
import 'dotenv/config';

const ownapi = async function () {
  await postGetTaskToken('ownapi');
  await getTaskDetails();

  await postTaskAnswer({ answer: process.env.MY_API_DOMAIN });
};

ownapi();
