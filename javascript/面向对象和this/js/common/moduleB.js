const {name,say} = require('./moduleA');
let nickName = name;
console.log(nickName,say)
module.exports.nickName = nickName;
module.exports.say = say;

