1.JavaScript中什么是基本数据类型？什么是引用数据类型？以及各个数据类型是如何存储的？
 基本类型：undefined、null、string、number、boolean、bigInt、symbol；
 引用类型：object：
    细分包含：Array，function，date、**RegExp**，
    基本数据类型在栈中存储，引用数据类型在堆中存储，栈中会保存他们的引用地址，
 
 2.在JS中为什么0.2+0.1>0.3?
  0.2和0.1在运算的时候会被转换成二进制，0.2转换时会转成无限循环的一个二进制（ 转换方法小数部分取0，小数后面的一次跟2相乘，取整数部分，小数继续乘*2）小数最多保留52位，二进制计算时结果会有重叠部分。
  注意：整数转二进制方法：整数除2，记录余数，用商继续除2，继续保留余数，直到商为0， 是倒序拿到余数列表就是二进制的数据。
  注意：此类题 主要从两方面回答，最长52位小数，小数转换二进制
  
 3.判断数据类型有几种方法？
    1.typeof    无法区分object、null，跟存储的二进制码有关，二进制前三位是000的话会被判断成object，null的二进制全是0，
    2.constructor 主要是通过构造函数来判断，作用有限
    3.instanceof  通过原型链来判断，又是原型链会被重新指向的话，导致判断不准
    4.Object.prototype.toString.call(xx)
    
 4.==和===有什么区别？
   === 绝对等，是类型和数值一样才能等
   == 值等，两个数被转成同一个类型，再比较是否相等，null和undefined是相等的，==比较一般是将前面的数据转成后面数据的类型 再进行比较
   
 **5.手写call、apply、bind**
     Function.prototype._call = function (obj,...args){
         obj = obj ? Object(obj):window; 
         obj.fn = this;
         let result = obj.fn(...args);
         delete obj.fn
         return result
     }
     Function.prototype._apply = function (obj,args){
         obj = obj ? Object(obj):window;
         obj.fn = this;
         let result = obj.fn(...args);
         delete obj.fn
         return result
     }
     Function.prototype._bind= function(obj,...args){
         var _this = this;
         return function result(...arg){
             if(this instanceof result){
                 return _this.apply(this,[...args,...arg])
             }
             return _this.apply(obj,[...args,...arg])
         }
     }
     
 6.字面量创建对象和new创建对象有什么区别，new内部都实现了什么，手写一个new；
    比较：字面量创建的对象 更高效 更利于阅读，
    function _New(fn,...args){
        let target = Object.create(fn.prototype);
        fn.apply(target,args)
        return target
    }
    
  7.Object.create(null)创建出来的对象 和普通对象有什么区别
   前者没有原型链，不能使用Object.prototype上的方法。
   
  8.什么是作用域，什么是作用域链？
   规定函数或者变量的可使用范围成为作用域，一般分为全局和私有作用域。
   每当函数创建时，就会生成一个[[scopes]]对象，对象中记录了当前函数的作用域，多个内部函数创建就会形成一条作用域链,依次从当前私有作用域->外部作用域->...->全局作用域查找。
   
  9.什么是执行栈，什么是执行上下文？
    执行上下文是当前js代码被解析和执行时所在环境的抽象概念。
    执行栈，也叫调用栈，用于存储在代码执行期间创建的所有执行上下文。有先进后出的特性，首次运行js时，会将全局执行上下文压入栈底，当有函数执行时，会创建新的执行上下文压入栈顶。函数执行完毕后，会被弹出。
    
  10.什么是闭包？闭包的作用？闭包的应用？
  当有函数嵌套式，内部的私有变量和方法是不能被外部访问的，这样就形成了一个闭包。
  作用：保护内部变量不受污染，和防止销毁，防止命名冲突。
  应用：1.防抖和节流 2.for循环中保留i的值，3.单例设计模式中
  
  11.什么是原型？什么是原型链？如何理解
     每一个函数再创建时都会生成一个prototype（原型对象），中包含constructor:fn 和   __proto__:Object,原型链指向function;当对象被创建时，会生成一个__proto__ 指向这个构造函数的prototype。多个__proto__就会形成作用域链。每当查找属性和方法时，都会先在自身查找，如果没有的话会沿着__proto__ 一直向上查找，直到原型链为null；
     
  12.JS 中的常用的继承方式有哪些？以及各个继承方式的优缺点
    1）1.原型链继承。优点：简单易操作，让父类在子类的原型链上。 缺点：无法传参数 ；会将父类的公、私有属性，都变成子组建的公共属性；子类能够重置父类的方法，导致其他的继承也受影响
          var Aa = function (){
              this.name = '张三'
          }
          let Bb = function (){}
          Bb.prototype = new Aa();
          Bb.prototype.constructor = Bb;
          console.dir(new Bb().name)
    2）2.call继承。优点：能传参，父类私有属性变成子类私有属性。缺点：无法继承父类的公共属性。
           function Cc() {
               this.name ='cc'
           }
           Cc.prototype.say = function(){
               console.log(this.cc)
           }
           function Dd (){
               Cc.call(this)
               this.age = 1
           }
           Dd.prototype.say1 = function(){
               console.log(this.age)
           }
           let dd = new Dd();
           console.log(dd)
    3）3.混合继承。优点：能传参，父类的私有、公有属性分别变成了子类的私有公有属性。缺点：写的多
            function Ee(){
                Cc.call(this)
                this.age =100
            }
            Ee.prototype = Object.create(Cc.prototype);
            Ee.prototype.say1 = function(){
                console.log(this.age)
            }
            let ff = new Ee();
            Cc.prototype.kk = 111
            console.log(ff)
    4）4. extends继承。es6提供的方法好用
        class A{
            constructor(x){
                this.x=x
            }
            getX(){
                console.log(this.x)
            }
        }
        class B extends A{
            constructor(y){
                super('1');
                this.y=y
            }
            getY(){
                console.log(this.y)
            }
        }
        console.log(new B())
    扩展：1） Object.create()的简单实现：
        Object.prototype._create = function (fn,obj){
            var myfn = function (){}
            myfn.prototype = fn
            let result = new myfn();
            if(obj){
                console.log(obj)
                for(let key in obj){
                    if(obj.hasOwnProperty(key)){
                        result[key] = obj[key].value
                    }
                }
            }
            return result
        }
        console.log(Object._create(Aa,obj))
        console.log(Object.create(Aa,obj))
        2）new的简单实现
        function CreateNew(fn,...args) {
            let obj ={}
            obj.__proto__ = fn.prototype;
            fn.call(obj,...args)
            return obj
        }
        console.log(CreateNew(Aa,'老王'))
        console.log(new Aa('老王1'))
        
  13.什么是内存泄漏？
    当内存不在被使用时，没有被成功释放出来，会导致程序卡顿或者崩溃的现象叫做内存泄露
    
  14.为什么会导致的内存泄漏？
     创建的一些对象，已经不用了，但是垃圾回收机制则认为改对象还在引用，没有被回收。积少成多，最终会导致内存泄露。
     一般情况下如下情况会导致内存泄露：闭包、被遗忘的定时器或者回调函数、脱离dom的引用（当dom被移出时，其他对象引用了这个dom对象）、不经意间创建的全局变量
     
  15. 垃圾回收机制都有哪些策略？
     1.标记清除法：在函数执行时，会将变量标记为'进入环境'，进入环境的变量时不会被删除的，当函数执行完后，会将内部的变量标记为'离开环境'，此时垃圾回收机制会剔除一些环境中的变量和闭包使用的变量，将其他外部不能访问的变量标记，定时清除。
     2.引用清除法：ie低版本中使用的， 每当一个变量被其他变量引用时，这个变量的引用计数器会+1，当他被放弃引用时，引用计数器会-1，当引用计数器值为0时，说明没有变量访问他了，就会被垃圾回收机制回收。弊端：当两个变量互相引用的时候，这两个变量都不能被回收。
     
  16.手写浅拷贝深拷贝
    浅copy：Object.assign({},obj) 或者 {...obj} 
    深copy：常用：JSON.parse(JSON.stringify(obj)); //如果没有特殊的例如date可以满足使用需求
    function deepClone(obj){
        if(typeof obj === null || typeof obj !=="object"){
            return obj
        }
        let _o = new obj.constructor();
        for(var key in obj){
            if(typeof obj[key] === null || typeof obj[key] !=="object"){
                _o[key] = obj[key]
            }else{
                _o[key] = deepClone(obj[key])
            }
        }
        return _o
    }
    
  17.js复制一个函数 和 Date,正则，
    function fn(){console.log(123)}
    new Function('return '+fn.toString())();
    let date = new Date(348383244);
    console.log(new Date(date))
    
    _~~了解~~_
    function cloneRegExp(regexp){
        var result = new regexp.constructor(regex.source,/\w*$/.exec(regexp))
        result.lastIndex = regexp.lastIndex
        return result
    }

  18.js为什么是单线程？
   js能操作dom，如果是多线程话，可能同时会有多个对dom的操作，会造成无法调度的问题
   
  19.js如何实现异步编程
   放在任务微任务或者宏任务中，或者回调函数中
   
  20.Generator是怎么样使用的以及各个阶段的变化如何？
     1.生成器函数，声明是有*，内部使用yield 来暂停代码的执行。
     2.调用函数生成一个控制器，
     3.通过next()来控制代码的进行，当代码没有执行完时，会返回一个对象，{done:false,value:..},value为yield 后面代码的返回值，当代吗执行完毕时，返回{done：true，value:undefined}
     4.当next() 有参数时，参数会被赋值给 yield 的返回值，默认yield是没有返回值的
     
  **21.说说 Promise 的原理？你是如何理解 Promise 的？ 写简易版的promise和all**  
  
  22.宏任务和微任务都有哪些？
   微任务：Promise.then,mutationObserve,process.nextTick (nodejs中使用);
   宏任务：dom渲染，事件，setTimeout,setInterval,setImmediate
   
  23.js的事件循环
  浏览器的事件循环：
    js在执行时，当所有的代码都是同步任务的话会一直进行下去，当遇到异步任务时会进入到任务队列中，任务队列包含微任务队列和宏任务队列，继续同步代码执行，当全部同步代码执行完毕后，会优先执行微任务，轮询微任务，知道全部执行完毕清空，再去依次执行宏任务，直到所有任务执行完毕。
  nodejs的事件循环：nodejs在主线程中维护了一个事件队列，每当有请求时，会优先将此请求当做一个事件放入事件队列中，当没有请求了、主线程空闲时，就会循环事件列表，对事件依次执行：对非I/O操作则自己运行，通过回调函数返回给上层调用，对于I/O 操作则会从 线程池 中取一个执行，并制定回调函数，继续其他事件，如果此I/O 执行完毕后，会将回调函数加入到任务队列的尾部，等待事件循环调用。
  24.变量和函数怎么进行提升的？优先级是怎么样的？
  js在运行代码时 会对代码进行预解析，当有使用函数声明的函数时，会创建一个堆内存，创建一个函数内容,将堆内存赋值给函数名。
  变量的提升会创建一个变量 = undefined,待运行到赋值时才会赋值。
  函数声明的位置，并不影响函数的执行。
  25.var let const 有什么区别？
    1）var 会变量提升，声明的变量会被挂载在window下，没有声明的变量赋值时，默认挂载到window上，可重复声明
    2）let 声明的变量 只针对块作用域有效，无变量提升，只能先声明后使用，不可重复声明
    3）const 声明静态变量，声明的基本数据类型 不能修改内容，复杂类型可以修改内容
  26.箭头函数和普通函数的区别？箭头函数可以当做构造函数 new 吗？
    箭头函数没有自己的this，它的this指向创建时的环境的this，也没有arguments，也不会变量提升
    不能使用new没有this，不能调用call和apply方法
  27.说说你对代理的理解
   1）js的proxy 代理  
        new proxy(obj,{
            get(target,attr){
                return target[attr]
            },
            set(target,attr,value){
                target[attr] = value
            }
        })
   2) class 的代理
       class Bb{
           constructor(){
               this.age = '122'
           }
           get ages(){
               return this.age
           }
           set ages(value){
               this.age = value
           }
       }
       var bb = new Bb();
       bb.ages = 1 ;
       console.log(bb)
   3)事件代理：将子元素的事件代理到父级上，
   4）webpack中跨域代理：
      devServer:{
        proxy:{
            '/api':{
                target:'http://localhost:3000', // /api要替换的内容
                pathRewrite:{'^/api':''},       //请求中的 /api被替换成了''
                changeOrigin:true,              //允许跨域
                secure:true,                    //https 这里设置为true
            }
        }
      
   }
   代理的应用：1.vue使用代理对数据进行拦截，2.可以对数据拦截进行值的效验
   
  28.为什么要使用模块化？都有哪几种方式可以实现模块化，各有什么特点？  
   模块开发主要是把功能分块开发，便于代码的复用，便于代码的维护管理，便于团队的开发。例如：将首页分成轮播模块，导航模块、列表模块，其他地方使用直接调用即可。
    1）CommonJS，主要在node中使用：
      aa.js : module.exports ={a:1,b:function(){}}   或者 exports.a =1 
      使用 : let mm = require('./aa.js)   
    2）ES6 Module 
      aa.js : export default {a:1,b:function(){}}
      使用： import aa from 'aa.js' 
    不同点：require 是在程序运行时才会同步执行;import是在程序编译阶段就会运行;import是简单的只读引用，不能对值进行改变;node不支持import，commonjs中this指向当前模块，而 ES6中的import中this是undefined
   29.JS模块包装格式有哪些？
   
   30.常用的算法：
    1).冒泡排序
      for (var i=0;i<arr.length;i++){    
          for(var j = 0;j<arr.length-i;j++){
              if(arr[j]>arr[j+1]){
                  let temp = arr[j]
                  arr[j] = arr[j+1]
                  arr[j+1] = temp
              }
          }
      }
    2)快速排序
    function quick(arr){
        if(arr.length<=1){
            return arr
        }
        let middleDate = arr[parseInt((arr.length-1)/2)]
        let left=[]
        let right =[]
        arr.map(item=>{
            item <middleDate ?
                left.push(item) :
                right.push(item)
        })
        return quick(left).concat([middleDate],quick(right))
    }
    3）插入排序
     function insertSort(arr){
         var newArr= [arr[0]];
         for(var i = 1;i<arr.length;i++){
             let j = i;
             if(arr[i]<=newArr[0]){
                 newArr.unshift(arr[i])
             }else{
                 while(j){
                     if(arr[i]>newArr[j-1]){
                         newArr.splice(j,0,arr[i])
                         break;
                     }
                     j--;
                 }
             }
         }
         return newArr
     }
     4）使用sort
     arr.sort((a,b)=>a-b)
     5)去重1
     function del(arr){
         for(var i=0;i<arr.length;i++){
             var  j = i;
             while(--j>=0){
                 if(arr[j] === arr[i]){
                     arr.splice(i,1)
                     i--;
                     break;
                 }
             }
         }
         return arr
     }
     6) 去重2
         function del2(arr){
             var newArr =[];
             arr.reduce((total,item,index,arrs)=>{
                 if(!total.includes(item)){
                     total.push(item)
                 }
                 return total
             },newArr)
             return newArr
         }
     7）去重3 map
         function del3(arr){
             var map=new Map();
             arr.map((item)=>{
                 if(!map.has(item)){
                     map.set(item,true)
                 }
             })
             return Array.from(map.keys())
         }
     8）去重4 Set
        let set = new Set(arr)
        console.log(Array.from(set))
     9)斐波那契数列
          function fobList(num){
              if(num<=0){
                  throw new Error('num must > 0')
              }
              if(num == 1){
                  return [1]
              }
              var arr = [1,1]
              if(num == 2){
                  return arr
              }
              for(let i=2;i<num;i++){
                  arr.push(arr[i-2]+arr[i-1])
              }
              return arr
          }
          function fb(num){
              if(num<=2){
                  return 1
              }
              let a=1;
              let b =1;
              let c = 0;
              for(let i=3;i<=num;i++){
                  c = a+b;
                  a=b;
                  b=c;
              }
              return b
          }
     10).判断回文 
          function huiwen(str){
              return str === str.split('').reverse().join('')   //split 默认不分割，join默认是以 ','分割
          }   

   31.跨域
      1）jsonp
      2）工程化使用proxy
      3）CORS 跨域资源共享  res.header('Access-Control-Allow-Origin',*)
      4）nginx反向代理
      5）websocket
      6）postMessage  
         步骤:1. A.html中    
         <iframe id='iframe' src='B.html'>
         iframe.onload = function(){
            // iframe.contentWindow   获取到iframe的window对象
             iframe.contentWindow.postMessage('aaa', 'http://127.0.0.1:1002/')//第一个参数是信息，第二个参数是源，不知道请写*
         }
            2. B.html  接收信息
            window.onmessage = function(ev){
                console.log(ev.data,ev.origin)  //获取数据和来源
                ev.source.postMessage('我是返回的数据')
            }
      7）document.domain + iframe   针对主域名相同，子域名不同 eg：aa.qq.com和bb.qq.com
          步骤：1.A.html中
                <iframe id='iframe' src='B.html'>
                document.domain = 'qq.com'
                var user = '我是数据'
               2.B.html中
               document.domain = 'qq.com'
               console.log(window.parent.user)
      8）window.name + iframe  （需要三个页面）原理：a和c同一个域名，b一般在服务器存着，b中含有我们想要的数据。a中通过iframe加载b，b中有window.name='xx',如果iframe的name没有被修改过，c是能够访问到iframe的name的
           步骤 1. A.html
                  <iframe id='iframe' src='B.html'>
                  iframe.onload = function(){
                      iframe.src = 'c.html';
                      console.log(iframe.contentWindow.name)
                  }
                2.B.html
                  window.name = 'A想要的data'
                3.C.html
                  一般是空的html    
       9)location.hash + iframe  （需要三个页面） 原理:a和c同源，b是其他服务器上存着，a通过hash把值传给链接b，b经过加工生成数据，b中iframe指向c，c中可以通过window.parent.parent 获取到a.html的window对象，即可将数据传给a
       
   32.http的结构？ http头都有哪些字段
     结构：请求行、请求头、空行、请求体
     请求行： eg：POST /chapter17/user.html HTTP/1.1
     请求头: eg:
        Accept(接受):image/jpeg,application/x-ms-application,...
        Referer（引用：地址从哪个页面发过来的）：http：//localhost:8000/xx.xx
        Content-Type（内容类型）: application/x-www-form-urlencoded
        Host(地址): localHost：8000
        User-Agent（设备信息）：Mozilla/4.0(Windows NT 6.1)
        Connection(长连接):Keep-Alive
        Cache-Control(缓存控制):no-cache
        Cookie:xxx=xxxx
        Accept-Language(接受语言):zh-CN 
    请求体：eg：name=张三&age=15      
   
   33.网络OSI七层模型？TCP在那一层？
     1.物理层  ->定义设备的标准，eg:网线（光纤)接口类型，主要用来传递比特流 (光纤、网线、协调器)
     2.数据链路层 ->对数据格式化用来传输，也支持数据错误检测 （WiFi、中继器）
     3.网络层 ->数据传输包含路由寻址（IP）
     4.传输层 ->定义了端到端的链接（tcp、udp）
     5.会话层 ->应用程序之间的会话 （SMTP、DNS）
     6.表示层 ->封装和解封装数据，加密格式化传输（TeInet、SNMP）
     7.应用层 ->为应用程序提供服务(eg :电子邮件、文件传输)提供网络服务
   
   34.常用的状态码？
      2xx:成功
          200：Ok   成功和强缓存都会返回200
          202：接收了请求，但是还没有处理
          204：No Content 返回没有实体的主体
      3xx: 重定向
        301: 永久重定向
        302：临时重定向
        304：弱缓存会返回
      4xx：客户端错误
        400：报文中存在语法错误
        403：服务器拒绝访问   
        404：资源不存在
      5xx：服务器错误
        500：服务器内部错误
        503：服务器过载或者维护无法解决当前的请求
   35.http1.0 和http1.1、 http2.0有什么区别？
      http1.0 :
        是一种无状态、无连接的应用层协议；（无连接是因为每次浏览器和服务器都会通过tcp建立连接，服务器处理完后立即断开TCP连接；无状态是因为服务器不跟踪每个客户端过去的请求）
        缺点：1.无法复用链接，每次都需要建立Tcp连接
            2.队头阻塞，http1.0规定下一个请求必须在前一个请求响应到达之前法能发送。前一个不响应后面的就无法响应
     http1.1 ：
        继承了http1.0的特点，克服了一些性能上的特点
        1.增加了长链接 ：Connection：keep-Alive，避免每次都需要建立TCP连接
        2.请求管道化（理论上），大部分都是支持多个TCP同时连接
        3.添加了缓存处理：cache-control：no-cache
        4.增加了Host字段，支持断点传输
     http2.0：
        1.二进制分帧；通过在应用层和传输层之间增加一个二进制分帧层，突破了http1.1的性能限制、进行传输性能。二进制解析更高效，错误更少
        2.多路复用  一旦tcp的connection建立，后续请求以srream肥肉方式发送，每个stream的基本单位是frame（二进制帧）客户端和服务器可以把http消息分解成互不依赖的帧，然后乱序发出，在另一端重新组合起来。
        3.头部压缩  http1.1中的header中带有大量信息，而且每次都要重复发送。http2中为了减少这部分的开销，给头部信息进行了压缩
        4.服务器推送  浏览器与服务器建立连接后，服务器主动将一些资源推送给浏览器并缓存起来。eg：当访问index.html时，主动将index.css推送过来并缓存，index.html在解析时就调用缓存中的css文件即可。
   36.http和https的区别，https的原理
      http是一种超文本传输协议，创立初期主要是为了提供和发布一种html的方法。http是以明文发送数据信息，易被黑客截取。常用端口是80
      https:是以http为基础，引入ssl证书对传输书记进行加解密。ssl证书一般需要购买，常用端口443。
      https过程：1.客户端请求（携带客户端的ssl协议版本号，加密算法种类，以及随机数）
                2.服务器端返回证书信息、版本号、加密算法种类，随机数->
                3.客户端（验证证书后）根据证书信息与服务器协商加密等级->
                4.客户端建立会话密钥，利用2传过来的公钥对密钥加密发送服务端->
                5.服务器通过私钥解密会话密钥->
                6.服务器利用解密得到的会话密钥对数据进行加密返回客户端。
   37.localStorage、sessionStorage、cookie、session的区别
    localStoragese：本地长期存储，只要不删除，就会一直保存下去，一般大小为5M
    sessionStorage：本地存储，当浏览器关闭时会删除
    cookie：客户端存储，引入的原因是http是无状态的，并不知道当前是哪个用户在操作，服务端可以通过HTTP
    的头信息set Cookie来存储cookie信息，客户端也可以通过js来设置cookie，过期会被删除。单个cookie<=4kB,一般能存20条左右，只存储字符串。
    session：存储在服务端中，需要配合cookie使用，需要使用sessionId来识别用户。
   38.localStorage存满了怎么处理？
    1.降级使用sessionStorage
    2.使用indexedDB(本地数据库，引入localforage.js操作) 特点：键值对存储，一般能存储250M，遵循同源策略 
   39.cookie的增删改查
        增：
           var exdate=newDate();
           exdate.setHours(exdate.getHours()+72)
           document.cookie = 'name=value;expires='+exdate.toGMTString()+';path=/;'
        改：同增换个value即可
        删除：过期时间设置为当前时间-1即可
        查：1.function getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
              return (arr[2]);
            else
              return null;
          }
          2.function getCookie(c_name){
            if (document.cookie.length>0)
              {c_start=document.cookie.indexOf(c_name + "=")
              if (c_start!=-1){ 
                c_start=c_start + c_name.length+1 
                c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                    return unescape(document.cookie.substring(c_start,c_end))
                } 
              }
              return ""
            }
   40.get和post的区别？
        核心区别：
              GET 表示从服务端获取数据，具有幂等性，无论请求多少次，每次获得的结果都一样，不会对服务端数据产生任何影响。
              POST 表示向服务端提交数据，非幂等，会对服务端数据产生影响。
        主要区别:get的参数是通过拼写在url中发送给后端，而post是放在request.body中
        其他区别：1) get主要用于获取数据，post主要用于提交数据
                2) get会被浏览器主动缓存，post不会
                3) get会将参数暴露在url上不是很安全，post则不会。
                4) 文件类上传必须使用post，get无法实现。
                5) get中的url长度会被浏览器或者服务器限制。
   41.http的缓存？
        web缓存主要包含：数据库缓存、服务器缓存（代理服务器缓存、CDN缓存）、浏览器缓存
        浏览器缓存包括：http缓存、indexDB、cookie、localstorage等
        网页不使用缓存的方法：
          <meta HTTP-EQUIV="Pragma" CONTENT="no-store" />   表示网页不缓存
        强缓存：
            特点：1.不会向服务器发送请求，直接从本地获取数据 2.状态码200
            使用：1.Cache-Control：max-age=xxx(单位秒)；no-cache(使用缓存，但是需要请求服务器，对比是否为最新的缓存)，no-store（禁止缓存）
                 2.expires：（http1.0中优先级低）GMT格式的过期日期，
            为什么引入Cache-Control ？
               expires有弊端：缓存过期时间都是与客户端时间进行对比，当客户端时间有偏差时，会不准确。
        弱缓存:  
          特点：1.向服务器发送请求，服务器会根据请求头的资源判断是否命中协商缓存 2.返回304
          使用：1.Last-Modified/If-Modified-Since   最后修改时间，当与ETag同时使用 会优先Etag
               2.ETag/If-None-Match      通过每次变更都会形成一个唯一标识符，即时轻微的变化也会改变
          为什么引入ETag ？  
              1.Last-Modified 的响应式以秒计的，有些服务器并不能拿到精确的时间。
              2.当1秒内有多次改动时，是无法识别的    
              3.一些文件可能是定时生成的，但是内容没有改变，但是Last-Modified更新了，会导致缓存失效
   42.tcp和udp的区别
        tcp：
            优点：可靠、稳定、不易丢包（连接需要三次握手）
            缺点：连接慢、效率低、占用资源高（传输数据前必须先建立连接，头部开销20字节，每个tcp只能点对点）
            适用场景：电子邮件、网页、文件传输等
        udp ：
            优点：快、比tcp稍安全（没有tcp的握手环节，无状态的传输协议，没有tcp那些机制利用的漏洞就会少一点，头部开销只有8字节，可以一对一，也可以一对多）
            缺点：网络不好时易丢包
            使用场景：qq语音、视频会议、直播等
          
   43.浏览器输入网址 按下回车后的流程？
        www.baidu.com
      1.dns解析：（含cdn）
         过程：浏览器dns缓存->本地host->路由器缓存->本地dns服务器（运营商）->本地DNS向根域名.询问-> 顶级域名 (如：com、cn、net等）->权威域名（如：baidu）-> 主机名（www）->获取ip返回本地DNS->返回ip给浏览器
         cdn过程：如果有cdn的话，获取的不是ip而是CNAME域名，需要浏览器再次对该CNAME域名进行解析，此次将使用的全局负载均衡DNS解析（根据用户当前的IP地址和各个节点的状态返回最优的服务器地址），浏览器拿到ip地址后请求数据，如果当前服务器中没有缓存的内容，就会逐级向上层缓存服务器中拉取，如果都没有的话会去源服务器中拉取，然后缓存并返回给客户端。
      2.与服务器建立TCP连接，
        过程：3次握手进行连接(详见tcp的3次握手和4次挥手)
      3.浏览器向服务器请求首页（含重定向）
         有重定向：永久重定向返回301，临时重定向返回302，跳转一个新地址；
         无重定向：正常接收请求，处理请求。
      4.服务器处理请求返回首页内容（keepalive）
         keepalive：设置长连接后，服务器和客户端的会话不会在返回完index.html数据后立马中断，而是保持连接。而是等超过长连接的过期时间后才能断开。
         保持长连接的目的是：tcp的三次握手是很耗时的。
      5.浏览器解析首页加载资源并展示。
   44.滑动窗口和拥塞窗口有什么区别？
   45.什么是cdn？ 见43.dns解析cdn
   46.XSS和CSRF？
      xss：垮脚本攻击，自己的网站运行了别人的代码。
        1.反射型：浏览器发送一段带有攻击性的xss代码，服务器将其返回回来,xss攻击代码被浏览器解析;<img src='null' onerror='alert(document.cookies)'>
        2.存储型：（持久型xss） 将xss代码发送给服务器，通过服务器散播；eg:留言板
        3.DOM型： 通过都没来解析；个：div.innerHTML = `<a href=${txt.value} >你想去哪？</a>`，value的值是通过input传递过来的，那么input中输入 # onclick=alert(123) 就能打印出123
        危害：
         1.可造成网站内容不可控，
         2.获取用户的私密数据
         3.植入广告
         4.给别的网站引流
        防御：1.慎用innerHTML，转译一些字符 如：< > & 等
             2.过滤掉危险的属性节点，如：style，style，href
             3.也可以使用防第三方脚本库来对输入内容进行过滤
             4.对cookie设置httpOnly,会导致js无法操作，不太推荐。 
     CSRF：跨站请求伪造。原理：web的隐式身份认证不能保证是从该浏览器发的，不能保证是用户的真实操作。
        攻击步骤：1.用户访问网站A，并生成了cookie，网站A可以使用链接http:xxx.xom?money=100&to=zhangsan 来完成转账操作。
                2.此时用户没有退出网站A，点击了钓鱼网站B，B网站中使用<img src='http:xxx.xom?money=100&to=zhangsan'> 即可完成转账
        CSRF检测方法：
           1.使用抓包工具 去掉referer，观察是否能通过，如果能通过则有安全隐患
           2.使用专用测试工具
        防御办法：
           1. 服务端可以使用http请求中的Referer字段来识别信任的网址。
           2. tooken不保存在cookie中，而是遍历所有的a和form，给需要连接本网站的地址添加token。
           3.给http的头信息添加自定义属性，可以通过XMLHttpRequest一次性给加上一个token的头属性。（弊端：并非所有的请求都适合使用ajax来发送（比如打开一个新网页），这个类的请求得到的页面不能被浏览器记录。从而进行、后退刷新、收藏等操作，给用户带来不便。对于之前没有使用XMLHttpRequest 的类来说，几乎要重写整个网站。）
   47.OWASP top10 （10大安全漏洞）？
   
   48.回流和重绘
     回流：当浏览器渲染完毕后，对dom进行了操作，如果浏览器的流式结构发生了变化，会导致浏览器的重新渲染或者部分渲染的现象叫做回流
        特点：回流的性能开销更大
        可能会导致回流的操作：
          1.首次渲染
          2.浏览器窗口改变
          3.内容变化
          4.删除、添加节点
          5.激活css伪类
          6.获取元素之神属性值（clientWidth，offsettop，offsetLeft, ...）
     重绘：当页面中元素的样式改变不影响它在文档流中的位置，浏览器会将新样式赋值给元素，这个过程叫做重绘。
        重绘重排的最小单元是图层
        可能会导致重绘的操作：
          1.background
          2.visibility
          3.opacity
     优化：(补充)
        1）动画时尽量使用transform 代替left、top
        2)opacity 代替visibility  （直接使用opacity，会使用触发重绘和重排），需要配合will-change 不触发重排和重绘（以前不触发，现在会触发重绘）
        3)不是用table布局
        4)多次修改样式合并成一次  使用calss
        5)将dom离线后再修改：先将都dom隐藏，修改后在展示
        6)文档碎片 documentFragment
        7)尽量将获取 元素的style属性，各个值保存，不循环获取offsetTop，offsetWidth ...
         8)动画实现过程招聘哪个，启用硬件加速，transform:translateZ(0);
         9)为动画元素新建图层，提高动画的等级
         10)使用动画 questAnimationFrame；在浏览器下次绘制前执行回调
   49.事件冒泡和事件捕获有什么区别？
     事件冒泡：事件会从最内层的元素开始发生，一直向上传播，直到document对象
     事件捕获：与事件冒泡相反，事件会从最外层开始发生，直到最具体目标元素。
     addEventListener(event, function, useCapture)
     第一个参数是需要绑定的事件，第二个参数是触发事件后要执行的函数。而第三个参数默认值是false，表示在事件冒泡的阶段调用事件处理函数，如果参数为true，则表示在事件捕获阶段调用处理函数。
     事件代理机制：    
         ul.onclick=function(e){
            console.log(e.target)         //当前触发事件的元素
            console.log(e.currentTarget)  //当前绑定事件的元素
         }

   50.防抖和节流 手写一个？
      防抖：一个时间区间只允许一个通过，最新的执行。
      节流：一个时间区间只允许一个通过，执行原来的。
      function debounce(fn,delay){
         let timer=null;
         return function(){
            timer && clearTimeout(timer);
            timer = setTimeout(fn,delay)
         }
      }
      function throttle(fn,delay){
          let timer = null;
          return function (){
              if(timer) return
              timer = setTimeout(()=> {
                      fn();
                      timer=null;
              },delay)
          }
      }
      注意：timer = null 和clearTimeout(timer) 的区别：clearTimeout只是清除了定时器的执行，但是timer依然指向这个定时器，使用timer=null可以让定时器的内存释放。
   51.函数柯理化原理？
   52.requestAnimationFrame是什么？
   53.js常见的设计模式？
   54.js性能优化？
     

   vue3中的一些不同点
   1.不对外暴露vue了 而是暴露createApp、ref、reactive 等等一些方法
   2.使用了组合api setup中没有this，需要对外暴露数据
   3.template中的用法和原来一样。
   4.如果需要双向绑定 需要使用ref、reactive
   5.setup中使用store 需要引入该文件
   
   其他类别：
   1.前端大文件上传
    
   
