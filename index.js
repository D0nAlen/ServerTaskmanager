const express = require(`express`);
const cors = require(`cors`);
const app = express();

const COLOR = {
  BLACK: `black`,
  YELLOW: `yellow`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`,
};

const COLORS = Object.values(COLOR);

const DescriptionItems = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const DefaultRepeatingDays = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false,
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * max - min);
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return Date.parse(targetDate);
  // return Date.now();
};

const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {
    mo: Math.random() > 0.5,
  });
};

const generateTask = () => {
  const dueDate = getRandomDate(); //Math.random() > 0.5 ? null : getRandomDate();
  return {
    id: String(new Date().getTime() + Math.random()),
    description: getRandomArrayItem(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    color: getRandomArrayItem(COLORS),
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
  };
};

const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};

let allTasks = generateTasks(7);
app.use(cors());

app.get(`/tasks`, (req, res) => {
  res.send(allTasks);
  // res.send({ "message": "Hello Alen!" });
});

// createNewTask
app.post('/tasks', function (req, res) {
  res.send(allTasks);
  // res.send('POST request to homepage')
})

// updateTask
app.put('/tasks', function (req, res) {
  res.send(allTasks);
});

app.listen(3333, () => {
  console.log('Server start working on port 3333!');
});