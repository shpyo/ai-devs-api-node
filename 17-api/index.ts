import { checkAiImage } from '../api/openai';
import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';

interface GnomeTaskResponse {
  url: string;
}
const ownapi = async function () {
  await postGetTaskToken('ownapi');
  const { msg, url } = await getTaskDetails<GnomeTaskResponse>();

  // const { message } = await checkAiImage(prompt, url);
  // await postTaskAnswer({ answer: message.content });
};

ownapi();
