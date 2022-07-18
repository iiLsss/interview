

// 实现深拷贝 递归遍历
/**
 * 实现思路
 * 1. null undefined 直接返回
 * 2. 基本数据类型直接返回
 * 3. 正则、日期需要new 
 * 4. 引用类型在递归处理
 * 嵌套递归处理   
 * 1. 每次保存值 在赋值的时候直接进行判断是否存在，如果存在直接返回
 * 2. 可以用weakMap 键值对映射 
 */
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


let obj = {
  name: 'diqiu',
  age: [1,2,3,4],
  list: [{
    name: 'a'
  }, {
    name: 'b'
  }]
  
}

let copy = deepClone(obj)

console.log(copy);

const a = {
  name: 'diqu',
  b: {}
}
a.b.a = a.b

let copy1 = deepClone( a)

console.log(copy1);
