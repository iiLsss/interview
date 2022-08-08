function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.hobby = function(hobby) {
  console.log(hobby)
}
// new 做了什么？
let p1 = new Person('地球', '1800')
let p2 = new Person('月球', '800')

console.log(p1.name, p1.age)
console.log(p2.name, p2.age)
p1.hobby('转圈圈')
p2.hobby('也是转圈圈')
