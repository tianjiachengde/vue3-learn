import { createApp } from 'vue';
import App from './App.vue';
import router  from '@/router'
import store from "@/store";
/* 导入VANT */
import Vant, { Lazyload } from 'vant';
import 'amfe-flexible';
import '@/assets/reset.min.css';
import 'vant/lib/index.css';
/* 处理最大宽度 */
import { handleMaxWidth } from '@/assets/utils';
handleMaxWidth();
window.addEventListener('size', handleMaxWidth);

const app = createApp(App);
app.use(router)
app.use(store)
app.use(Vant);
app.use(Lazyload, {
    lazyComponent: true
});
app.mount('#app');