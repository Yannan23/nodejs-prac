console.log("hello node");

// const module = {};

// (function (module) {
//     let a = 1;
//     const increment = () => a++;
//     const getCount = () => a;
//     module.increment = increment;
//     module.getCount = getCount;
// })(module)

// module.increment();
// module.increment();

// console.log(module.getCount());

const { increment, getCount } = require('./counter')

increment();
console.log(getCount());
