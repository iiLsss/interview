let person = {
  name: 'diqiu',
  age: 18,
  arr: [1,2,3],
  obj: {
    a: 1,
    b:2
  }
}

let copyObj = Object.assign({}, person)
console.log(copyObj)  // { name: 'diqiu', age: 18, arr: [ 1, 2, 3 ], obj: { a: 1, b: 2 } }
person.age = 28
console.log(person) // { name: 'diqiu', age: 28, arr: [ 1, 2, 3 ], obj: { a: 1, b: 2 } }
console.log(copyObj)  // { name: 'diqiu', age: 18, arr: [ 1, 2, 3 ], obj: { a: 1, b: 2 } }
// person.obj.a = 100000
person.obj = {a: 123, b:321}
console.log(person)  // { name: 'diqiu', age: 28, arr: [ 1, 2, 3 ], obj: { a: 100000, b: 2 } }
console.log(copyObj) // { name: 'diqiu', age: 18, arr: [ 1, 2, 3 ], obj: { a: 100000, b: 2 } }
// { name: 'diqiu', age: 28, arr: [ 1, 2, 3 ], obj: { a: 123, b: 321 } }
// { name: 'diqiu', age: 18, arr: [ 1, 2, 3 ], obj: { a: 1, b: 2 } }