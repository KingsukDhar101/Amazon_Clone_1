let balance = 100;
function withdraw(amt) {
  return new Promise((resolve, reject) => {
    let newBalance = balance - amt;
    if (newBalance >= 0) {
      setTimeout(() => {
        resolve("transaction successfull : " + newBalance);
      }, 5000);
    } else {
      reject("insufficient balance : " + balance);
    }
  });
}

(async () => {
  try{
    console.log("start");
    let ans = await withdraw(10);
    console.log(ans);
    console.log("end");
  } catch(err){
    console.log(err);
    console.log("end")
  }
})();
