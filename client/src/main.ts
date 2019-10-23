import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { get, post } from "Common/axios";
import live2d from "live2d-vue";
import VueCookies from "vue-cookies";

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
Vue.use(VueCookies);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
