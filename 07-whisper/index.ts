import { audioToTextFromStorage /*, audioToTextFromUrl*/ } from '../api/openai';
import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';

// NOTE: mp3 file downloaded from Safari has different mime type than the same file downloaded from Chrome!

const whisper = async function () {
  await postGetTaskToken('whisper');
  const { msg } = await getTaskDetails();

  // const text = await audioToTextFromUrl(msg.split(': ')[1]);
  const text = await audioToTextFromStorage('mateusz.mp3');

  postTaskAnswer({ answer: text });
};

whisper();
