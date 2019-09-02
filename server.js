const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

const app = express();
app.use(cors());
app.use(bodyParser.json());
var server = http.Server(app);
var io = socketIO(server);

let questions = [
  {
    id: 0,
    title: 'Amazon Rain forest',
    content: 'How many trees are there in the amazon rain forrest?',
    answer: 390000000000,
  },
  {
    id: 1,
    title: 'The British Empire',
    content: 'At its height in 1913, what percentage of the world population did the British Empire rule over?',
    answer: 23,
  },
  {
    id: 2,
    title: 'iPhone',
    content: 'How much does an iPhone 7 weigh (in grams)?',
    answer: 138,
  },
  {
    id: 3,
    title: 'Tinder Swipes',
    content: 'How many swipes are made on Tinder every day?',
    answer: 1600000000,
  },
  {
    id: 4,
    title: 'The River Nile',
    content: 'How long is the river Nile (in km)?',
    answer: 6695,
  },
  {
    id: 5,
    title: 'Lighting Bolt',
    content: 'How much electricity is in an average bolt of lightning (in volts)?',
    answer: 1000000000,
  },
  {
    id: 6,
    title: 'SpaceX',
    content: 'How much does SpaceX charge to launch a Falcon 9 Rocket (in USD)?',
    answer: 62000000,
  },
  {
    id: 7,
    title: 'YouTube Videos',
    content: 'How many YouTube videos are watched per day?',
    answer: 5000000000,
  },
  {
    id: 8,
    title: 'Crow Flies',
    content: 'How far is Los Angeles to New Delhi as the crow flies (in km)?',
    answer: 12852.22,
  },
  {
    id: 9,
    title: 'Peyton Manning',
    content: 'How many touchdown passes did Peyton Manning throw in his career?',
    answer: 539,
  },
  {
    id: 10,
    title: 'Premier League Goals',
    content: 'How many goals did the player who scored the most in Premier League history score in their career?',
    answer: 260,
  },
  {
    id: 11,
    title: 'Premier League Goals',
    content: 'How many league goals did Florent Malouda score for Chelsea between 2007-2013?',
    answer: 35,
  },
  {
    id: 12,
    title: 'Premier League Games',
    content: 'How many league games did Kim Källström play in the 2013-14 season for Arsenal?',
    answer: 3,
  },
  {
    id: 13,
    title: 'How Much For Zizou',
    content: 'How much money (€) did Real Madrid pay Juventus to purchase Zinedine Zidane in 2001?',
    answer: 77500000,
  },
  {
    id: 14,
    title: 'Golf Drive To The Moon?',
    content: 'How far (in meters) was the longest golf drive ever recorded?',
    answer: 471,
  },
  {
    id: 15,
    title: `3's The Magic Number`,
    content: 'How many 3-pt shots did Ray Allen make in his career?',
    answer: 2973,
  },
  {
    id: 16,
    title: `Tiger Energy`,
    content: 'How many holes-in-ones did Tiger Woods hit in his lifetime?',
    answer: 18,
  },
  {
    id: 17,
    title: `Crow Flies`,
    content: 'How far is New York to Brasilia as the crow flies (km)?',
    answer: 6835,
  },
  {
    id: 18,
    title: `Crow Flies`,
    content: 'How far is Cairo to The North Pole as the crow flies (km)?',
    answer: 9476,
  },
  {
    id: 19,
    title: `Crow Flies`,
    content: 'How far is Tokyo to Vancouver as the crow flies (km)?',
    answer: 7557,
  },
  {
    id: 20,
    title: `Babies On Babies`,
    content: 'What was the world population in the year 2000?',
    answer: 6082966429,
  },
  {
    id: 21,
    title: `Viva El Sur`,
    content: 'How many sovereign states are in South America?',
    answer: 12,
  },
  {
    id: 23,
    title: `Brexit Means Brexit`,
    content: 'How many cities are there in the UK?',
    answer: 65,
  },
  {
    id: 24,
    title: `The Land Of The Shopping Mall`,
    content: 'How many shopping malls are there in the USA?',
    answer: 116000,
  },
  {
    id: 25,
    title: `The Land Of The Shopping Mall`,
    content: 'The place in the world thats name has the most letters is how many letters long?',
    answer: 163,
  },
  {
    id: 26,
    title: `Holy Guacamole, That Small?!`,
    content: 'How small is the smallest country in the world (in km)?',
    answer: 0.44,
  },
  {
    id: 27,
    title: `More Like A Million Island Sauce...`,
    content: 'How many bottles of Ketchup does Heinz sell annually?',
    answer: 650000000,
  },
  {
    id: 28,
    title: `ReallyBigMac`,
    content: 'How many McDonalds restaurants are there worldwide?',
    answer: 36899,
  },
  {
    id: 29,
    title: `Walmart employs how many people?!`,
    content: 'How many people does Walmart employ?',
    answer: 2300000,
  },
  {
    id: 30,
    title: `Wiipii!`,
    content: 'Since its release in 2006, how many Nintendo Wii consolses have been sold?',
    answer: 101630000,
  },
  {
    id: 31,
    title: `Jeff Peazos`,
    content: `Considered the richest man in history, adjusted for inflation, what was Musa I of Mali's (1280-1337) net worth?`,
    answer: 4000000000,
  },
  {
    id: 32,
    title: `Live Fast Die Old`,
    content: `What age did the oldest reported living human reach?`,
    answer: 122,
  },
  {
    id: 33,
    title: `Vroom Vroom`,
    content: `How much does a Ferrari 485 weigh (in tonnes)?`,
    answer: 1.565,
  },
  {
    id: 34,
    title: `Elephantastic Fact!`,
    content: `How much does an average adult African bush elephant weigh (in tonnes)?`,
    answer: 6,
  },
  {
    id: 35,
    title: `They say wine is good for the heart`,
    content: `How many bottles of wine does France produce each year?`,
    answer: 7500000,
  },
  {
    id: 36,
    title: `Oranges and lemons`,
    content: `What is the circumference of the largest orange ever grown (in cm)?`,
    answer: 63.5,
  },


];


let Id = 10;

app.post('/questions', (req, res) => {
  const { title, question, answer } = req.body;
  const newQ = { title, question, answer, id: Id };
  if (!title || !question || !answer) {
    return sendUserError(
      'All parts are required pleeeeease!',
      res
    );
  }

  questions.push(newQ);
  Id++;
  res.json(questions);
});


app.get('/questions', (req, res) => {
  res.status(200).json(questions);
});


module.exports = app;