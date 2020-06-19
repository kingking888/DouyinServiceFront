import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入element-ui折叠模块
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition);



// 导入axios
import axios from 'axios'
import qs from 'qs';
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;
Vue.prototype.$notify = axios;



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
