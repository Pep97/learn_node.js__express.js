// nodemon app -> start the server and go to localhost:3003

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');



// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = 'mongodb+srv://nodecourse:nodecourse1@cluster1.en0krxi.mongodb.net/nodecourse?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then(result => app.listen(3003)) // listen for requests
  .catch(err => console.log(err));



/* example of middleware



app.use((req,res) =>{
    console.log('new request made');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
})
*/

//  middleware & static files  -> used for css, js, images
app.use(express.static('public')); // this will make the public folder available to the browser and you'll be to use css
app.use(express.urlencoded({ extended: true })); // this will parse the form data and add it to the request object
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

// mongoose & mongo tests
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
      title: 'new blog',
      snippet: 'about my new blog',
      body: 'more about my new blog'
    })
  
    blog.save() // this will save the blog to the database
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  app.get('/all-blogs', (req, res) => {
    Blog.find()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  app.get('/single-blog', (req, res) => {
    Blog.findById('5ea99b49b8531f40c0fde689')
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  app.get('/', (req, res) => {
    res.redirect('/blogs');
  });
  
  app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
  });
  
  // blog routes
  app.get('/', (req, res) => {
    res.redirect('/blogs');
  });
  
  app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
  });
  
  // blog routes
  app.use('/blogs', blogRoutes);

  // 404 page
  app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });