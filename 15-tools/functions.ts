import { FunctionsType } from 'api/openai';

export const functions: FunctionsType = [
  {
    type: 'function',
    function: {
      name: 'makeDecision',
      description:
        'Makes a decision whether the task should be added to the ToDo list or to the Calendar.',
      parameters: {
        type: 'object',
        properties: {
          tool: {
            type: 'string',
            description: `
            'ToDo' - when user wants to perform any action that need to be added to the todo list
            'Calendar' - when user wants to make an event`,
          },
          desc: {
            type: 'string',
            description: 'short summary of user input',
          },
          date: {
            type: 'string',
            description:
              'Optional parameter added only when user refers to any date or time in format "YYYY-MM-DD" e.g. 2024-01-28',
          },
        },
        required: ['tool', 'desc'],
      },
    },
  },
];
