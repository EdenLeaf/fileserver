import http from "../http-common";
class UploadFilesService{
    uploads(file, onUploadProgress){
        let formData = new FormData();
        formData.append("file",file);
        return http.post("/upload",formData,{
            headers: {
                "Content-Type": "multipart/form-data; charset=utf-8"
            },
            responseEncoding: 'utf-8',
            onUploadProgress,
        });
    }
    getFiles(params=null){
        if (!params){
        return http.get("/files");
        }
        else {
            return http.get(`/files?path=${params}`)
        }
    }
}
export default new UploadFilesService();