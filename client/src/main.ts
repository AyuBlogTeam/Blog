import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { get, post } from "Common/axios";
import live2d from "live2d-vue";
import VueCookies from "vue-cookies";
import commonUI from "Common/commonUi";

Vue.config.productionTip = false;

import "Iconfont/iconfont.css";
import "Iconfont/iconfont.js";
import "Styles/reset.styl";
import "Styles/styles.styl";
Vue.use(live2d);
Vue.use(VueCookies);
Vue.use(commonUI);
Vue.prototype.$http = {
  get,
  post
};
let rootVm = new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

export default rootVm;
