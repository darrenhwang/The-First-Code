var path = require("path");
var fs = require("fs");
var imageinfo = require("imageinfo");

var pathName = "./";
fs.readdir(pathName, function(err, files){
    var dirs = [];
    (function iterator(i){
        if(i == files.length) {
            // console.log(dirs);
            for (let j = 0, l_j = dirs.length; j < l_j; j++) {
                let imgName = dirs[j];
                let fileData = fs.readFileSync(imgName);
                let info = imageinfo(fileData);
                console.log('Name:'+imgName,'--Type:'+info.mimeType,info.format,'--Size:',fileData.length,'bytes',
                    '--Dimensions:',info.width,'--x:'+info.height);
            }
            return ;
        }
        fs.stat(path.join(pathName, files[i]), function(err, data){
            let ext = path.extname(files[i]);
            if(data.isFile() && (ext == '.png' || ext == '.jpg')){
                dirs.push(files[i]);
            }
            iterator(i+1);
        });
    })(0);
});