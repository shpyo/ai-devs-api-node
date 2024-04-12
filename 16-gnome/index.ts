import { checkAiImage } from '../api/openai';
import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';

interface GnomeTaskResponse {
  url: string;
}

const gnome = async function () {
  await postGetTaskToken('gnome');
  const { msg, url } = await getTaskDetails<GnomeTaskResponse>();

  const { message } = await checkAiImage(msg, url);
  await postTaskAnswer({ answer: message.content });
};

gnome();
