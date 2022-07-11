// Promise 三种状态
const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

/**
 * 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
 * 2. executor 接受两个参数，分别是 resolve 和 reject
 * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 4. promise 的状态一旦确认，就不会再改变
 * 5. promise 都有 then 方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 
 *      和 promise 失败的回调 onRejected
 * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
 *      如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
 *      如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
 * 7. then 的参数 onFulfilled 和 onRejected 可以缺省
 * 8. promise 可以then多次，promise 的then 方法返回一个 promise
 * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
 * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
 * 11.如果 then 返回的是一个promise，那么会等这个promise执行完，promise如果成功，
 *   就走下一个then的成功，如果失败，就走下一个then的失败
 */


// 处理嵌套返回promise
/**
 * 
 * @param {*} promise 
 * @param {*} x 
 * @param {*} resolve 
 * @param {*} reject 
 * @returns 
 */
function resolvePromise(promise, x, resolve, reject) {
  // 判断x的值 决定promise的关系 来判断有可能x是别人的promise 可能别人的promise会出问题
  if (x === promise) {
    return reject(new TypeError('出错了'))
  }
  // 首先判断 x 是否为promise
  if((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called = false // 表示没调用过成功和失败
    try {
      let then = x.then

      if (then && typeof then === 'function') {
        then.call(x, (res) => {
          // res 可能是个promise 递归解析y的值
          if (called) return
          called = true
          resolvePromise(promise, res, resolve, reject)
        }, err => {
          if (called) return
          called = true
          reject(err)
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
    // 普通值 直接返回
    resolve(x)
  }
}

class Promise {
  constructor(executer) {
    this.status = STATUS.PENDING // 初始化状态
    this.value = undefined // 成功值
    this.reason = undefined // 失败值

    this.onFulfilledCallback = [] 
    this.onRejectedCallback = []

    const resolve = (value) => {
      // 状态不可变
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED 
        this.value = value
        // 发布
        this.onFulfilledCallback.forEach(fn => fn())
      }
    }

    const reject = (reason) => {
      // 状态不可变
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED 
        this.reason = reason
        this.onRejectedCallback.forEach(fn => fn())
      }
    }
    try {
      executer(resolve, reject)
    } catch (error) {
      reject(error)
    }

  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : err =>{ throw err}
    let p = new Promise((resolve, reject) => {
      if (this.status === STATUS.FULFILLED) {
        setTimeout(() => {
          // 用 then的返回值 作为下次的结果
          try { 
            let x = onFulfilled(this.value)
            
            resolvePromise(p, x ,resolve, reject)
          } catch (error) {
            console.log('===11==', error)
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
        // 订阅
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
  catch(errFn) {
    return this.then(null, errFn)
  }
}

// 嵌套返回promise

let p = new Promise((resolve, reject) => {
  resolve(123)
})

p.then(res => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(res + 10)
    }, 100)
  })
}).then(res =>{
  console.log(res);
}, err => {
  console.log('=====', err)
})