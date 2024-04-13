var express = require('express');
var bodyParser = require('body-parser');
var OpenAI = require('openai');
require('dotenv/config');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/answer', async function (req, res) {
  const { question } = req.body;

  console.log('');
  console.log('json received');
  console.log(question);

  console.log('');
  console.log('[OpenAI] starting conversation...');

  const completion = await openai.chat.completions.create({
    messages: [
      // {
      //   role: 'system',
      //   content: systemPrompt,
      // },
      {
        role: 'user',
        content: question,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  console.log('');
  console.log('[OpenAI] response:');
  console.log(completion.choices[0].message.content);

  // return completion.choices[0];
  res.json({ reply: completion.choices[0].message.content }).status(200).end();
});

app.listen(8888, () => {
  console.log(`Example app listening on port 8888`);
});
