var express = require('express');
var bodyParser = require('body-parser');
var OpenAI = require('openai');
var {
  clearHistory,
  addUserChat,
  addAssistantChat,
  getChatHistory,
} = require('./chat-history');
require('dotenv/config');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/clear', async function (req, res) {
  clearHistory();
  res.json({ status: 'done' });
});

app.get('/history', async function (req, res) {
  res.json({ history: getChatHistory() });
});

app.post('/answer', async function (req, res) {
  const { question } = req.body;

  console.log('');
  console.log('json received');
  console.log(question);

  addUserChat(question);

  console.log('');
  console.log('[OpenAI] starting conversation...');

  console.log('history', question);
  const completion = await openai.chat.completions.create({
    messages: getChatHistory(),
    model: 'gpt-3.5-turbo',
  });

  const answer = completion.choices[0].message.content;
  addAssistantChat(answer);

  console.log('');
  console.log('[OpenAI] response:');
  console.log(answer);

  // return completion.choices[0];
  res.json({ reply: answer }).status(200).end();
});

app.listen(8888, () => {
  console.log(`Example app listening on port 8888`);
});
