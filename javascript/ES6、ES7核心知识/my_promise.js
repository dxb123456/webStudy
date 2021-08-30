var ID =1;
class Promise {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';

    constructor(executor) {

        //executor 为传进来的参数  executor =（resolve,reject) =>{ resolve('成功')}
        this.id = ID++;
        this.state = 'pending';
        this.value = null;
        this.callbacks = [];   //记录 then的数据
        try {
            executor(this.resolve, this.reject)

            // 将resolve函数 和reject函数传给 executor
        } catch (error) {
            this.reject(error)
        }
    }

    resolve = (value) => {
        //此value为外界传回来的值
        if (this.state == Promise.PENDING) {
            this.state = Promise.FULFILLED;
            this.value = value;
            setTimeout(_ => {
                this.callbacks.map(callback => {
                    callback.onFulfilled(value)
                })
            })
        }
    }

    reject = (reason) => {
        if (this.state == Promise.PENDING) {
            this.state = Promise.REJECTED
            this.value = reason;
            setTimeout(_ => {
                this.callbacks.map(callback => {
                    callback.onRejected(reason)
                })
            })
        }
    }


    then(onFulfilled, onRejected) {
        //对then函数参数进行识别
        if (typeof onFulfilled !== 'function') {
            // onFulfilled = () => {
            // }
            onFulfilled = value => this.value        //当 只有.then()  需要将then穿透
        }
        if (typeof onRejected !== 'function') {
            onRejected = value => this.value
        }
        // console.log(onFulfilled,onRejected);
        let promise2 = new Promise((resolve, reject) => {
            if (this.state == Promise.PENDING) {
                this.callbacks.push({
                    onFulfilled: (value) => {
                        this.handle(promise2, onFulfilled, value, resolve, reject)
                        // try {
                        //     let aa = onFulfilled(value);
                        //     if(aa instanceof Promise){
                        //         aa.then(
                        //             value=>resolve(value),
                        //             reason=>reject(reason)
                        //         )
                        //     }else{
                        //         resolve(aa)
                        //     }
                        // } catch (error) {
                        //     // onRejected(error)
                        //     reject(error)     //错误交给自己的reject来处理
                        // }
                    },
                    onRejected: reason => {
                        this.handle(promise2, onFulfilled, reason, resolve, reject)
                        // try {
                        //     let aa = onRejected(reason);
                        //     if(aa instanceof Promise){
                        //         aa.then(
                        //             value=>resolve(value),
                        //             reason=>reject(reason)
                        //         )
                        //     }else{
                        //         reject(aa)
                        //     }
                        // } catch (error) {
                        //     // onRejected(error)
                        //     reject(error)
                        // }
                    }
                })
            }
            if (this.state == Promise.FULFILLED) {

                setTimeout(() => {
                    this.handle(promise2, onFulfilled, this.value, resolve, reject)
                    // try {
                    //     let aa= onFulfilled(this.value);
                    //     console.log(aa,'FULFILLED')
                    //     if(aa instanceof Promise){
                    //         aa.then(
                    //             value=>resolve(value),
                    //             reason=>reject(reason)
                    //         )
                    //     }else{
                    //         resolve(aa)
                    //     }
                    // } catch (error) {
                    //     // onRejected(error)
                    //     reject(error)
                    // }
                })
            }

            if (this.state === Promise.REJECTED) {

                setTimeout(() => {
                    this.handle(promise2, onRejected, this.value, resolve, reject)
                    // try {
                    //     let aa= onRejected(this.value);
                    //     console.log(aa,'REJECTED')
                    //     if(aa instanceof Promise){
                    //         aa.then(
                    //             value=>resolve(value),
                    //             reason=>reject(reason)
                    //         )
                    //     }else{
                    //         resolve(aa)
                    //     }
                    // } catch (error) {
                    //     // onRejected(error)
                    //     reject(error)
                    // }
                })
            }
        })
        return promise2
    }

    handle = (promise2, onFulfilled, value, resolve, reject) => {
        let aa = onFulfilled(value);
        if (promise2 == aa) {
            throw new TypeError('不能返回同一个promise')
        }
        try {
            if (aa instanceof Promise) {
                aa.then(
                    value => resolve(value),
                    reason => reject(reason)
                )
            } else {
                resolve(aa)
            }
        } catch (error) {
            // onRejected(error)
            reject(error)     //错误交给自己的reject来处理
        }
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(resolve, reject)
            } else {
                resolve(value)
            }
        })
    }

    static reject(value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(resolve, reject)
            } else {
                reject(value)
            }
        })
    }


    static all(array) {
        let arr = [];
        return new Promise((resolve, reject) => {
            array.map(item => {
                item.then(value => {
                    arr.push(value);
                    if (arr.length == array.length) {
                        resolve(arr)
                    }
                    // console.log(value)
                }, reason => {
                    reject(reason)
                })
            })
        })
    }

    static race(arr) {

        return new Promise((resolve, reject) => {
            arr.map(item => {
                item.then(
                    value => {
                        resolve(value);
                    },
                    reason => {
                        reject(reason)
                    }
                )
            })
        })
    }
}
