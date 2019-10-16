<template>
  <div id="app">
    <Header :progressWidth="progress" />
    <router-view @showLoading="showLoading"></router-view>
    <Loader v-if="loading" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Header from "@/components/Header.vue";
import Loader from "@/components/Loader.vue";
import axios from "axios";
@Component({
  components: {
    Header,
    Loader
  }
})
export default class App extends Vue {
  private loading: boolean = false;
  private progress: number = 0;

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
    this.progress = (scrollHeight / (allHeight - clientHeight)) * 100;
  }

  private getInfo() {
    // this.$http.get(IPserver + "ip/setIp.php")
  }
}
</script>
<style scoped lang="stylus"></style>