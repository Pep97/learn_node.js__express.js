/* Setup a basic server

const http = require('http');

// req has info about the request
// res has info about the response

// create a server
const server = http.createServer((req, res) => {
  console.log('request made');
});

// localhost is the default value for 2nd argument
server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
});

// 3000 is the port number
// localhost is the host name
// you have to a function as the 3rd argument

const http = require('http');
const fs = require('fs');

*/

// ---------------------------------------------------------------

// to run nodemon just run nodemon server in the terminal


const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {

    // lodash
  const num = _.random(0, 20); // this will generate a random number between 0 and 20
  console.log(num);

  const greet = _.once(() => {  // this will only run once
    console.log('hello');
  });
  greet();
  greet();

  // console.log(req);
  // console.log(req.url);

  // set header content type
  res.setHeader('Content-Type', 'text/html');

  // res.write('<p>hello, ninjas</p>');
  // res.write('<p>hello again, ninjas</p>');
  // res.end(); 

  // in this way you're sending the response in one go, and it will print your HTML tags.
  // by defualt the browser will add head & body tags to your HTML code.
  // You can't add anything else after res.end() because you're ending the response.



  // send html file

  // fs.readFile('./views/index.html', (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     res.end();
  //   }
  //   //res.write(data);
  //   res.end(data);
  // });

  // ROUTING

  // you need routing to serve different pages based on the URL

  let path = './views/';
  switch(req.url) {
    case '/': // if this is true, then do the following
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about': // if this is true, then do the following
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-us': // if this is true, then do the following
      res.statusCode = 301; 
      // this is a redirect and it will redirect to the about page
      res.setHeader('Location', '/about');
      res.end();
      break;
    default: // this is the default case
      path += '404.html';
      res.statusCode = 404;
  }

  // send html
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    //res.write(data);
    res.end(data);
  });


});

// localhost is the default value for 2nd argument
server.listen(3002, 'localhost', () => {
  console.log('listening for requests on port 3002');
});