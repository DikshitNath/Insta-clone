const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);

module.exports = app;