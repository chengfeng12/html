let a = 1,
  b = 2;
[a, b] = [b, a];
console.log(a, b);

let arr = new Array();
let arr2 = [];
console.log(arr instanceof Array, arr2 instanceof Array);

// 手写 new
function createObj(func, ...args) {
  let obj = {};
  obj.__proto__ = Object.prototype;
  const result = func.apply(obj, args)
  return result instanceof Object ? result : obj;
}

function person(name, age) {
  this.name = name;
  this.age = age;
}
console.log(createObj(person, '章三', 18));