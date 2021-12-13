let name = '张三';
let age = 20;
function say(){
    console.log('我是say')
}
//console.log(module)   //node 中只提供了module
module.exports = {
    name:name,
    age:age,
    say:say
};
// exports.name = name;
// exports.age = age;
// exports.say = say;




// Module ：{
//     id: '/Users/duxiaobin/Desktop/前端/webStudy/javascript/面向对象和this/js/common/moduleA.js',
//         path: '/Users/duxiaobin/Desktop/前端/webStudy/javascript/面向对象和this/js/common',
//         exports: {},
//     parent: Module {
//         id: '.',
//             path: '/Users/duxiaobin/Desktop/前端/webStudy/javascript/面向对象和this/js/common',
//             exports: {},
//         parent: null,
//             filename: '/Users/duxiaobin/Desktop/前端/webStudy/javascript/面向对象和this/js/common/moduleB.js',
//             loaded: false,
//             children: [ [Circular *1] ],
//             paths: [
//             '/Users/duxiaobin/Desktop/前端/webStudy/javascript/面向对象和this/js/common/node_modules',
//             '/Users/duxiaobin/Desktop/前端/webStudy/javascript/面向对象和this/js/node_modules',
//             '/Users/duxiaobin/Desktop/前端/webStudy/javascript/面向对象和this/node_modules',
//             '/Users/duxiaobin/Desktop/前端/webStudy/javascript/node_modules',
//             '/Users/duxiaobin/Desktop/前端/webStudy/node_modules',
//             '/Users/duxiaobin/Desktop/前端/node_modules',
//             '/Users/duxiaobin/Desktop/node_modules',
//             '/Users/duxiaobin/node_modules',
//             '/Users/node_modules',
//             '/node_modules'
//         ]
//     },
//     filename: '/Users/duxiaobin/Desktop/前端/webStudy/javascript/面向对象和this/js/common/moduleA.js',
//         loaded: false,
//         children: [],
//         paths: [
//         '/Users/duxiaobin/Desktop/前端/webStudy/javascript/面向对象和this/js/common/node_modules',
//         '/Users/duxiaobin/Desktop/前端/webStudy/javascript/面向对象和this/js/node_modules',
//         '/Users/duxiaobin/Desktop/前端/webStudy/javascript/面向对象和this/node_modules',
//         '/Users/duxiaobin/Desktop/前端/webStudy/javascript/node_modules',
//         '/Users/duxiaobin/Desktop/前端/webStudy/node_modules',
//         '/Users/duxiaobin/Desktop/前端/node_modules',
//         '/Users/duxiaobin/Desktop/node_modules',
//         '/Users/duxiaobin/node_modules',
//         '/Users/node_modules',
//         '/node_modules'
//     ]
// }
