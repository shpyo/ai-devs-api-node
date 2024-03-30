import { getTaskDetails, postTaskAnswer, postGetTaskToken } from '../api';

const functionDef = {
  name: 'addUser',
  description: 'adds a user',
  parameters: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'user name',
      },
      surname: {
        type: 'string',
        description: 'user surname',
      },
      year: {
        type: 'integer',
        description: 'year of born',
      },
    },
  },
};

const functions = async function () {
  await postGetTaskToken('functions');
  await getTaskDetails();

  postTaskAnswer({ answer: functionDef });
};

functions();
