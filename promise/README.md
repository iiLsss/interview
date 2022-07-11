# 面试题系列之promise

1. 描述promise
2. promise常用api
3. promise.all、promise.race的作用及实现原理
4. promise如何实现中断
5. promise常见代码输出题

[讲解视频地址](https://www.bilibili.com/video/BV1yB4y1h7gD?share_source=copy_web)

## 相关文档

1. [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
2. [使用 Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises#%E5%B8%B8%E8%A7%81%E9%94%99%E8%AF%AF)
3. [Promises/A+ 规范](https://promisesaplus.com/)
4. [ES6 Promise](https://262.ecma-international.org/6.0/#sec-promise-jobs)

## 1. 描述promise

Promise是异步编程的一种解决方案，可以把异步操作最终的成功返回值或失败原因和相应的处理程序关联起来

### 简单实现promise源码

#### 1. 实现基本逻辑

```js
let p = new Promise((resolve, reject) => {
  console.log('----')
  resolve(123)
  // reject(321)
})

p.then(res => {
  console.log(res);
}, err =>{
  console.log(err);
})
```

上述代码展示原生Promise的基本功能，展示了`resolve`、`reject`、`then`的使用


**实现思路**
1. Promise三种状态`Pending(等待)`、`Fulfilled(成功)`、`Rejected(失败)`
2. Promise中的状态使用`resolve`和`reject`两个函数改变状态，并且状态是不可逆

```js
// 1. 首先声明状态常量
const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

// 2. 创建Promise class类
class Promise{
  constructor(){
    this.status = STATUS.PENDING // 储存状态值，赋值pending，
    this.value = undefined // 成功的值
    this.reason = undefined // 失败的原因
    // 声明两个函数 resolve  reject 当调用该函数时，改变状态，并且状态不可变
    const resolve = (val) => {
      if(this.status === STATUS.PENDING ){
        this.status = STATUS.FULFILLED
        this.value = val
      }
      
    }
    const reject = (reason) => {
      if(this.status === STATUS.PENDING ){
        this.status = STATUS.REJECTED
        this.reason = reason
      }
    }
  }
}

```

**实现思路**
1. new Promise传入一个参数(执行器`executer`)方法，执行器有两个参数`resolve`和`reject`。
2. then方法传入两个参数`onFulfilled`和`onReject`两个回调函数，当Promise内部状态改变时，调用相关状态回调函数
3. 执行器`executer`中的代码，如果有代码错误，那么Promise的状态要变为失败

```js
class Promise{
  // 1. 传入参数 executer
  constructor(executer){
    this.status = STATUS.PENDING 
    this.value = undefined 
    this.reason = undefined 
    
    const resolve = (val) => {
      if(this.status ===STATUS.PENDING ){
        this.status = STATUS.FULFILLED
        this.value = val
      }
    }
    const reject = (reason) => {
      if(this.status ===STATUS.PENDING ){
        this.status = STATUS.REJECTED
        this.reason = reason
      }
    }
    // 2. executer会立即执行，有两个参数 resolve 、 reject。
    // 3. executer中出现异常错误，会reject变成失败态
    try {
      executer(resolve, reject)
    } catch (error) {
      reject(error)
    }
   
  }
  // 3. 传入成功&失败的回调函数。当调用then方法时，判断此Promise的状态
  then(onFulfilled, onReject) {
    // 4. 当状态成功时，调用成功的回调函数，并将成功值返回
    if (this.status === STATUS.FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === STATUS.FULFILLED) {
      onReject(this.reason)
    }
  }
}

```

[以上完整代码](./src/1.promise.js)

#### 2. 异步逻辑&多次调用then方法

```js
// 异步逻辑
let p = new Promise((resolve, reject) => {
  console.log( 123)
  setTimeout(() => {
    resolve('setTimeout',123)
    // reject(321)
  }, 1000);
})

p.then(res => {
  console.log(res);
}, err =>{
  console.log(err);
})
// 多次调用then
p.then(res => {
  console.log(res);
}, err =>{
  console.log(err);
})
p.then(res => {
  console.log(res);
}, err =>{
  console.log(err);
})
```

实际使用Promise过程中会进行异步调用`resolve`或`reject`方法。

**异步逻辑实现思路**
1. 异步调用`resolve`或`reject`方法，在执行`then`方法时当前状态是`Pending`。因此可以将回调函数进行保存。
2. 在执行`resolve`或`reject`的时候，去触发对应保存的回调函数

```js

class Promise {
  constructor(executer) {
    this.status = STATUS.PENDING 
    this.value = undefined 
    this.reason = undefined 

    this.onFulfilledCallback = null // 成功的回调函数
    this.onRejectedCallback = null // 失败的回调函数

    const resolve = (value) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED 
        this.value = value
        // 当外层异步调用 resolve后，执行缓存的onFulfilledCallback方法
        this.onFulfilledCallback && this.onFulfilledCallback(this.value) 
      }
    }

    const reject = (reason) => {
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED 
        this.reason = reason
        // 当外层异步调用 reject后，执行缓存的onFulfilledCallback方法
        this.onRejectedCallback && this.onRejectedCallback(this.reason)
      }
    }
    executer(resolve, reject)
  }
  then(onFulfilled, onRejected) {
    if (this.status === STATUS.FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === STATUS.REJECTED) {
      onRejected(this.reason)
    }
    // 当异步执行 resolve 或者 reject的时候 当前状态是pending 则保存回调函数
    if(this.status === STATUS.PENDING) {
      this.onFulfilledCallback = onFulfilled
      this.onRejectedCallback = onRejected
    }
  }
}

```

**多次调用then方法实现思路**

1. 多次调用then方法，应该把每次then传入的`onFulfilled`和`onReject`进行缓存。
2. 当Promise状态改变时，去触发相应状态缓存里的方法
3. 发布订阅模式

```js

class Promise {
  constructor(executer) {
    // ...
    this.onFulfilledCallback = [] // 成功的回调函数
    this.onRejectedCallback = [] // 失败的回调函数

    const resolve = (value) => {
      if (this.status === STATUS.PENDING) {
        // ...
        
        this.onFulfilledCallback.forEach(fn => fn()) // 状态改变后，遍历数组执行并执行
      }
    }

    const reject = (reason) => {
      if (this.status === STATUS.PENDING) {
        // ...
        this.onRejectedCallback.forEach(fn => fn()) // 状态改变后，遍历数组执行并执行
      }
    }
    executer(resolve, reject)
  }
  then(onFulfilled, onRejected) {
    //...
    if(this.status === STATUS.PENDING) {
      // 将传入的 onFulfilled onRejected 存入数组中，
      this.onFulfilledCallback.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallback.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

```

[以上完整代码](./src/2.promise.js)

#### 3. 实现then的链式调用

```js
let p = new Promise((resolve, reject) => {
  resolve(123)
})

p.then(res => {
  return res + 123
}, err =>{
  console.log(err);
}).then(res =>{
  console.log(res);
}, err => {
  console.log('=====', err)
})
```

**实现思路**
1. promise可以进行链式调用，`then`方法返回Promise。
2. 如果`then`中返回一个普通值（不是promise），就会作为下一个`then`的成功结果
2. 如果`then`中抛出了异常，就会作为下一个`then`的失败结果

```js
 class Promise {
  // ...
  then(onFulfilled, onRejected) {
    let p = new Promise((resolve, reject) => {
      if (this.status === STATUS.FULFILLED) {
        try{
          let x = onFulfilled(this.value) 
          // 结果值resolve返回 在下一个then可以在成功的回调中获取
          resolve(x)
        }catch(e) {
          // 出现失败，则reject 在下一个then可以在失败的回调中获取
          reject(e)
        }
        
      }
      if (this.status === STATUS.REJECTED) {
        try{
          let x = onRejected(this.reason)
          resolve(x)
        }catch(e) {
          reject(e)
        }
      }
      // 当异步执行 resolve 或者 reject的时候
      if(this.status === STATUS.PENDING) {
        // 订阅
        this.onFulfilledCallback.push(() => {
          try{
            let x = onFulfilled(this.value)
            resolve(x)
          }catch(e) {
            reject(e)
          }
          
        })
        this.onRejectedCallback.push(() => {
          try{
            let x = onRejected(this.reason)
            resolve(x)
          }catch(e) {
            reject(e)
          }
        })
      }
    })
    return p
  }
}

```

[以上完整代码](./src/4.promise.js)

#### 4. then方法返回promise

**实现思路**
1. `then`返回的是一个promise，需要等这个promise执行完。
2. 如果成功，就走下一个then的成功。
3. 如果失败，就走下一个then的失败。

```js
// 因此我们需要对返回值进行判断
/**
 * 判断then方法的返回值
 * @param {*} promise then返回的promise
 * @param {*} x then方法回调执行的返回值
 * @param {*} resolve then返回的promise 的resolve 
 * @param {*} reject then返回的promise 的reject 
 * @returns 
 */
function resolvePromise(p, x resolve, reject) {
  if (x === p) {
    return reject(new Error('不能循坏调用promise'))
  }
if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    // 只有x 是对象或者函数有可能是promise
    let called = false // 表示没调用过成功和失败
    try {
      let then = x.then // 取x上的then
      if (typeof then === 'function') {
        then.call(x, res => {
          // res 可能是个promise 递归解析res的值
          if (called) return
          called = true
          resolvePromise(p, res, resolve, reject )
        }, r =>{
          if (called) return
          called = true
          reject(r)
        })

      } else {
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }

  } else {
    // 如果不是 那一定是普通值
    resolve(x)
  }
}
class Promise{
  //...
  then(onFulfilled, onRejected) {
    let p = new Promise((resolve, reject) => {
      if (this.status === STATUS.FULFILLED) {
        // 由于需要传入p 需要异步等待p初始化完成，因此用setTimeout代替微任务
        setTimeout(() => {
          try { 
            let x = onFulfilled(this.value)
            resolvePromise(p, x ,resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0);
      }
      if (this.status === STATUS.REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(p, x ,resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if(this.status === STATUS.PENDING) {
        this.onFulfilledCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(p, x ,resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.onRejectedCallback.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(p, x ,resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
    return p
  }
}
  
```

[以上完整代码](./src/5.promise.js)




## 2. Promise常用api

- [Promise.all()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [Promise.race()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
- [Promise.reject()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)
- [Promise.resolve()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)
- [Promise.prototype.then()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
- [Promise.prototype.catch()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)
- [Promise.prototype.finally()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)
- [Promise.allSettled()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- [Promise.any()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

## 3. promise.all、promise.race的作用及实现原理

**[promise.all](./src/6.all.js)**
将多个Promise实例，包装成一个Promise实例。最终返回的状态由入参的结果决定
1. 当入参的Promise的状态都是成功态，则返回一个数组包含每个入参的返回值（顺序与入参一致）
2. 当入参的Promise有一个是失败态，则返回失败态的返回值

**[promise.race](./src/7.race.js)**
同样是将多个Promise实例，包装成一个Promise实例。但是返回值由最快改变状态的Promise来决定。


## 4. Promise如何实现中断

Promise并没有提供取消方法，我们可以利用Promise.race实现

```js

function warp(p) {
  let cancel
  let p1 = new Promise((resolve, reject) => {
    cancel = () => reject('取消')
  })
  let p2 = Promise.race([p, p1])
  p2.cancel = cancel
  return p2
}

let p = warp(new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(123)
  }, 500)
}))

p.then((res) => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
p.cancel()
```

## 5. Promise常见代码输出题

```js
const p = new Promise((resolve, reject) => {
  resolve()
  throw '异常'
})

p.catch((e) => {
   console.log(e); // 不会执行
})
```

```js
const p = new Promise((resolve, reject) => {
  setTimeout(function() {
    throw '异常';
  }, 1000)
})

p.catch((e) => {
  console.log(e); // 不会执行
})
```

Promise代码输出题都是EventLoop事件环相关，所以打算合并到下次讲EventLoop事件环