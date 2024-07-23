const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3003);


app.get('/', (req, res) => {  // this will listen for a get request
  // res.send('<p>home page</p>');
  res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  // res.send('<p>about page</p>');
  res.sendFile('./views/about.html', { root: __dirname });
});

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});



// 404 page
// this response has to stay at the bottom of the file
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
});