const L = require('../src/lazy-list.js')
console.log(L)
console.log(L.range(10))

const {
  iter, list, lazy, empty, cons, head, tail, last,
  range, naturals, entries, repeat, replicate, cycle, iterate,
  isPrime, primes,
  map, filter, take, drop, takeWhile, reverse, sort, sortOn,
  streak, scanl, scanr,
  zip, zipWith, concat,
  group, groupOn, groupWithKey, partition,
  foldl, foldr, all, any
} = L

console.log(list(take(10)(range(10, Infinity))))
console.log(list(take(10)(drop(1)(primes))))
console.log(list(takeWhile(x => x < 100)(primes)))
console.log(list(lazy([1,2,3])))
console.log(list(concat(lazy([lazy([1,2,3])]))))
console.log(list(concat(lazy([range(10,15), range(5)]))))
console.log(last([1,2,3]))
console.log(last(range(3)))
console.log(list(group([1,2,2,3,4,4,5,1,3])))
console.log(list(groupWithKey(x=>x)([1,2,2,3,4,4,5,1,3])))
console.log(list(group([])))
console.log(empty([]))
console.log(empty([1]))
console.log(empty(filter(x => x > 0)([1,2,3])))
console.log(empty(filter(x => x < 0)([1,2,3])))
console.log(list(take(3)(naturals)))
console.log(tail([1,2,3]))
console.log(list(tail(range(3))))
console.log(foldl(x=>y=>x+y)(0)([1,2,3]))

for (let x of iter(range(10))) {
  console.log(x)
}
