let count = 0
const increment = () => count++
const getCount = () => console.log(count);

// module.exports = {
//     increment,
//     getCount
// }

//another 导出方法
exports.increment = increment
exports.getCount = getCount