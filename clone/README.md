# 面试题系列之浅拷贝&深拷贝

## 面试题

- 浅拷贝&深拷贝的区别？以及常用的方法？
- 实现一个深拷贝，循环引用怎么解决？


### 浅拷贝

拷贝第一层，深层次的引用类型则共享内存地址

- Object.assign 
- 扩展运算符 ...
- Array.prototype.concat()
- Array.prototype.slice()


**assign**
```js
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
console.log(copyObj) // { name: 'diqiu', age: 18, arr: [ 1, 2, 3 ], obj: { a: 1, b: 2 } }
person.age = 28
console.log(person)  // { name: 'diqiu', age: 28, arr: [ 1, 2, 3 ], obj: { a: 1, b: 2 } }
console.log(copyObj) // { name: 'diqiu', age: 18, arr: [ 1, 2, 3 ], obj: { a: 1, b: 2 } }
person.obj.a = 100000
// person.obj = {a: 123, b:321}
console.log(person) // { name: 'diqiu', age: 28, arr: [ 1, 2, 3 ], obj: { a: 100000, b: 2 } }
console.log(copyObj) // { name: 'diqiu', age: 18, arr: [ 1, 2, 3 ], obj: { a: 100000, b: 2 } }
```


**...**
```js
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
console.log(person)  // { name: 'diqiu', age: 28, arr: [ 1, 2, 3 ], obj: { a: 1, b: 2 } }
console.log(copyObj) // { name: 'diqiu', age: 18, arr: [ 1, 2, 3 ], obj: { a: 1, b: 2 } }
person.obj.a = 100000
console.log(person) // { name: 'diqiu', age: 28, arr: [ 1, 2, 3 ], obj: { a: 100000, b: 2 } }
console.log(copyObj) // { name: 'diqiu', age: 18, arr: [ 1, 2, 3 ], obj: { a: 100000, b: 2 } }
```


**concat&slice**
```js
let arr = [1,'2', true, {a:1,b:2}]
let copyArr = arr.slice(0, 4) 
// let copyArr = arr.concat()
// 完成拷贝
console.log(copyArr) // [ 1, '2', true, { a: 1, b: 2 } ]
 
// 改变源数据 copy的数组没有变化
arr[2] = false
console.log(arr) // [ 1, '2', false, { a: 1, b: 2 } ]
console.log(copyArr) // [ 1, '2', true, { a: 1, b: 2 } ]

// 改变深层次引用类型 copy的数组跟随变化
arr[3].a = 1111
console.log(arr) // [ 1, '2', false, { a: 1111, b: 2 } ]
console.log(copyArr) // [ 1, '2', true, { a: 1111, b: 2 } ]
```

### 深拷贝

完全拷贝对象，新开辟的内存空间，不同的引用地址

- 递归
- JSON.parse(JSON.stringify())

**递归并解决循坏嵌套问题**

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj == null) return obj
  if (typeof obj !== 'object') return obj
  if (obj instanceof RegExp) return new RegExp(obj)
  if (obj instanceof Date) return new Date(obj)
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  let copy = new obj.constructor
  hash.set(obj, copy)

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      copy[key] = deepClone(obj[key], hash)
    }
  }
  return copy
}

```
