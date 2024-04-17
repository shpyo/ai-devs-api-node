import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';
import 'dotenv/config';

interface MemeTaskResponse {
  text: string;
  image: string;
}
const tplId = 'noisy-zebras-search-smoothly-1278';

const meme = async function () {
  await postGetTaskToken('meme');
  const { text, image } = await getTaskDetails<MemeTaskResponse>();

  const renderFormTpl = await fetch(`https://get.renderform.io/api/v2/render`, {
    method: 'POST',
    body: JSON.stringify({
      template: tplId,
      data: {
        'TEXT.text': text,
        'NAME.src': image,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.RENDERFORM_API_KEY,
    },
  });
  const img: { requestId: string; href: string } = await renderFormTpl.json();
  console.log(img);

  await postTaskAnswer({ answer: img.href });
};

meme();
