
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

Promise.race = function(values) {
  return new Promise((resolve, reject) => {
    values.forEach(fn => {
      Promise.resolve(fn)
      .then(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
    });
  })

}

let p = Promise.race([p1, p2, p3]).then(res =>{ 
  console.log('=====', res)
}).catch(err =>{
  console.log('=====', err)

})