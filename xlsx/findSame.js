const fs = require('fs')
const xlsx = require('node-xlsx')
const path = require("path");
const pathName = "1.0.0\\";
const pathName1 = "1.0.0\\lang\\";
const readline = require('readline');
let fileName = '';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getKeyWords() {
    return new Promise(resolve => {
        rl.question('输入查询关键字：', (name) => {
            resolve(name)
        });
    })
}

async function getInfo() {
    const word = await getKeyWords();
    findSame(word, pathName);
    findSame(word, pathName1, true)
}

getInfo();

function findSame(word, pathName, isLang) {
    fs.readdir(pathName, function (err, files) {
        for (var i = 0; i < files.length; i++) {
            if (path.extname(files[i]) == '.xlsx') {
                fileName = files[i].toString();
                // 读取Excel
                let exceldata = xlsx.parse(pathName + fileName)
                var reg = new RegExp(word);
                let data = exceldata[0]['data']
                for (let j = 0, l_j = data.length; j < l_j; j++) {
                    let temp = data[j];
                    for (let k = 0, l_k = temp.length; k < l_k; k++) {
                        if (typeof temp[k] == "string" && temp[k].match(reg)) {
                            console.log(isLang ? 'lang/' + fileName : fileName, "-----" + temp[k]);
                        }
                    }
                }
            }
        }
    })
}
