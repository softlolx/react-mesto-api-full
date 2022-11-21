const express = require('express');
const mongoose = require('mongoose');
const parser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const routes = require('./routes');
const errorsHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.json());
app.use(parser());
app.use(requestLogger);
app.use(cors);
app.use(routes);
app.use(errors());
app.use(errorLogger);
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
