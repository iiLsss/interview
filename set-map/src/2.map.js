// map 

let map = new Map([
  ['a', 1],
  ['b', 1],
  [[1,2,3], 1],
  [{name: 'duqiu'}, 1]
])

// has set get delete 
// 与set相同

console.log(map) // Map(4) { 'a' => 1, 'b' => 1, [ 1, 2, 3 ] => 1, { name: 'duqiu' } => 1 }

console.log(map.has('a')) // true
console.log(map.get('a')) // 1
map.delete('b')
console.log(map) // { 'a' => 1, [ 1, 2, 3 ] => 1, { name: 'duqiu' } => 1 }

console.log(map.keys()) // [Map Iterator] { 'a', [ 1, 2, 3 ], { name: 'duqiu' } }
console.log(map.values()) // [Map Iterator] { 1, 1, 1 }
console.log(map.entries()) // [Map Entries] {[ 'a', 1 ],[ [ 1, 2, 3 ], 1 ],[ { name: 'duqiu' }, 1 ]}