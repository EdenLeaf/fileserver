import { createApp } from 'vue'
import App from './App.vue'
import {Table, Button, Progress, Upload} from "ant-design-vue";
import 'ant-design-vue/lib/table/style/css';
import 'ant-design-vue/lib/progress/style/css';

const app = createApp(App);
app.use(Upload);
app.use(Progress);
app.use(Button);
app.use(Table);
app.mount('#app')
