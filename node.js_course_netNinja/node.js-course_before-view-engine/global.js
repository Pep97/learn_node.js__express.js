const speak = () => {
    console.log('hello, ninjas');
  }
  
  speak();
  
  // Global Object


  
//   console.log(global); // you'll see a lot of properties and methods that are available globally in node.js
  
  global.setTimeout(() => {
    console.log('in the timeout, with .global');
  }, 3000);
  
  setTimeout(() => {
    console.log('in the timeout, without .global');
    clearInterval(int); // with clearInterval you will stop the setInterval
  }, 4000); // like with window.setTimeout, you can use setTimeout without global

  // setTimeout will run ONLY once, setInterval will run EVERY x milliseconds
  
  const int = setInterval(() => {
    console.log('in the interval');
  }, 1000);

  // with ctrl + c you can stop the interval with the previous clearInterval
  
  console.log(__dirname); // this gets the absolute path of the current directory (the folder where the file is located)
  // this is the result -> C:\Users\Dell\Desktop\tutorial programming\node.js-course

  console.log(__filename); // this gets the absolute path of the current file with the file name
  // this is the result -> C:\Users\Dell\Desktop\tutorial programming\node.js-course\global.js

  // no access to DOM methods

  // console.log(document.querySelector);

  // you will get an error because document is not defined on the global object
  // of course you won't need to use DOM methods in node.js because it's not a browser environment