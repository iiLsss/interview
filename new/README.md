# 面试题系列之new操作符

## 面试题

new操作符做了什么？

**解析**

1. 创建一个空对象
2. 对象的`this`指向构造函数
3. 对象的`__proto__`指向构造函数的原型`prototype`
4. 返回这个对象

```js

function _new(fn, ...args) {
  let obj = {}
  obj.call(fn, args)
  obj.__proto__ = fn.prototype
  return obj
}

function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.hobby = function(hobby) {
  console.log(hobby)
}
let p1 = _new Person('地球', '1800')
```
