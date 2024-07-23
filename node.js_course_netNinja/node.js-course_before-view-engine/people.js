const people = ['yoshi', 'ryu', 'chun-li', 'mario'];
const ages = [20, 25, 30, 35];

// console.log(people);

// module.exports = people;
// in this way you're exporting the property of people.js


// in this you're exporting multiple properties
module.exports = {
  people,
  ages,
}