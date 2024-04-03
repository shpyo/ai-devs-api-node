import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';
import { getPageContent } from '../api/scraper';
import { chatWithAi } from '../api/openai';

const scraper = async function () {
  await postGetTaskToken('scraper');
  const { msg, input, question } = await getTaskDetails<{
    input: string;
    question: string;
  }>();

  try {
    console.log('[scraper] loading data...', input);

    const text = await getPageContent(input);

    const hasError =
      text.includes('server error X_X') ||
      text.includes('bot detected!') ||
      text.includes('timeout error');

    if (hasError) {
      console.log('[scraper] ERROR could not retrieve text:', text);
    } else {
      console.log('[scraper] Got the article');
      const chat = await chatWithAi(
        `${msg}.
article:
${text}`,
        question,
        'gpt-3.5-turbo'
      );
      postTaskAnswer({ answer: chat.message.content });
    }
  } catch (e) {
    console.log('[scraper] error', e);
  }
};

scraper();
