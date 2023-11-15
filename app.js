const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./src/routes/indexRouter');
const productsRouter = require('./src/routes/productsRouter');
const categoriesRouter = require('./src/routes/categoriesRouter');
const methodOverride = require('method-override');
const app = express();

app.use(express.static(path.resolve(__dirname, './src/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('views', path.resolve(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.listen(3001, () => {
    console.log('Server running on port 3001');
})

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);