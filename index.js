const express = require('express');
const morgan = require('morgan'); // midleware, логгер данных
const mongoose = require('mongoose');
const methodOverride = require('method-override'); // для того, чтобы отловить и отреагировать на флаг PUT с тега form, со страницы edit-post
const createPath = require('./helpers/create-path'); // фун-я для сокращения записи пути
const postRoutes = require('./routs/post-routes');
const contactRoutes = require('./routs/contact-routes');
const postApiRoutes = require('./routs/api_post_routes'); // api сервера
require('dotenv').config();
const chalk = require('chalk');
const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
   .then(res => console.log(successMsg('Connected to db')))
   .catch(err => console.log(errorMsg(err)));

app.listen(process.env.PORT, (err) => {
   err ? console.log(errorMsg(err)) : console.log(successMsg(`Server started on port: ${process.env.PORT}`));
});

app.set('view engine', 'ejs');

app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); // midleware, логгер
app.use(express.static('style'));
app.use(methodOverride('_method')); // для того, что бы отловить и отреагировать на флаг PUT с тега form, со страницы edit-post
app.use(express.urlencoded({extended: false})); // для распознавания объекта входящего запроса в виде строк или массивов, для обработки данных с формы

app.get('/', (req, res) => {
   const title = 'Home';
   res.render(createPath('index'), {title});
});

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);

app.use((req, res) => { // midleware, редиректит в случае несоответствующих адресов
   const title = 'Error';
   res
   .status(404)
   .render(createPath('error'), {title})
});