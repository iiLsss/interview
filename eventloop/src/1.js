
function sleep(waiting) {
    let t = Date.now()
    while(t + waiting > Date.now()) {}
}

let p = new Promise((resolve, reject) => {
    console.log('1', Date.now())
    resolve(2)
})

p.then(res => {
    console.log(res, Date.now())
    sleep(10000) // 同步任务阻塞
    console.log(res, Date.now())
})
setTimeout(() => {
    console.log(3,Date.now());
}, 1000)