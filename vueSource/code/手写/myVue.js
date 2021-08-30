function myVue(options) {
    if (typeof options === 'object' && options !== 'null') {
        options.data = options.data();
        this.$el = options.el
        this.$options = options;
        this.$data = options.data;
        this.$options.$this = this;
        observe(this.$data)
        this.init();
        this.proxyData(this.$data)
    } else {
        alert('myVue的参数必须是：object')
    }
}

myVue.prototype.proxyData = function (data) {
    for (const key in data) {
        Object.defineProperty(this, key, {
            get: function () {
                return data[key]
            },
            set(newValue) {
                data[key] = newValue
            }
        })
    }
}
myVue.prototype.init = function () {
    var dom = create_dom(document.querySelector(this.$el), this.$options);
    document.querySelector(this.$el).appendChild(dom)

    function create_dom(node, options, flag) {
        var flag = flag || document.createDocumentFragment();
        var child;
        while (child = node.firstChild) {
            compile(child, options);
            if (child.firstChild) {
                child.appendChild(create_dom(child, options))
            }
            flag.appendChild(child)
        }
        return flag
    }
}

function compile(node, options) {
    var reg = /\{\{(.*)\}\}/g;
    if (node.nodeType == 1) {
        var attrs = node.attributes;
        for (var i = 0; i < attrs.length; i++) {
            var item = attrs[i];
            if (attrs[i].nodeName.indexOf('v-') != -1) {
                var [, dd] = item.nodeName.split('-');
                var [attrName, attrEvent] = dd.split(':')
                attr_util(node, options, attrName, attrEvent, item.nodeValue)
                node.removeAttribute(item.nodeName);
                i--;
            } else if (attrs[i].nodeName.indexOf(':') != -1) {
                var [, attrEvent] = item.nodeName.split(':')
                attr_util(node, options, "bind", attrEvent, item.nodeValue)
                node.removeAttribute(item.nodeName)
                i--;
            } else if (attrs[i].nodeName.indexOf('@') != -1) {
                var [, attrEvent] = item.nodeName.split('@')
                attr_util(node, options, 'on', attrEvent, item.nodeValue)
                node.removeAttribute(item.nodeName)
                i--;
            }
        }
    } else if (node.nodeType == 3) {
        if (reg.test(node.nodeValue)) {
            var $1 = RegExp.$1;
            var value = $1.trim();
            attr_util(node, options, 'text', '', value)
        }

    }
}

function attr_util(node, options, attrName, attrEvent, attrValue) {
    const {methods, data} = options;
    if (attrName === 'model') {
        new Watcher(node, data, attrValue, function () {
            node.value = data_util(data, attrValue)
        });
        node.addEventListener('input', function (e) {
            set_data_util(data, attrValue, e.target.value)
        })
        node.value = data_util(data, attrValue);
    }
    if (attrName === 'html') {
        new Watcher(node, data, attrValue, function (attrValue) {
            node.innerHTML = data_util(data, attrValue)
        });
        node.innerHTML = data_util(data, attrValue)
    }
    if (attrName === 'text') {
        new Watcher(node, data, attrValue, function (attrValue) {
            node.nodeValue = data_util(data, attrValue);
        });
        node.nodeValue = data_util(data, attrValue);
    }
    if (attrName === 'on') {
        // console.log(options.$this);
        node.addEventListener(attrEvent, methods[attrValue].bind(options.$this), false)
    }
    if (attrName === 'bind') {
        var arrs = attrValue.substring(1, attrValue.length - 1).split(',')
        arrs.map((item, index) => {
            const [style, value] = item.split(":")
            node.style[style] = data_util(data, value);
            new Watcher(node, data, value, function (value) {
                node.style[style] = data_util(data, value);
            });
        })
    }
}

function data_util(data, attrValue) {
    if (attrValue.indexOf(".") != -1) {
        var arr = attrValue.split('.');
        return arr.reduce((da, cur) => {
            return da[cur]
        }, data)
    } else {
        return data[attrValue]
    }
}

