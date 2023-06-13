const express = require('express');
const path = require('path');
const app = express();
const hbs = require('express-handlebars');

app.engine('hbs', hbs({extname: 'hbs', layoutsDir: './views/layouts', defaultLayout: 'main'}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index.hbs');
});
app.get('/about', (req, res) => {
  res.render('about.hbs');
});
app.get('/contact', (req, res) => {
  res.render('contact.hbs');
});
app.get('/info', (req, res) => {
  res.render('info.hbs');
});
app.get('/history', (req, res, next) => {
  res.render('history.hbs');
});
app.get('/hello/:name', (req, res) => {
  res.render('Hello', {name: req.params.name});
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});