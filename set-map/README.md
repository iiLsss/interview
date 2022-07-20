# 面试题系列之Set、Map

[讲解视频地址](https://www.bilibili.com/video/BV1rS4y1J7Dj)

## 面试题

- Set和Map的区别
- WeakMap 和 Map的区别

## 基本介绍

Set、Map都是数据类型

### Set

Set对象是值的集合，你可以按照插入的顺序迭代它的元素。Set 中的元素只会出现一次，即 Set 中的元素是唯一的。

```js
let set = new Set([1,2,3,1,2,3,1,2,3])
console.log(set); // Set(3) { 1, 2, 3 }
``` 



**常用方法**

- add()
- clear()
- delete()
- has()

```js
let set = new Set([1,2,3,4,1,2,3,4,1,2,4])
console.log(set); // Set(4) { 1, 2, 3, 4 }

set.add('90')
console.log(set); // Set(5) { 1, 2, 3, 4, '90' }

console.log(set.has(1)) // true

set.delete(1)
console.log(set) // Set(4) { 2, 3, 4, '90' }

set.clear()
console.log(set) // Set(0) {}
```

**遍历方法**

Set 结构没有键名，只有键值（或者说键名和键值是同一个值）。

- values()
- forEach()
- keys()
- entries()

```js
let set = new Set([2, 3, 4, '90'])
console.log(set.keys()); //[Set Iterator] { 2, 3, 4, '90' }
console.log(set.entries()); //[Set Iterator]  { [ 2, 2 ], [ 3, 3 ], [ 4, 4 ], [ '90', '90' ] }
console.log(set.values()); //[Set Iterator]  { 2, 3, 4, '90' }
set.forEach((val, index) => {
  console.log(val, index) // 22 33 44 9090
})
```

### Map

Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者基本类型）都可以作为一个键或一个值。

```js
let map = new Map([
  ['a', 1],
  ['b', 1],
  [[1,2,3], 1],
  [{name: 'duqiu'}, 1]
])
console.log(map) // Map(4) { 'a' => 1, 'b' => 1, [ 1, 2, 3 ] => 1, { name: 'duqiu' } => 1 }

```

- 常用方法

- set()
- get()
- clear()
- delete()
- has()

```js

let map = new Map([
  ['a', 1],
  ['b', 1],
  [[1,2,3], 1],
  [{name: 'duqiu'}, 1]
])


console.log(map) // Map(4) { 'a' => 1, 'b' => 1, [ 1, 2, 3 ] => 1, { name: 'duqiu' } => 1 }

console.log(map.has('a')) // true
console.log(map.get('a')) // 1
map.delete('b')
console.log(map) // { 'a' => 1, [ 1, 2, 3 ] => 1, { name: 'duqiu' } => 1 }

```

**遍历方法**

Set 结构没有键名，只有键值（或者说键名和键值是同一个值）。

- values()
- forEach()
- keys()
- entries()

```js

let map = new Map([
  ['a', 1],
  [[1,2,3], 1],
  [{name: 'duqiu'}, 1]
])

// 返回键名key
console.log(map.keys()) // [Map Iterator] { 'a', [ 1, 2, 3 ], { name: 'duqiu' } }
// 返回键值
console.log(map.values()) // [Map Iterator] { 1, 1, 1 }
// 所有成员的遍历器 使用for of 等同于 entries()
console.log(map.entries()) // [Map Entries] {[ 'a', 1 ],[ [ 1, 2, 3 ], 1 ],[ { name: 'duqiu' }, 1 ]}

```



### WeakMap&WeakSet

> 弱引用 垃圾回收机制不考虑WeakSet值的引用，WeakMap键名的引用

WeakSet的值只能是对象
WeakMap直接接收对象作为键名

