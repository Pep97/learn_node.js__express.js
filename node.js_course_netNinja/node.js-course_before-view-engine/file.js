// this is the module for file system, it's built in node.js
const fs = require('fs');

// ------------------------------------------------------

// reading files

fs.readFile('./docs/blog.txt', (err, data) => { 
    // first argument is the path to the file, second argument is a function
    // this is an asynchronous function, so it will run in the background
  if (err) {
    console.log(err);
  }  
  // console.log(data); // this will print out the buffer
  // a buffer is a binary data, it's a way to represent data

  console.log(data.toString());
});

// console.log('last line');

// ------------------------------------------------------


// writing files

fs.writeFile('./docs/blog.txt', 'hello, world', () => { // add what you want to write here after the path
  console.log('file was written');
});

fs.writeFile('./docs/blog2.txt', 'hello, again', () => {
  console.log('file was written');
}); // if the file doesn't exist, it will create it

// ------------------------------------------------------


// directories

// mkdir -> this is to make a directory
// rmdir -> this is to remove a directory
// existsSync -> this is to check if a directory exists, and it's synchronous.

if (!fs.existsSync('./assets')) {
  fs.mkdir('./assets', err => {
    if (err) {
      console.log(err);
    }
    console.log('folder created');
  });
} else {
  fs.rmdir('./assets', err => {
    if (err) {
      console.log(err);
    }
    console.log('folder deleted');
  });
}

// ------------------------------------------------------

// deleting files

// unlink -> this is to delete a file

if (fs.existsSync('./docs/deleteme.txt')) {
  fs.unlink('./docs/deleteme.txt', err => {
    if (err) {
      console.log(err);
    }
    console.log('file deleted');
  });
}