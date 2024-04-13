let chatHistory = [];

const addChat = function (chat) {
  chatHistory.push(...chat);
};

const addUserChat = function (content) {
  addChat([
    {
      role: 'user',
      content,
    },
  ]);
};

const addAssistantChat = function (content) {
  addChat([
    {
      role: 'assistant',
      content,
    },
  ]);
};

const clearHistory = function (content) {
  chatHistory = [];
};

const getChatHistory = function () {
  return chatHistory;
};

module.exports = {
  getChatHistory,
  addAssistantChat,
  addUserChat,
  clearHistory,
};
