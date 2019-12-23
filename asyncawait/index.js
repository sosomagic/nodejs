// const result = (async function() {
//   try {
//     var content = await new Promise((resolve, reject) => {
//       setTimeout(() => {
//         reject(new Error("8"));
//       }, 500);
//     });
//   } catch (e) {
//     console.log("error", e.message);
//   }

//   console.log(content);
//   return 4;
// })();

// setTimeout(() => {
//   console.log(result);
// }, 800);

(async function() {
  try {
    for (i = 1; i < 4; i++) {
      await interview(i);
    }
  } catch (e) {
    return console.log("cry at " + e.round);
  }
  console.log("smile");
})();

function interview(round) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve("success");
      } else {
        var error = new Error("fail");
        error.round = round;
        reject(error);
      }
    }, 500);
  });
}

// (async function() {
//   try {
//     await Promise.all([interview(1), interview(2)]);
//   } catch (e) {
//     return console.log("cry at " + e.round);
//   }
//   console.log("smile");
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
