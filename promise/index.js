// (function() {
//   var promise = interview(1)
//     .then(() => {
//       return interview(2);
//     })
//     .then(() => {
//       return interview(3);
//     })
//     .then(() => {
//       console.log("smile");
//     })
//     .catch(err => {
//       console.log("cry at " + err.round + " round");
//     });
// })();

// function interview(round) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() < 0.5) {
//         resolve("success");
//       } else {
//         var error = new Error("fail");
//         error.round = round;
//         reject(error);
//       }
//     }, 500);
//   });
// }

(function() {
  Promise.all([interview("geekbang"), interview("tencent")])
    .then(() => {
      console.log("smile");
    })
    .catch(err => {
      console.log("cry for " + err.name);
    });
})();

function interview(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve("success");
      } else {
        var error = new Error("fail");
        error.name = name;
        reject(error);
      }
    }, 500);
  });
}
