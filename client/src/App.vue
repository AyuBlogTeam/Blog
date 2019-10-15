<template>
  <div id="app">
    <Header :progressWidth="progress" />
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Header from "@/components/Header.vue";
import axios from "axios";
@Component({
  components: {
    Header
  }
})
export default class App extends Vue {
  private progress: number = 0;

  mounted() {
    this.getInfo();
    document.addEventListener("scroll", this.scroll);
  }

  private scroll(e: object) {
    const allHeight: number = document.body.clientHeight;
    const scrollHeight: number = document.documentElement.scrollTop;
    const clientHeight: number = document.documentElement.clientHeight;
    this.progress = (scrollHeight / (allHeight - clientHeight)) * 100;
  }

  private getInfo() {
    // this.$http.get(IPserver + "ip/setIp.php")
  }
}
</script>
<style scoped lang="stylus">
@media (min-width: 1440px) {
  .main {
    max-width: 1232px;
  }
}

@media (max-width: 1439px) and (min-width: 1024px) {
  .main {
    max-width: 1024px;
  }
}
</style>