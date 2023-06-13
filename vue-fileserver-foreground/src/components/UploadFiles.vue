<template>
  <div>
      <div style="padding-inline: 15%; margin-bottom: 10px">
      <a-upload
          v-model:file-list="fileList"
          :multiple="true"
          :custom-request="customRequest">
          <a-button>
              <upload-outlined></upload-outlined>
              Upload
          </a-button>
      </a-upload>
      </div>
      <div style="width: 85%; margin: auto">
          <div class="head">文件列表</div>
          <a-table :data-source="fileInfos" :row-key="record => record.key" :columns="columns" :pagination="false" :empty-text="{empty}">
              <template #bodyCell="{column,record}">
                  <template v-if="column.key === 'name' && record.size!=null">
                      <a :href="`${baseUrl}download?path=${record.url}`">{{ record.name }}</a>
                  </template>
                  <template v-else-if="column.key==='name' && record.size === null">
                      <a @click="getDir(record.url)">{{record.name}}</a>
                  </template>
              </template>
          </a-table>
      </div>
  </div>
</template>

<script>
import UploadService from "@/services/UploadFilesService";
import http from "@/http-common";
import {UploadOutlined} from "@ant-design/icons-vue";
const columns = [
    {
        title: '文件',
        dataIndex: 'name',
        key: 'name',
        sorter: {
            compare: (a, b) => {
                if (a.name && b.name){
                    //按首字母排序
                    return a.name.localeCompare(b.name)
                }
            },
        },
    },
    {
        title: '大小',
        dataIndex: 'size',
        key: 'size',
        sorter: {
            compare:(a, b) => {
                if(a.size && b.size){
                    const B = ['KB','MB','GB'];
                    const an = B.indexOf(a.size.substring(a.size.length-2));
                    const bn = B.indexOf(b.size.substring(b.size.length-2));
                    if (an !== bn){
                        console.log(a.size.substring(a.size.length-2),an,b.size.substring(b.size.length-2),bn)
                        return an > bn?1:-1;
                    }else {
                        return parseFloat(a.size) > parseFloat(b.size)?1:-1;
                    }
                }else {
                    return a.size==null?1:-1;
                }
            }
        }
    },
    {
        title: '修改日期',
        dataIndex: 'time',
        key: 'time',
        sorter: {
            compare:(a ,b) => {
                const at = new Date(a.time);
                const bt = new Date(b.time);
                return at - bt;
            },
        }
    }
]
const progress = {
    strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
    },
    strokeWidth: 30,
    format: percent => `${parseFloat(percent.toFixed(2))}%`,
    class: 'test',
};
const baseUrl = http.defaults.baseURL;
export default {
    name: "UploadFiles",
    components:{
        UploadOutlined
    },

    data(){
        return{
            selectedFiles: undefined,
            progressInfos: [],
            message: "",
            fileInfos: [],
            baseUrl: baseUrl,
            fileList: [],
            columns,
            empty: "--",
            progress,
        };

    },
    methods: {
        customRequest(file){
            let progress = {percent: 1};
            UploadService.uploads(file.file,event =>{
                progress = {percent: (Math.round((event.loaded/event.total)*100))};
                file.onProgress(progress);
            }).then(res =>{
                if (res.status===200){
                    file.onSuccess(res, file.file);
                    file.status = 'done';
                    UploadService.getFiles().then(res => {
                        this.fileInfos = res.data
                    })
                } else {
                    file.onError();
                    file.status = 'error';
                }
            })
        },
        getDir(params){
            UploadService.getFiles(params).then((response) => {
                this.fileInfos = response.data;
            })
        },
    },

    mounted() {
        UploadService.getFiles().then((response) => {
            this.fileInfos = response.data;
        });
    }
};
</script>

<style scoped>
.head{
    font-size: 18px;
}
</style>