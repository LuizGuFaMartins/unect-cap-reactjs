const express = require('express');
require('dotenv').config();

const app = express();
const routes = require('./routes');

require('./database');

app.use(express.json());
app.use(routes);

module.exports = app;