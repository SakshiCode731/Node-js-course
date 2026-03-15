// import { a, b } from './mymodule.js';
// console.log(a, b);

// import sakshi from './mymodule.js';
// console.log(sakshi);

// (function(exports, require, module, __filename, __dirname) {
//     // module code goes here
// }); // raaped here so require and module are available here
const a = require('./mymodule2.js');
console.log(a, __dirname, __filename);