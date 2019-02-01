// Copyright 2019 LuoChen (luochen1990@gmail.com). Apache License 2.0

// basic things
const iter = xs => (typeof xs === 'function')? xs() : xs
const list = xs => (typeof xs === 'function')? [...xs()] : xs
const lazy = xs => function*() { for (let x of iter(xs)) { yield x } }
const empty = xs => (typeof xs === 'function')? xs().next().done : xs.length == 0
const cons = x0 => xs => function*() { yield x0; for (let x of iter(xs)) { yield x } }
const head = xs => (typeof xs === 'function')? xs().next().value : xs[0]
const tail = xs => (typeof xs === 'function')? (function*() { let it = iter(xs); it.next(); for (let x of it) { yield x } }) : xs.slice(1)
const last = xs => {if (typeof xs === 'function') {let x; for (x of xs()) { }; return x} else return xs[xs.length-1]}

// producers

const range = (n, m) => function*() { let [i,j] = m==null? [0,n] : [n,m]; for (; i < j; ++i) { yield i } }
const naturals = function*() { for (let x=0; ; ++x) { yield x } }
const entries = ob => Object.entries(ob)
const repeat = x => function*() { for(;;) { yield x } }
const replicate = n => x => take(n)(repeat(x))
const cycle = xs => function*() { for(;;) { for (let x of iter(xs)) { yield x } } }
const iterate = f => x0 => function*() { for (let x = x0; ; x = f(x)) { yield x } }

// transformers

const map = f => xs => function*() { for (let x of iter(xs)) { yield f(x) } }
const filter = p => xs => function*() { for (let x of iter(xs)) { if(p(x)){ yield x } } }
const take = n => xs => function*() { for (let x of iter(xs)) { if (n > 0) { --n; yield x } else { return } } }
const drop = n => xs => function*() { for (let x of iter(xs)) { if (n > 0) { --n } else { yield x } } }
const takeWhile = p => xs => function*() { for (let v of iter(xs)) { if(p(v)){ yield v } else { return } } }
//TODO: dropWhile

const reverse = xs => (typeof xs === 'function')? [...xs()].reverse() : function*() { for (let i=xs.length-1; i>=0; --i) { yield xs[i] } }
const sort = xs => list(xs).sort()
const sortOn = f => xs => list(xs).sort((a, b) => ((fa = f(a)) > (fb = f(b))) - (fa < fb))

const streak = n => xs => function*() { let l = []; for (let x of iter(xs)) { l.push(x); if (l.length === n) { yield l; l = l.slice(1) } } }
const scanl = op => x0 => xs => function*() { let r = x0; for (let x of iter(xs)) { r = op(r)(x); yield r } }
const scanr = op => x0 => xs => scanl(r => x => op(x)(r))(x0)(reverse(xs))

// combinators

const zip = xs => ys => function*() { let iy = iter(ys); for (let x of iter(xs)) { let ny = iy.next(); if (ny.done) { return } else { yield [x, ny.value] } } }
const zipWith = op => xs => ys => function*() { let iy = iter(ys); for (let x of iter(xs)) { let ny = iy.next(); if (ny.done) { return } else { yield op(x)(ny.value) } } }
const concat = xss => function*() { for (let xs of iter(xss)) { for (let x of iter(xs)) { yield x } } }

// diffluencers

const group = xs => function*() { let p=[], y; for(let x of iter(xs)){if(empty(p)||x===y){p.push(x)}else{y=x;yield p;p=[x]}}; if (!empty(p)){yield p} }
const groupOn = f => xs => function*() { let p=[], y; for(let x of iter(xs)){if(empty(p)||f(x)===y){p.push(x)}else{y=f(x);yield p;p=[x]}}; if (!empty(p)){yield p} }
const groupWithKey = f => xs => { let mp={}; for (let x of iter(xs)) { let y=f(x); l=mp[y]; if(l==null){mp[y]=l=[]}; l.push(x) }; return mp }
const partition = p => xs => [filter(p)(xs), filter(x => !p(x))(xs)]

// consumers

const foldl = op => x0 => xs => { let r = x0; for (let x of iter(xs)) { r = op(r)(x) }; return r }
const foldr = op => x0 => xs => foldl(r => x => op(x)(r))(x0)(reverse(xs))
const all = p => xs => { for (let x of iter(xs)) { if(!p(x)){ return false } } return true }
const any = p => xs => { for (let x of iter(xs)) { if(p(x)){ return true } } return false }

// advanced things

const isPrime = n => n < 2 ? false : isPrim(n)
const isPrim = n => all(p => n % p != 0)(takeWhile(p => p * p <= n)(primes))
const primes = cons(2)(filter(isPrim)(range(3, Infinity)))

// TODO

//const maximum = f => xs =>
//const minimum = f => xs =>
//const maximumOn
//const minimumOn

//const randoms
//const permutations
//const powerset
//const cartProd = xss =>

module.exports = {
  iter, list, lazy, empty, cons, head, tail, last,
  range, naturals, entries, repeat, replicate, cycle, iterate,
  isPrime, primes,
  map, filter, take, drop, takeWhile, reverse, sort, sortOn,
  streak, scanl, scanr,
  zip, zipWith, concat,
  group, groupOn, groupWithKey, partition,
  foldl, foldr, all, any
}