function set_data_util(data, attrValue, value) {
    if (attrValue.indexOf(".") != -1) {
        var arr = attrValue.split('.');
        var last = arr.pop();
        arr.reduce((da, cur) => {
            return da[cur]
        }, data)[last] = value

    } else {
        data[attrValue] = value;
    }
}

function observe(obj) {
    if (typeof obj === 'object' && typeof obj !== 'null') {
        var arr = Object.keys(obj);
        arr.forEach((key) => {
            defineReactive(obj, key, obj[key])
        })
    }
}

function defineReactive(obj, key, value) {
    observe(obj[key])
    var dep = new Dep();
    Object.defineProperty(obj, key, {
        get: function () {
            if (Dep.global) {
                dep.add(Dep.global)
            }
            return value
        },
        set: function (newValue) {
            if (newValue === value) {
                return
            }
            observe(newValue)
            value = newValue
            dep.notify();
        }
    })
}

class Dep {
    constructor() {
        this.subs = [];
        this.id = parseInt(Math.random() * 10000000)
    }

    add(sub) {
        this.subs.push(sub)
    }

    notify() {
        this.subs.forEach(sub => {
            sub.updata();
        })
    }
}

let i = 1000;
class Watcher {
    constructor(node, data, name, cb) {
        this.id = i++;
        this.data = data;
        this.node = node;
        this.name = name;
        this.cb = cb;
        Dep.global = this;
        this.get();
        Dep.global = null;
        this.dirty = false  //是否同步
    }

    updata() {
        //updata 中有同步方法，源码中使用options.lazy;这里只写异步方法
        queueWatcher(this);
        // this.cb(this.name);
    }

    get() {
        // this.value = data_util(this.data, this.name)
        this.cb(this.name);
    }

    //由刷新watcher队列的函数调用，负责执行watcher.get方法
    run(){
        this.get()    //源码使用的get方法, 我们
        // this.cb(this.name);
    }
}





//  updata 相关
const queue =[];  //创建watcher队列
let flushing = false; //识别当前的watcher 队列是否正在被刷新,如果watcher的回调函数中有更改响应式数据的情况，这时候会出现刷新的情况，当属爱你watcher队列时，这个队列有序，需要将新插入的watcher放入合适的位置
let waiting = false; //标识数组中已经存在一个刷新watcher队列的函数
let pending = false ;//
const callbacks = [];    //存放刷新watcher队列的函数，用户调用vue.nextTick()传入的函数

function queueWatcher (watcher){
    if(!queue.includes(watcher)){   //防止watcher重复入队
        if(!flushing){
            queue.push(watcher)
        }else{
            //[5,7,9,watcher,10,15]
            let flag = false ;  //标记当前
            for(let i = queue.length-1;i>=0;i--){
                if(queue[i].id<watcher.id){
                    flag = true
                    queue.splice(i+1,0,watcher)
                }
            }
            if(!flag){
                queue.unshift(watcher)
            }
        }
    }

    if(!waiting){
        //保证callbacks数组中只有一个刷新watcher 队列的函数
        waiting = true;
        nextTick(flushSchedulerQueue)
    }
    //负责刷新watcher队列函数
    function flushSchedulerQueue(){
        //表示正在刷新watcher队列；
        flushing =true
        //给watcher队列排序，根据watcher.id 从小到大
        queue.sort((a,b)=> a.id-b.id)
        while (queue.length){
            const watcher = queue.shift()
            watcher.run();
        }
        //watcher队列已经为空了
        flushing = waiting = false
    }
    function nextTick(cb){
        callbacks.push(cb);
        if(!pending){  //标识浏览器当前任务队列中没有刷新callbacks 数组的函数
            //将刷新callbacks 数组的函数放到浏览器的异步执行队列中
            pending = true ;
            Promise.resolve().then(flushCallbacks)
        }
    }

    //执行callbacks中的每一个函数
    function flushCallbacks(){
        // 浏览器任务队列中的flushCallbacks 函数已经被拿到执行了，新的flushCallbacks可以进入
        pending = false;
        while(callbacks.length){
            //每次拿最头上回调函数
            const cb = callbacks.shift();
            cb();
        }
    }

    myVue.prototype.$nextTick = nextTick;

}

