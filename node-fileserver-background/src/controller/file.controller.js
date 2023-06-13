var fs = require("fs")
let {uploadFile, uploadPath} = require("../middleware/upload")
const readline = require("readline");
const {query} = require("express");
const upload = async (req,res) => {
    try {
        await uploadFile(req,res);
        res.setHeader('Content-type','application/json; charset=utf-8');
        if (req.file == undefined){
            return res.status(400).send({ message: "请选择要上传的文件" });
        }
        res.status(200).send({ message: `文件上传成功:${req.file.originalname}`,});
    } catch (err){
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({ message: "文件大小超过限制" ,});
        }
        res.status(500).send({
            message: `无法上传文件: ${req.file.originalname}. ${err}`,
        });
    }
};

const getListFiles = (req, res) => {
    let file = req.query.path;
    console.log(file);
    let dirPath=uploadPath;
    if (file !== undefined||null) {
        dirPath = uploadPath+`\\${file}`;
    }
    console.log(dirPath)
    fs.readdir(dirPath,function (err, files){
        if (err) {
            res.status(500).send({
                message: "没有找到文件.",
            });
        }
        let fileInfos = [];
        files.forEach((file) => {
            const state = fs.statSync(dirPath + `\\${file}`);
            const url = dirPath.split(uploadPath)[1]+`\\${file}`;
            if (state.isFile()){
                fileInfos.push({
                    name: file,
                    url:  url,
                    size: getFileSize(state.size),
                    time: state.mtime.toLocaleString(), //文件最近一次状态变动的时间戳
                });
            }else if (state.isDirectory()){
                fileInfos.push({
                    name: file,
                    url: url,
                    size: null,
                    time: state.mtime.toLocaleString(),
                })
            }

        });
        res.status(200).send(fileInfos);
    });
};

function getFileSize(size) {
    if(size < 1024*1024){
        return (size/1024).toFixed(2)+'KB'
    }else if(size >= 1024*1024&&size<Math.pow(1024, 3)){
        return (size/1024.0/1024).toFixed(2)+'MB'
    }else{
        return (size/1024.0/1024/1024).toFixed(2)+'GB'
    }
}

const download = (req, res) => {
/*    const fileName = req.params.name;
/!*    res.download(`${uploadPath}\\${fileName}`, fileName, (err) => {  文件稍大会报错
            if (err){
                res.status(500).send({
                    message: "无法获取文件." + err,
                });
            }
    });*!/
    const filePath = `${uploadPath}\\${fileName}`;
    console.log(fileName);
    res.attachment(filePath);
    res.sendFile(filePath);*/
    let filePath = req.query.path;
    filePath = uploadPath+'\\'+filePath;
    res.attachment(filePath);
    res.sendFile(filePath);
};

module.exports = {
    upload,
    getListFiles,
    download,
};