const fs = require('fs')
const xlsx = require('node-xlsx')
const path = require("path");
const pathName = "./";
let fileName = '';
fs.readdir(pathName, function(err, files) {
    for (var i = 0; i < files.length; i++) {
        if(path.extname(files[i]) == '.xlsx' && path.basename(files[i],'.xlsx') != "result"){
            fileName = files[i].toString();
            // 读取Excel
            let exceldata = xlsx.parse('./' + fileName)
            let exportData = []
            for (let rowId in exceldata[0]['data']) {
                let row = exceldata[0]['data'][rowId]
                exportData.push(row)
            }
            let tempData = []
            for (var i = 0; i < exportData.length; i++) {
                let temp = exportData[i]
                if(i == 0){
                    temp.splice(1,0,'文件夹');
                    tempData.push(temp)
                }else{
                    let tp = [];
                    let tt = typeof temp[1] == 'string' ? temp[1].split('-') : ['',''];
                    tp[0] = temp[0];
                    tp[1] = 'ui_'+tt[0];
                    tp[2] = tt[1];
                    tp[3] = temp[2];
                    tempData.push(tp)
                }
            }
            var data = [
                {
                    name : 'sheet1',
                    data : tempData
                }
            ]
            var buffer = xlsx.build(data);
            fs.writeFile('./result.xlsx', buffer, function (err) {
                    if (err)
                        throw err;
                    console.log('Write to xlsx has finished');
// 读xlsx
                    var obj = xlsx.parse("./" + "result.xlsx");
                    console.log(JSON.stringify(obj));
                }
            );

        }
    }
})

