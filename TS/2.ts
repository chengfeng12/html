type Add = string | number
function fun1(a: Add, b: Add) {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return a + b;
  }
}

fun1(2, 3); // Ok
fun1(1, 'a'); // Error
fun1('a', 2); // Error
fun1('a', 'b') // Ok

// 解法
function f(a: number, b: number): number
function f(a: string, b: string): string
function f(a: Add, b: Add) {
  if (typeof a === 'string') {
    return a + ':' + b; // no error but b can be number!
  } else {
    return (a as number) + (b as number);
  }
}

f(2, 3); // Ok
f(1, 'a'); // Error
f('a', 2); // Error
f('a', 'b') // Ok