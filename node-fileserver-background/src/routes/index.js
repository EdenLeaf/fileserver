const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller")
const fs = require("fs");
let routes = (app) => {
    router.post("/upload", controller.upload);
    router.get("/files", controller.getListFiles);
    //router.get("/files/:name", controller.getListFiles);
    router.get("/download", controller.download);
    app.use(router);
};
module.exports = routes;