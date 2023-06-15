const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const app = express();

app.engine('hbs', hbs({extname: 'hbs', layoutsDir: './views/layouts', defaultLayout: 'main'}));
app.set('view engine', 'hbs');
// app.use((req, res, next) => {
//   res.show = (name) => {
//     res.sendFile(path.join(__dirname, `/views/${name}`));
//   };
//   next();
// });
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: false}));
// app.use(express.json());

app.get('/', (req, res) => {
  // res.show('index.html');
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/info', (req, res) => {
  res.render('info');
});
app.get('/history', (req, res, next) => {
  res.render('history');
});
// app.get('/hello/:name', (req, res) => {
//   res.send(`Hello ${req.params.name}.`);
// });
app.get('/hello/:name', (req, res) => {
  res.render('Hello', {name: req.params.name});
});

// app.post('/contact/send-message', (req, res) => {
//   res.json(req.body);
// });
app.post('/contact/send-message', (req, res) => {
  const {author, sender, title, message} = req.body;
  if(author && sender && title && message)
    res.render('contact', {isSent: true});
  else
    res.render('contact', {isError: true});
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

/*
const http = require('http');

const server = http.createServer((req, res) => {
  if(req.url === '/' && req.method === 'GET'){
    res.write('<h1>My first server!</h1>');
    res.end();
  }
  else if(req.url === 'about/' && req.method === 'GET'){
    res.write('<h1>About</h1>');
    res.end();
  }
  // ...then similar other routes
})

server.listen(8000, (err) => {
  if(err) return console.log('something bad happened', err);
  console.log(`server is listening on ${8000}`);
});
*/