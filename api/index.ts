import axios from 'axios';
import 'dotenv/config';

const Api = axios.create({
  baseURL: process.env.API_DOMAIN,
});

interface PostGetTaskTokenResponse {
  token: string
}

interface Answer<T = string> {
  answer: T;
}

interface DefaultTaskDetailsResponse {
  msg: string;
}
// type CustomTaskDetailsResponse<T> = DefaultTaskDetailsResponse & Record<keyof T, string>;
// interface CustomTaskDetailsResponse<T extends DefaultTaskDetailsResponse> {
//   [keyof T]: string;
// };

interface GetTaskDetailsResponse {
  msg: string;
  cookie?: string;
}

const apiFields: { token: string; } = {
  token: '',
};

export const postGetTaskToken = async (token: string) => {
  try {
    console.log('');
    console.info(`[info] Getting task token for "${token}"...`);

    const response = await Api.post<PostGetTaskTokenResponse>(`/token/${token}`, {
      apikey: process.env.API_KEY
    });

    console.log('Done. Response is:', response.data);
    console.log('');

    apiFields.token = response.data.token;
    return response.data.token;
  } catch (e) {
    console.log('[error]', e);
  }
};

export const getTaskDetails = async <T>() => {
  try {
    console.log('');
    console.info(`[info] Getting task details...`);

    const response = await Api.get<GetTaskDetailsResponse>(`/task/${apiFields.token}`);

    console.log('Done. Response is:', response.data);
    console.log('');

    return response.data;
  } catch(e) {
    console.log('[error]', e.response.data);
    return e.response.data;
  }
};

export const postQuestionToTask = async (question: string) => {
  try {
    console.log('');
    console.info(`[info] Sending question to task...`);

    const form = new FormData();
    form.append('question', question);

    const response = await Api.post(`/task/${apiFields.token}`, form);

    console.log('Done. Response is:', response.data);
    console.log('');

    return response.data;
  } catch(e) {
    console.log('[error]', e.response.data);
  }
};

export const postTaskAnswer = async <T>(answer: Answer<T>) => {
  try {
    console.log('');
    console.info(`[info] Sending an answer for task...`);

    const response = await Api.post(`/answer/${apiFields.token}`, answer);;

    console.log('Done. Response is:', response.data);
    console.log('');
  } catch(e) {
    console.log('[error]', e.response.data);
  }
};

export default Api;