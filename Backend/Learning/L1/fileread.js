let fs = require('fs');
let arr = ["1.txt", "2.txt", "3.txt", "4.txt"];

for(let i=0; i<arr.length; i++){
  fs.readFile(`./files/${arr[i]}`, 'utf8', (err, data)=>{
    if(err){
      console.log(err);
    }else{
      console.log(data)
    }
  });
}