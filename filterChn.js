//过滤ts文件中中文字符
let fs = require("fs");
let path = require("path");
let readline = require("readline");

let curDir = "./"; 
let filePath = path.resolve(`${curDir}`);
let reg = /[\u4e00-\u9fa5]/g; 

function TypeCheck(string) {
    switch (string) {
        case ".ts":
            return true;
        default:
            return false;
    }
}

fs.unlink("./chn.txt", (err => {
    if (err) console.log(err);
    else {
        getAllFile(filePath);
    }
}));
function readFileToArr(fReadName, callback) {
    var fRead = fs.createReadStream(fReadName);
    var objReadline = readline.createInterface({
        input: fRead,
    });
    var arr = new Array();
    objReadline.on("line", function (line) {
        if (line.match(reg)) {
            if(line.indexOf('//')== -1 && line.indexOf('*') == -1)
            // console.log(line)
            arr.push(line.match(reg));
        }
    });
    objReadline.on("close", function () {
        callback(arr);
    });
}

function getAllFile(filePath) {
    fs.readdir(filePath, function (err, files) {
        if (err) {
            // console.warn(err)
        } else {
            files.forEach(function (filename) {
                var filedir = path.join(filePath, filename);
                fs.stat(filedir, function (error, stats) {
                    if (error) {

                    } else {
                        var isFile = stats.isFile(); 
                        var isDir = stats.isDirectory(); 
                        if (isFile) {
                            let bName = path.basename(filedir);
                            let filterArr = ['MomoHideHandler','preload-wing','Preload','UTIL','TextImage','PreloadPage','GCMgr','IndexBg'];
                            for (let j = 0, l_j = filterArr.length; j < l_j; j++) {
                                if(bName.indexOf(filterArr[j])>-1)
                                return;
                            }
                            let fileExtension = filedir.substring(filedir.lastIndexOf("."));
                            if (TypeCheck(fileExtension)) {
                                readFileToArr(filedir, function (data) {
                                    data.forEach((item, index) => {
                                        let txt = `${filename}-${index}` + item.join("") + '\n';
                                        fs.appendFileSync(`chn.txt`,txt,(err)=>{
                                            console.log(txt,'err',err)
                                        });
                                    });
                                });
                            }
                        }
                        if (isDir) {
                            getAllFile(filedir); 
                        }
                    }
                });
            });
        }
    });
}


