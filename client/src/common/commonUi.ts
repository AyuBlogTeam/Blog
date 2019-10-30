import Vue from "vue";
import Message from "./ui/message.vue";
import Loading from "./ui/loading.vue";
let MessageConstructor = Vue.extend(Message);
let LoadingConstructor = Vue.extend(Loading);

function showToast(text, type = "error", duration = 3000) {
  const toastDom = new MessageConstructor({
    el: document.createElement("div"),
    data() {
      return {
        isShow: true, // 是否显示
        text: text, // 文本内容
        type: type // 类型
      };
    }
  });
  // 添加节点
  document.body.appendChild(toastDom.$el);
  // 过渡时间
  setTimeout(() => {
    toastDom.isShow = false;
    document.body.removeChild(toastDom.$el);
  }, duration);
}
function showLoading(boo) {
  const loading = new LoadingConstructor({
    el: document.createElement("div")
  });
  loading.$el.setAttribute("id", "loading");
  if (boo) {
    if (!document.getElementById("loading")) {
      document.body.appendChild(loading.$el);
    }
  } else {
    if (document.getElementById("loading")) {
      document.body.removeChild(document.getElementById("loading"));
    }
  }
}
// 全局注册
function registryCommon() {
  Vue.prototype.$Message = showToast;
  Vue.prototype.$showLoading = showLoading;
}

export default registryCommon;
