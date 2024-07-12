const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

const usersRoute = require('./routes/usersRoute');
const booksRoute = require('./routes/booksRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'ffl',
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/users', usersRoute);
app.use('/books', booksRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
