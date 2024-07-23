function All(params) {
  return new Promise((reslove, reject) => {
    if (!Array.isArray(params)) {
      return reject(new Error("参数错误"));
    }
    let resloveRes = [];
    params.forEach((promise) => {
      Promise.resolve(promise)
        .then((res) => {
          resloveRes.push(res);
          if (resloveRes.length === params.length) {
            reslove(resloveRes);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}
const promise1 = new Promise((resolve, reject) => {
  resolve("foo1");
});
const promise2 = Promise.resolve("foo2");
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo3");
  }, 1000);
});

let proList = [promise1, promise2, promise3];

All(proList)
  .then((res) => {
    console.log(res, "prores");
  })
  .catch((err) => {
    console.log(err, "-----err");
  });
