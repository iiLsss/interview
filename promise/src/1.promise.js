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

    const resolve = (value) => {
      // 状态不可变
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.FULFILLED 
        this.value = value
      }
    }

    const reject = (reason) => {
      // 状态不可变
      if (this.status === STATUS.PENDING) {
        this.status = STATUS.REJECTED 
        this.reason = reason
      }
    }
    executer(resolve, reject)

  }
  then(onFulfilled, onRejected) {
    // 调用.then 方法判断当前状态，执行回调即可
    if (this.status === STATUS.FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === STATUS.REJECTED) {
      onRejected(this.reason)
    }
  }
}

let p = new Promise((resolve, reject) => {
  console.log('----')
  resolve(123)
  reject(321)
})

p.then(res => {
  console.log('resolve',res);
}, err =>{
  console.log('reject',err);
})
