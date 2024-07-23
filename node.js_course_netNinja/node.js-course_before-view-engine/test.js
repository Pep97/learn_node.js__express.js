const name = 'mario';

console.log(name);

// if you open the terminal and run the command `node index.js` you will see the output `mario` in the terminal.
// node is a runtime environment for executing JavaScript code outside of a browser. It is a cross-platform runtime environment and library for running JavaScript applications which is used to execute JavaScript code server-side.
// index is the name of the file and js is the extension of the file. you don't need to specify ".js"

const greet = (name) => {
  console.log(`hello, ${name}`);
}

greet('mario');
greet('yoshi');