import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api/index.js';
import { moderate } from '../api/openai.js';

const moderation = async function() {
  const taskToken = await postGetTaskToken('moderation');
  const task = await getTaskDetails(taskToken);
  const moderates = task.input.map(moderate);

  const moderationResults = [];

  await Promise.all(moderates).then((responses) => {
    console.log('');
    console.log('All done.');
    console.log('');
    responses.forEach((response, i) => {
      console.log(task.input[i], 'is', response.flagged ? 'flagged' : 'ok');
      moderationResults.push(Number(response.flagged));
    })
  });

  postTaskAnswer(taskToken, { answer: moderationResults });
}

moderation();