<template>
  <section class="allHeader">
    <header class="wrap">
      <div @click="toIndex">
        <span>
          <svg
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-yu1" />
          </svg>
        </span>
        <span>Ayu</span>
      </div>
      <div
        class="bar"
        v-for="(item,index) in menu"
        :key="index"
      >
        <strong>{{item}}</strong>
        <em>{{item}}</em>
      </div>
    </header>
    <div
      class="progress"
      :style="'width:' + progressWidth + '%'"
    ></div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  private menu: string[] = [];

  private toIndex() {
    if (this.$route.name == "home") {
      return;
    }
    this.$router.push({
      name: `homePage`
    });
  }

  @Prop()
  progressWidth: number = 0;
}
</script>

<style scoped lang="stylus">
strong, em {
  display: block;
}

.allHeader {
  position: sticky;
  top: 0;
  background-color: white;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  margin-bottom: 10px;
  overflow: hidden;
  z-index: 1986;

  .wrap {
    width: 1024px;
    margin: 0 auto;
    background: white;
    overflow: hidden;

    div {
      cursor: pointer;
      overflow: hidden;
      float: left;

      span {
        display: inline-block;
        float: left;
      }

      span:nth-child(2) {
        line-height: 46px;
      }

      .icon {
        width: 40px;
        height: 40px;
      }
    }
  }

  .bar {
    cursor: pointer;
    display: block;
    flex: 1;
    text-align: center;
  }

  .progress {
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 132, 255, 0.25);
    width: 0;
    height: 2px;
  }

  .iconfont {
    font-size: 24px;
    margin-right: 10px;
  }
}
</style>
