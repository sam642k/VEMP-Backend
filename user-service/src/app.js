const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/userRoutes');
const { sequelize } = require('./models');
const app = express();

app.use(cors());
app.use(bodyParser.json()); 

app.use(routes);

// console.log("Database Config:", {
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     host: process.env.DB_HOST,
//   });
  

sequelize.authenticate().then(() => console.log('Database connected')).catch(err => console.log('DB connection faild! Error: ' + err));

module.exports = app;