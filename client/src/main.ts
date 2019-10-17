import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { get, post } from "Common/axios";
import live2d from "live2d-vue";

Vue.config.productionTip = false;
Vue.prototype.$http = {
  get,
  post
};

import "Iconfont/iconfont.css";
import "Iconfont/iconfont.js";
import "Styles/reset.styl";
import "Styles/styles.styl";
Vue.use(live2d);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
