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

// 异步调用了resolve
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('settimeout',123)
    // reject(321)
  }, 1000);
 
})

p.then(res => {
  console.log('p===',res);
}, err =>{
  console.log('p===',err);
})


// 多次调用then方法
let p1 = new Promise((resolve, reject) => {
  resolve('diqiu')
})

p1.then(res => {
  console.log('p1===', res);
})
p1.then(res => {
  console.log('p1===', res);
})
p1.then(res => {
  console.log('p1===', res);
})



