import Vue from 'vue';
import App from "./App.vue";
import "./components";
import router from './router';
// import store from './store/';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import VueSession from 'vue-session'
import axios from 'axios';


Vue.prototype.$axios = axios;
Vue.use(VueSession)
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router: router,
}).$mount("#app");
