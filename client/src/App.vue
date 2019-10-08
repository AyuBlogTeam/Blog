<template>
  <div id="app">
    <Header :progressWidth="progress" />
    <main class="main">
      <div class="w70">
        <router-view />
      </div>
      <div class="infoCard">
        <IndexUserInfo />
      </div>
      <div class="clear"></div>
    </main>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IndexUserInfo from "@/components/UserInfo.vue";
import Header from "@/components/Header.vue";
import axios from 'axios'
@Component({
  components: {
    Header,
    IndexUserInfo
  }
})
export default class App extends Vue {
  private progress: number = 0;

  mounted() {
    //获取ip
    axios.get("http://pv.sohu.com/cityjson?ie=utf-8").then((res)=>{
      let data = JSON.parse(res.data.slice(res.data.indexOf("=")+1,res.data.length-1))
      console.log(data.cip)
      console.log(data.cname)
      console.log(data.cid)
    })
    document.addEventListener("scroll", this.scroll);
  }

  private scroll(e: object) {
    const allHeight: number = document.body.clientHeight;
    const scrollHeight: number = document.documentElement.scrollTop;
    const clientHeight: number = document.documentElement.clientHeight;
    this.progress = (scrollHeight / (allHeight - clientHeight)) * 100;
  }
}
</script>
<style scoped lang="stylus">
.main {
  margin: 0 auto;
  display: flex;
}
.infoCard {
  flex: 1;
  margin-left: 1%;
}
@media (min-width: 1440px)
  .main 
    max-width 1232px
@media (max-width: 1439px) and (min-width: 1024px)
  .main 
    max-width: 1024px
</style>