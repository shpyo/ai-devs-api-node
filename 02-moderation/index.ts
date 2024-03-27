import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';
import { moderate } from '../api/openai';

interface ModerationTaskResponse {
  input: string[];
}
type ModerationAnswer = number[];

const moderation = async function () {
  await postGetTaskToken('moderation');
  const task = await getTaskDetails<ModerationTaskResponse>();
  const moderates = task.input.map(moderate);

  const moderationResults: ModerationAnswer = [];

  await Promise.all(moderates).then((responses) => {
    console.log('');
    console.log('All done.');
    console.log('');
    responses.forEach((response, i) => {
      console.log(task.input[i], 'is', response.flagged ? 'flagged' : 'ok');
      moderationResults.push(Number(response.flagged));
    });
  });

  postTaskAnswer<ModerationAnswer>({ answer: moderationResults });
};

moderation();
