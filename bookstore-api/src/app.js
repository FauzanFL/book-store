const express = require('express');
const session = require('express-session');
require('dotenv').config();

const app = express();
const port = 3000;

const usersRoute = require('./routes/usersRoute');
const booksRoute = require('./routes/booksRoute');
const cartsRoute = require('./routes/cartsRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/users', usersRoute);
app.use('/books', booksRoute);
app.use('/carts', cartsRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
