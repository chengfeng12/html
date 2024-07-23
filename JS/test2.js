let testData = {
  "x": {
    "x1": "aa",
    "x2": [11, 22],
    "x3": {
      "m": { 'n': 123 },
    }
  },
  "y": [
    { "p": 1, "q": 'aa', },
    { "p": 3, "q": "bb" }
  ],
  "z": true
}

function flotObj(data) {
  let newObj = {};
  function isArray(arr) {
    return arr instanceof Array;
  }
  function flotTree(obj, preKey = '') {
    for (const key in obj) {
      let type = typeof obj[key],
          tempKey = `${preKey}${key}`;
      if (type !== 'object') {
        newObj[tempKey] = type;
      } else if (isArray(obj[key])) {
        newObj[preKey+key] = 'Array';
        obj[key].forEach(item => {
          flotTree(item, `${tempKey}.`);
        });
      } else {
        newObj[preKey+key] = type;
        flotTree(obj[key], `${tempKey}.`);
      }
    }
  }
  flotTree(data)
  return newObj;
}
console.log(flotObj(testData));


/* function sleep(num) {
  setTimeout(() => {
    console.log(num);
  }, num * 1000);
}
for (var i = 0; i < 5; i++) {
  sleep(i)
  // setTimeout(() => {
  //   console.log(i);
  // }, i * 1000);
} */