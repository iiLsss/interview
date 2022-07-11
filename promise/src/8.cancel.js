
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