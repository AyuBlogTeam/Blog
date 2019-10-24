<template lang="pug">
  div#app
    Header(:progressWidth="progress",@showMessageFun="showMessageFun")
    router-view(@showLoading="showLoading",@showMessageFun="showMessageFun")
    Loading(v-show="loading")
    Live2d
    div.backtop(@click="backToTop",v-if="isShowTop")
      svg.icon(aria-hidden="true")
          use(xlink:href="#icon-fanhuidingbu-")
    transition(name="move")
      div.message(v-if="showMessage")
        div.content 
          svg.icon(aria-hidden="true")
            use(xlink:href="#icon-jinggao",v-if="msgType=='warning'")
            use(xlink:href="#icon-chenggong",v-if="msgType=='success'")
            use(xlink:href="#icon-cuowu",v-if="msgType=='error'")
          div {{message}}
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Header from "@/components/Header.vue";
import Loading from "@/components/Loading.vue";
import Live2d from "@/components/Live2d.vue";

import axios from "axios";
@Component({
  components: {
    Header,
    Loading,
    Live2d
  }
})
export default class App extends Vue {
  private loading: boolean = false;
  private progress: number = 0;
  private isShowTop: boolean = false;
  private showMessage: boolean = false;
  private message: string = "";
  private msgType: string = "";

  mounted() {
    this.getInfo();
    document.addEventListener("scroll", this.scroll);
  }

  private showLoading(boo) {
    this.loading = boo;
  }

  private showMessageFun(type, str) {
    this.msgType = type;
    this.showMessage = true;
    this.message = str;
    setTimeout(() => {
      this.showMessage = false;
      this.message = "";
    }, 3000);
  }

  private scroll(e: object) {
    const allHeight: number = document.body.clientHeight;
    const scrollHeight: number = document.documentElement.scrollTop;
    const clientHeight: number = document.documentElement.clientHeight;
    if (scrollHeight > 200) {
      this.isShowTop = true;
    } else {
      this.isShowTop = false;
    }
    this.progress = (scrollHeight / (allHeight - clientHeight)) * 100;
  }

  private backToTop() {
    document.documentElement.scrollTop = 0;
  }

  private getInfo() {
    if (this.$cookies.get("ip") == null) {
      this.$http.get(IPserver + "ip/setIp.php").then(res => {
        if (res) {
          this.$cookies.set("ip", res);
        }
      });
    }
  }
}
</script>
<style scoped lang="stylus">
.backtop {
  position: fixed;
  bottom: 10px;
  right: 10px;
  cursor: pointer;

  .icon {
    width: 50px;
    height: 50px;
  }
}

.message {
  pointer-events: none;
  width: 100%;
  position: fixed;
  top: 16px;
  z-index: 10000;
  text-align: center;
  font-size: 14px;

  .content {
    background: #fff;
    padding: 8px 16px;
    display: inline-block;
    border-radius: 4px;
    color: #515a6e;

    .icon {
      width: 20px;
      height: 20px;
      float: left;
    }

    div {
      float: left;
      margin-left: 2px;
    }
  }
}

.move-enter-active, .move-leave-active {
  transition: all 0.3s;
}

.move-enter, .move-leave-to {
  top: 0;
  opacity: 0;
}
</style>