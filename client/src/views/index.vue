<template lang="pug">
  div
    div.bg
    div.main
      div
        h1 深海之鱼
      div.search
        input(type="text",placeholder="该网站还在开发哦，程序猿小哥哥非常乐意接收你们的意见哦~")
        svg.icon(aria-hidden="true")
          use(xlink:href="#icon-sousuo")
      div.poetry
        h2 《素年锦时》 
        p 安妮宝贝 
        p 白茶清欢无别事,我在等风也等你。
        p 苦酒折柳今相离,无风无月也无你。
      div.time
        h1 {{time}}
      div.username
        h1 {{username}}
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Index extends Vue {
  private time: string = "";
  private username: string = "AYUPERSON.TOP";

  mounted() {
    this.time = (
      (new Date().getTime() - new Date("2016-02-19").getTime()) /
      86400000
    )
      .toFixed()
      .toString();
  }
}
</script>

<style lang="stylus" scoped>
.bg {
  background-image: url('~Images/indexbg.jpg');
  width: 100vw;
  height: 100vh;
  background-repeat: no-repeat;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: -1;
  background-position: center;
}

.main {
  text-align: center;

  h1 {
    line-height: 100px;
    width: 100%;
    text-align: center;
    letter-spacing: 30px;
    color: rgb(131, 175, 155);
  }

  .search {
    width: 50%;
    height: 36px;
    text-align: center;
    margin: 0 auto;
    position: relative;

    input {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.1);
      color: #fff;
      border: none;
      outline: none;
      padding: 0 0 0 10px;
    }

    svg {
      cursor: pointer;
      width: 30px;
      height: 30px;
      position: absolute;
      right: 0px;
      top: 3px;
    }
  }

  .poetry {
    color: #fff;
  }

  .username {
    h1 {
      letter-spacing: 0px;
    }
  }
}
</style>