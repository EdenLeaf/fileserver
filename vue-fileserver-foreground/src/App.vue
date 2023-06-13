<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <div id="app">
      <div class="container" style="width: 100%;">
          <div style="margin: 20px">
              <h2>文件服务器</h2>
          </div>
          <upload-files></upload-files>
      </div>
  </div>
</template>

<script>
import UploadFiles from "@/components/UploadFiles.vue";

export default {
  name: 'App',
  components: {
      UploadFiles
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
