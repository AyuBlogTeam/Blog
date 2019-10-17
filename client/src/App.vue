<template lang="pug">
  div#app
    Header(:progressWidth="progress")
    router-view(@showLoading="showLoading")
    Loader(v-show="loading")
    Live2d
    div.backtop(@click="backToTop",v-if="isShowTop")
      svg.icon(aria-hidden="true")
          use(xlink:href="#icon-fanhuidingbu-")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Header from "@/components/Header.vue";
import Loader from "@/components/Loader.vue";
import Live2d from "@/components/Live2d.vue";

import axios from "axios";
@Component({
  components: {
    Header,
    Loader,
    Live2d
  }
})
export default class App extends Vue {
  private loading: boolean = false;
  private progress: number = 0;
  private isShowTop: boolean = false;

  mounted() {
    this.getInfo();
    document.addEventListener("scroll", this.scroll);
  }

  private showLoading(boo) {
    this.loading = boo;
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
    // this.$http.get(IPserver + "ip/setIp.php")
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
</style>