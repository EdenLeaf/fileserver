const util = require("util");
const multer = require("multer");
//const maxSize = 2*1024*1024;
let uploadPath = "G:\\fileServer";
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req,file,cb) => {
        //防止中文乱码
        file.originalname = Buffer.from(file.originalname, 'latin1').toString("utf-8");
        console.log(file.originalname);
        cb(null, file.originalname);
    },
});
let uploadFile = multer({
    storage: storage
    //limits: { fileSize: maxSize },
}).single("file");
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = {
    uploadFile: uploadFileMiddleware,
    uploadPath
};