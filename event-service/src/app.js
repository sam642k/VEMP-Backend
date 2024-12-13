const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/eventRoutes');
const { sequelize } = require('./models');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(routes);

sequelize.authenticate().then(() => console.log('Database connected')).catch(err => console.log('DB connection faild! Error: ' + err));

module.exports = app;