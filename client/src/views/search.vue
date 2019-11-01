<template lang="pug">
  div.main
    div.search
      input(type="text",placeholder="该网站还在开发yo~")
      svg.icon(aria-hidden="true",@click="search")
        use(xlink:href="#icon-sousuo")
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Index extends Vue {
  private search() {}
}
</script>

<style lang="stylus" scoped>
.main {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: #fff;

  .search {
    width: 50%;
    height: 36px;
    text-align: center;
    margin: 0 auto;
    position: relative;
    margin-top: 20px;

    input {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.1);
      color: #999;
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
}
</style>