import { ChatHistory } from '../api/openai';

const chatHistory: ChatHistory[] = [];

export const addChat = function (chat: ChatHistory[]) {
  chatHistory.push(...chat);
};

export const addUserChat = function (content: string) {
  addChat([
    {
      role: 'user',
      content,
    },
  ]);
};

export const addAssistantChat = function (content: string) {
  addChat([
    {
      role: 'assistant',
      content,
    },
  ]);
};

export const getChatHistory = function () {
  return chatHistory;
};
