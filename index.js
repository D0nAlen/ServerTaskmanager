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

const createNewTask = (newTask) => {
  allTasks.push(newTask);
  // console.log(allTasks);

  // return allTasks;
}

const updateTask = (taskId, changedTask) => {
  allTasks.map((obj) => {
    if (obj.id === taskId) {
      Object.assign(obj, changedTask);
    }
  });
  // console.log(allTasks);
}

// осталось исправить:
// 1)saving...deleting... - зависают
// 3)не сохраняются значения флагов повторяющейся таски(repeating)
// 4)обновление таски - должен возвращать обновленные данные

const deleteTask = (taskId) => {
  const index = allTasks.findIndex(item => item.id === taskId);
  allTasks.splice(index, 1);
}


let allTasks = generateTasks(7);
app.use(cors());
app.use(express.json());

app.get(`/tasks`, (req, res) => {
  res.send(allTasks);
  // res.send({ "message": "Hello Alen!" });
});

// 1)данные приходят с клиента, но saving на кнопке не исчезает(виснет). Форма должна закрыться(как?)
// createNewTask
app.post('/tasks', function (req, res) {
  createNewTask(req.body);

  // res.send(allTasks);
})

// updateTask
app.put('/tasks/:id', function (req, res) {
  updateTask(req.params.id, req.body);
  // res.send(allTasks);
  // console.log(allTasks);
});

// deleteTask
app.delete('/tasks/:id', function (req, res) {
  deleteTask(req.params.id);
  res.send(allTasks);
});

app.listen(3333, () => {
  console.log('Server start working on port 3333!');
});