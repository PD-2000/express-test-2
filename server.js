const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');
const app = express();

app.engine('hbs', hbs({extname: 'hbs', layoutsDir: './views/layouts', defaultLayout: 'main'}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({extended: false}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({storage: storage});

app.get('/', (req, res) => {
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
app.get('/history', (req, res) => {
  res.render('history');
});
app.get('/hello/:name', (req, res) => {
  res.render('Hello', {layout: false, name: req.params.name});
});

app.post('/contact/send-message', upload.single('design'), (req, res) => {
  const {author, sender, title, message} = req.body;
  if(author && sender && title && message){
    const fileName = req.file.originalname;
    const fileExtension = path.extname(fileName).substring(1);

    res.render('contact', {isSent: true, fileName, fileExtension});
  }
  else
    res.render('contact', {isError: true});
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});