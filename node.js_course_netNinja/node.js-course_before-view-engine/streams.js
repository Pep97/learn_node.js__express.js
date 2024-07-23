// check streams & buffers on the Notion page

const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8'});
// this { encoding: 'utf8'} will convert the buffer to a string.
// or you can use .toString()after the chunk is uploaded through the function.
const writeStream = fs.createWriteStream('./docs/blog4.txt');


// this is an event listener
// every time you get a new chunk of data, it will run the function and get access to the chunk of data.
readStream.on('data', chunk => {
  // console.log('---- NEW CHUNK ----');
  // console.log(chunk);
  // console.log(chunk.toString());

  writeStream.write('\nNEW CHUNK:\n'); // this will add a new line and write 'NEW CHUNK:' to the file
  writeStream.write(chunk); 
  // basically you're moving the chunk from the readStream to the writeStream
  // which means from the blog3.txt to the blog4.txt
});

// ------------------------------------------------------

// piping

readStream.pipe(writeStream); 

// this is the same as the code above, but it's a built-in method