import axios from 'axios';
import 'dotenv/config';

const Api = axios.create({
  baseURL: 'https://tasks.aidevs.pl',
});

export const postGetTaskToken = async (token) => {
  try {
    console.log('');
    console.info(`[info] Getting task token for "${token}"...`);

    const response = await Api.post(`/token/${token}`, {
      apikey: process.env.API_KEY
    });

    console.log('Done. Response is:', response.data);
    console.log('');

    return response.data.token;
  } catch (e) {
    console.log('[error]', e);
  }
};

export const getTaskDetails = async (token) => {
  try {
    console.log('');
    console.info(`[info] Getting task details...`);

    const response = await Api.get(`/task/${token}`);

    console.log('Done. Response is:', response.data);
    console.log('');

    return response.data;
  } catch(e) {
    console.log('[error]', e);
  }
};

export const postTaskAnswer = async (token, answer) => {
  try {
    console.log('');
    console.info(`[info] Sending an answer for task...`);

    const response = await Api.post(`/answer/${token}`, answer);;

    console.log('Done. Response is:', response.data);
    console.log('');
  } catch(e) {
    console.log('[error]', e);
  }
};

export default Api;