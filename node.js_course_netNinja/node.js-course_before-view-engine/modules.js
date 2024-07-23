// const people = require('./people'); 
// in this way you're importing people.js in modules.js

// console.log(people);

// however just because you're importing people.js in modules.js
// doesn't mean that you're importing the people array, you can only run them inside people.js
// to import the property you have to use module.exports in people.js



// const data = require('./people'); // here you're importing the properties of people.js
// in this case you don't have to use the original name of the file for the variable
// in this case you're calling "data", it could be anything you want

// console.log(data.people, data.ages); // you can select specific properties



// this is a deconstruction
const { people, ages } = require('./people');
// in this case you have to use the original name of the property you're importing.

console.log(people, ages);

// node js has already some built in modules to add functionality to your app
// os stands for operating system
// this is already built in node.js, and it an object that gives you a lot of information about the operating system

const os = require('os');

console.log(os.platform(), os.homedir());



