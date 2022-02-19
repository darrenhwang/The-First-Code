const fs = require('fs')
const xlsx = require('node-xlsx')
const nodeExcel = require('excel-export')
const { isTypedArray } = require('util/types')
 
// 读取Excel
let exceldata = xlsx.parse('./' + '111.xlsx')
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
        let tt = temp[1].split('-');  
        tp[0] = temp[0];
        tp[1] = tt[0];
        tp[2] = tt[1];
        tp[3] = temp[2];
    }
}
 
// // 导出Excel
// let conf = {} // excel配置
// conf.name = 'sheet' //表格名
// // 列名和类型
// conf.cols = [
//     {
//         caption: '列名',
//         type: 'string',
//     },
// ]
 
// let excelData = new Array()
// for (var i = 0; i < exportData.length; i++) {
//     let arr = new Array()
//     arr.push(exportData[i])
//     excelData.push(arr)
// }
// conf.rows = excelData
// let result = nodeExcel.execute(conf)
// let path = `${__dirname}/exportdata.xlsx`
// fs.writeFile(path, result, 'binary', (err) => {
//     err ? console.log(err) : null
// })