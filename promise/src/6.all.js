

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 500);
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 0);
})

let p3 = new Promise((resolve, reject) => {
  resolve('p3')
})

// 思路
// all方法返回一个promise 并且resolve所有结果 都放在一个数组
// 需要记住结果的顺序
// 
Promise.all = function (values) {
  return new Promise((resolve, reject) => {
    let result = []
    let times = 0
    function collect() {
      times++
      if (times === values.length) {
        resolve(result)
      }
    }
    values.forEach((p, index) => {
      Promise.resolve(p).then(y => {
        result[index] = y
        collect()
      }, reject)
    })
  })
}

let p = Promise.all([p1, p2, p3]).then(res => {
  console.log('=====', res) // [ 'p1', 'p1', 'p3' ]
}).catch(err => {
  console.log('=====', err)
})