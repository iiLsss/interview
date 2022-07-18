let arr = [1,'2', true, {a:1,b:2}]

// let copyArr = arr.slice(0, 4) 
let copyArr = arr.concat()
// 完成拷贝
console.log(copyArr)  // [ 1, '2', true, { a: 1, b: 2 } ]
 
// 改变源数据 copy的数组没有变化
arr[2] = false
console.log(arr)  // [ 1, '2', false, { a: 1, b: 2 } ]
console.log(copyArr) // [ 1, '2', true, { a: 1, b: 2 } ]

// 改变深层次引用类型 copy的数组跟随变化
arr[3].a = 1111
console.log(arr)  // [ 1, '2', false, { a: 1111, b: 2 } ]
console.log(copyArr) // [ 1, '2', true, { a: 1111, b: 2 } ]
