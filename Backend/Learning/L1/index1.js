let balance = 100;
function withdraw(amt) {
  return new Promise((resolve, reject) => {
    let newBalance = balance - amt;
    if (newBalance >= 0) {
      setTimeout(() => {
        resolve("transaction successfull : " + newBalance);
      }, 1000);
    } else {
      reject("insufficient balance : " + balance);
    }
  });
}

let promise = withdraw(110);
promise
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
