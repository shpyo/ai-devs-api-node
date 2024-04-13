import { checkAiImage } from '../api/openai';
import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';

interface GnomeTaskResponse {
  url: string;
}

const prompt = `Na rysunku będzie przedstawiony skrzat.
Zadanie polega na określenie koloru kapelusza skrzata na głowie.
Jeżeli na zdjęciu nie będzie skrzata lub wystąpi inny błąd zwróć tylko i wyłącznie odpowiedź: "ERROR".`;

const gnome = async function () {
  await postGetTaskToken('gnome');
  const { msg, url } = await getTaskDetails<GnomeTaskResponse>();

  const { message } = await checkAiImage(prompt, url);
  await postTaskAnswer({ answer: message.content });
};

gnome();
