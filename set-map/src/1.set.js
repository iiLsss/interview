let set = new Set([1,2,3,4,1,2,3,4,1,2,4])
// console.log(set); // Set(4) { 1, 2, 3, 4 }
set.add('90')
// console.log(set); // Set(5) { 1, 2, 3, 4, '90' }
console.log(set.has(1)) // true
// set.clear()

// console.log(set) // Set(0) {}

set.delete(1)
console.log(set) // Set(4) { 2, 3, 4, '90' }

 
console.log(set.keys()); //[Set Iterator] { 2, 3, 4, '90' }

console.log(set.entries()); //[Set Iterator]  { [ 2, 2 ], [ 3, 3 ], [ 4, 4 ], [ '90', '90' ] }
console.log(set.values()); //[Set Iterator]  { 2, 3, 4, '90' }
set.forEach((val, index) => {
  console.log(val, index) // 22 33 44 9090
})
// set可以简单实现去重 并集 交集

function unique(arr1, arr2){
  return new Set([...arr1, ...arr2])
}

let arr1 =[1,2,3,4]
let arr2 =[3,4 ,5,6]
console.log(unique(arr1, arr2)) // { 1, 2, 3, 4, 5, 6 }


function intersect(arr1, arr2) {
  let s1 = new Set(arr1)
  let s2 = new Set(arr2)
  return [...s1].filter(i => s2.has(i))
}

console.log(intersect(arr1, arr2)) //[ 3, 4 ]


