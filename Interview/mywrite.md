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
   
   37.localStorage、sessionStorage、cookie、session的区别
   
   38.localStorage存满了怎么处理？
   
   39.cookie的增删改查
   
   40.get和post的区别？
   
   41.http的缓存？
   
   42.tcp和udp的区别
   
   43.浏览器输入网址 按下回车后的流程？
   
   44.滑动窗口和拥塞窗口有什么区别？
   45.什么是cdn？
   46.XSS和CSRF？
   47.OWASP top10 （10大安全漏洞）？
   
   48.回流和重绘
   
   49.事件冒泡和事件捕获有什么区别？
   50.防抖和节流 手写一个？
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
