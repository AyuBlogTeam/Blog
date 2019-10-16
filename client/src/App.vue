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

  private list: string[] = [
    "chitose",
    "epsilon2_1",
    "gf",
    "haru_1",
    "haru_2",
    "haruto",
    "hibiki",
    "hijiki",
    "izumi",
    "koharu",
    "miku",
    "ni-j",
    "nico",
    "nietzsche",
    "nipsilon",
    "nito",
    "shizuku",
    "tororo",
    "tsumiki",
    "unitychan",
    "wanko",
    "z16"
  ];

  mounted() {
    this.getInfo();
    document.addEventListener("scroll", this.scroll);
  }

  created() {
    setTimeout(() => {
      window.L2Dwidget.on('*',(name)=>{
        console.log(name)
      }).init({
        dialog:{
          enable:true,
          script: {
              mouseover:[
                {
                  selector:"#live2d-widget #live2dcanvas",
                  text:[
                    "干嘛呢你，快把手拿开～～",
                    "鼠…鼠标放错地方了！",
                    "你要干嘛呀？",
                    "喵喵喵？",
                    "怕怕(ノ≧∇≦)ノ",
                    "非礼呀！救命！",
                    "这样的话，只能使用武力了！",
                    "我要生气了哦",
                    "不要动手动脚的！",
                    "真…真的是不知羞耻！",
                    "Hentai！"
                  ]
                }
              ]
            }
        },
        pluginRootPath: "/live2dw/",
        pluginJsPath: "lib/",
        pluginModelPath: "live2d-widget-model-miku/assets/",
        tagMode: false,
        debug: false,
        model: {
          jsonPath: "/live2dw/live2d-widget-model-miku/assets/miku.model.json"
        },
        display: { position: "left", width: 150, height: 300 },
        mobile: { show: false },
        log: false
      });
    }, 1000);
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
<style scoped lang="stylus">
</style>