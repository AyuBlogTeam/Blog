<template lang="pug">
  div#app
    Header(:progressWidth="progress")
    router-view
    Live2d
    div.backtop(@click="backToTop",v-if="isShowTop")
      svg.icon(aria-hidden="true")
          use(xlink:href="#icon-fanhuidingbu-")
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import Header from "@/components/Header.vue";
import Live2d from "@/components/Live2d.vue";

import axios from "axios";
@Component({
  components: {
    Header,
    Live2d
  }
})
export default class App extends Vue {
  private progress: number = 0;
  private isShowTop: boolean = false;

  mounted() {
    this.getInfo();
    document.addEventListener("scroll", this.scroll);
  }

  private scroll(e: object) {
    const allHeight: number = document.body.clientHeight;
    const scrollHeight: number =
      document.documentElement.scrollTop || document.body.scrollTop;
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
    document.body.scrollTop = 0;
  }

  private getInfo() {
    if (this.$cookies.get("ip") == null) {
      axios.get(IPserver + "ip/setIp.php").then(res => {
        if (res.data != "") {
          this.$cookies.set("ip", res.data.data.ip, 60 * 60);
          this.$cookies.set("city", res.data.data.city, 60 * 60);
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
</style>