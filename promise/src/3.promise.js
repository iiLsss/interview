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

    this.onFulfilledCallback = [] // 
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
    if (this.status === STATUS.FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === STATUS.REJECTED) {
      onRejected(this.reason)
    }
    // 当异步执行 resolve 或者 reject的时候
    if(this.status === STATUS.PENDING) {
      // 订阅
      this.onFulfilledCallback.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallback.push(() => {
        onRejected(this.reason)
      })
    }
  }
}


// 处理异常错误

let p = new Promise((resolve, reject) => {
  console.log( abc)
  resolve(123)
 
})

p.then(res => {
  console.log(res);
}, err =>{
  console.log(err);
})