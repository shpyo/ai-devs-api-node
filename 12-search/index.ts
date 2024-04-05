import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';
import qdrant from './qdrant';

interface SearchTaskResponse {
  question: string;
}

// run feed.ts first
const search = async function () {
  await postGetTaskToken('search');
  const { question } = await getTaskDetails<SearchTaskResponse>();

  const q = qdrant('test');
  const search = await q.search(question);
  if (search.length) {
    const answer = search[0].payload.url;
    postTaskAnswer({ answer });
  }
};

search();
