const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

const usersRoute = require('./routes/usersRoute');
const booksRoute = require('./routes/booksRoute');
const cartsRoute = require('./routes/cartsRoute');
const transactionRoute = require('./routes/transactionRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
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
app.use('/transactions', transactionRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
