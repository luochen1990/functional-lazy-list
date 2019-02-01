Functional Lazy List
====================

Functional Lazy List, lightweight implimented via ES6 generator.

Demo
----

```javascript
> console.log(list(lazy([1,2,3])))
[ 1, 2, 3 ]

> console.log(list(take(10)(range(10, Infinity))))
[ 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ]

> console.log(list(take(10)(drop(1)(primes))))
[ 3, 5, 7, 11, 13, 17, 19, 23, 29, 31 ]

> console.log(list(takeWhile(x => x < 100)(primes)))
[ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97 ]

> console.log(list(concat(lazy([range(10,15), range(5)]))))
[ 10, 11, 12, 13, 14, 0, 1, 2, 3, 4 ]

> console.log(list(concat(lazy([lazy([1,2,3])]))))
[ 1, 2, 3 ]

> console.log(last([1,2,3]))
3

> console.log(last(range(3)))
2

> console.log(list(group([1,2,2,3,4,4,5,1,3])))
[ [ 1 ], [ 2, 2 ], [ 3 ], [ 4, 4 ], [ 5 ], [ 1 ], [ 3 ] ]

> console.log(list(groupWithKey(x=>x)([1,2,2,3,4,4,5,1,3])))
{ '1': [ 1, 1 ], '2': [ 2, 2 ], '3': [ 3, 3 ], '4': [ 4, 4 ], '5': [ 5 ] }

> console.log(list(group([])))
[]

> console.log(empty([]))
true

> console.log(empty([1]))
false

> console.log(empty(filter(x => x > 0)([1,2,3])))
false

> console.log(empty(filter(x => x < 0)([1,2,3])))
true

> console.log(list(take(3)(naturals)))
[ 0, 1, 2 ]

> console.log(tail([1,2,3]))
[ 2, 3 ]

> console.log(list(tail(range(3))))
[ 1, 2 ]

> console.log(foldl(x=>y=>x+y)(0)([1,2,3]))
6
```

Most Possible Abuse
-------------------

### use `map` to do side effect.

you should **never** do side effect in the argument function of `map` or any other decorators/combiners. if you want to enumerate a LazyList to do something, `for ... of` syntax is exactly what you want.

ie. lots of people used to do things like this:

```javascript
map((x) => {
	console.log(x)
}) range(10)
```

it is strongly recommended that you use `for ... of` instead:

```javascript
for (let x of iter(range(10))) {
	console.log(x)
}
```

The abuse of `map` will make thing unclear since `map` is designed to return a LazyList and changes nothing else. Actually the `map` one won't work since the mapping function is not called immediately.

And `for ... of` is designed to enumerate items in a LazyList and do side effects.

Do right things in right way keeps bugs away.

Install
-------

#### install & require in nodejs

- install with npm: `your/repo/> npm install lazy-list`
- require: `const L = require('lazy-list')`
- require separately: `const {map, filter} = L`

