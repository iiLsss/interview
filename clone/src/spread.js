// 扩展运算符 ...
let person = {
  name: 'diqiu',
  age: 18,
  arr: [1,2,3],
  obj: {
    a: 1,
    b:2
  }
}

let copyObj = {...person}
console.log(copyObj) // { name: 'diqiu', age: 18, arr: [ 1, 2, 3 ], obj: { a: 1, b: 2 } }
person.age = 28
console.log(person)  /// { name: 'diqiu', age: 28, arr: [ 1, 2, 3 ], obj: { a: 1, b: 2 } }
console.log(copyObj)  // { name: 'diqiu', age: 18, arr: [ 1, 2, 3 ], obj: { a: 1, b: 2 } }
person.obj.a = 100000
console.log(person)  // { name: 'diqiu', age: 28, arr: [ 1, 2, 3 ], obj: { a: 100000, b: 2 } }
console.log(copyObj) // { name: 'diqiu', age: 18, arr: [ 1, 2, 3 ], obj: { a: 100000, b: 2 } }