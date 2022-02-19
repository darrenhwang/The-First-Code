/*
* 文件重命名
*/
const fs = require('fs');
let path = './';
let files = fs.readdirSync(path);
// console.log(files);

for (let i = 0; i < files.length; i++)
{
  fs.readFile(`${path}/${files[i]}`, function (err, data) {
    let index = files[i].indexOf('0'),newName = '';
    if(index>-1){
      newName = files[i].slice(1).toUpperCase()
      console.log(newName,'--')
    }
    fs.rename(`${path}/${files[i]}`, `${path}/${newName}`, err => {
      console.log(err);
    })
    
  })
}