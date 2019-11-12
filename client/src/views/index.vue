<template lang="pug">
  div
    div.bg
    div.main
      div
        h1 深海之鱼
      div.search
        input(type="text",placeholder="该网站还在开发yo~",v-model="searchContent")
        svg.icon(aria-hidden="true",@click="search")
          use(xlink:href="#icon-sousuo")
      div.poetry
        h2 《素年锦时》 
        p 安妮宝贝 
        p 白茶清欢无别事,我在等风也等你。
        p 苦酒折柳今相离,无风无月也无你。
      div.time(v-if="isShe")
        h1 {{time}}
          span DAYS
      div.username
        h1 {{username}}
      div.footer 蜀ICP备18020911号
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Index extends Vue {
  private time: string = "0";
  private username: string = "AYUPERSON.TOP";
  private searchContent: string = "";
  private isShe: boolean = false;

  mounted() {
    if (this.$cookies.get("city") != null) {
      if (this.$cookies.get("city").indexOf("杭州") != -1) {
        this.isShe = true;
      }
    }
    this.time = (
      (new Date().getTime() - new Date("2016-02-19").getTime()) /
      86400000
    ).toFixed();
    document.addEventListener("keydown", this.keydown);
  }

  destroyed() {
    document.removeEventListener("keydown", this.keydown);
  }

  private keydown(e) {
    if (e.keyCode === 13) {
      this.search();
    }
  }

  private search() {
    this.$router.push({
      name: `search`,
      params: {
        search: this.searchContent
      }
    });
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
    text-align: center;
    letter-spacing: 30px;
    padding-left: 30px;
    color: rgb(131, 175, 155);

    span {
      letter-spacing: 0;
      font-size: 18px;
    }
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
    position: fixed;
    bottom: 30px;
    width: 100%;
    left: 0;

    h1 {
      letter-spacing: 0px;
    }
  }

  .footer {
    width: 100%;
    color: #83af9b;
    position: fixed;
    bottom: 10px;
    text-align: center;
    left: 0px;
  }
}
</style>