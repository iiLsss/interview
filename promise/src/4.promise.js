// Promise 三种状态
const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
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
    let p = new Promise((resolve, reject) => {
      if (this.status === STATUS.FULFILLED) {
        // 用 then的返回值 作为下次的结果
        try { 
          let x = onFulfilled(this.value)
          
          resolve(x)
        } catch (error) {
          reject(error)
        }
        
      }
      if (this.status === STATUS.REJECTED) {
        try {
          let y = onRejected(this.reason)
          resolve(y)
        } catch (error) {
          reject(error)
        }
        
      }
      if(this.status === STATUS.PENDING) {
        // 订阅
        this.onFulfilledCallback.push(() => {
          try {
            let x = onFulfilled(this.value)
            resolve(x)
          } catch (error) {
            reject(error)
          }
          
        })
        this.onRejectedCallback.push(() => {
          try {
            let x = onRejected(this.reason)
            resolve(x)
          } catch (error) {
            reject(error)
          }
          
        })
      }
    })
    return p
  }
}


// 支持链式调用 并处理异常错误

let p = new Promise((resolve, reject) => {
  resolve(123)
})

p.then(res => {
  console.log('第一次then', res);
  // return res + 123
  return res + a
}).then(res =>{
  console.log('第二次then', res);
}, err => {
  console.log('=====reject', err)
})