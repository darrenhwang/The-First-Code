const fs = require('fs')
const xlsx = require('node-xlsx')
const nodeExcel = require('excel-export')
 
// 读取Excel
let exceldata = xlsx.parse('./' + 'trans.xlsx')
let exportData = []
for (let rowId in exceldata[0]['data']) {
    let row = exceldata[0]['data'][rowId]
    exportData.push(row)
}
 
// 导出Excel
let conf = {} // excel配置
conf.name = 'sheet' //表格名
// 列名和类型
conf.cols = [
    {
        caption: '列名',
        type: 'string',
    },
]
 
let excelData = new Array()
for (var i = 0; i < exportData.length; i++) {
    let arr = new Array()
    arr.push(exportData[i])
    excelData.push(arr)
}
conf.rows = excelData
let result = nodeExcel.execute(conf)
let path = `${__dirname}/exportdata.xlsx`
fs.writeFile(path, result, 'binary', (err) => {
    err ? console.log(err) : null
})