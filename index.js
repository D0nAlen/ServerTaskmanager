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

  return targetDate;
};

const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {
    mo: Math.random() > 0.5,
  });
};

const generateTask = () => {
    // return {
    //     id: 123,
    //     name: "Igor",
    //     age: 27,
    // }
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    id: String(new Date() + Math.random()),
    description: getRandomArrayItem(DescriptionItems),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    color: getRandomArrayItem(COLOR),
    isArchive: Math.random() > 0.5,
    isFavourite: Math.random() > 0.5,
  };
};

const generateTasks = (count) => {
  return new Array(count).fill(``).map(generateTask);
};

app.use(cors());

app.get(`/`, (req, res) => {
  res.send(generateTasks(7));
  // res.send(generateTask());

  // res.send({ "message": "Hello Alen!" });
});

app.listen(3333, () => {
    console.log('Server start working on port 3333!');
});