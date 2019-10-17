<template lang="pug">
  section.allHeader(:class="current!=0?'inHeader':''")
    header.wrap
      div(@click="toRotate(0)")
        span
          svg.icon(aria-hidden="true")
            use(xlink:href="#icon-yu1")
        span Ayu
      ul.banner
        li(:class="current==0?'active':''",@click="toRotate(0)") 首页
        li(:class="current==1?'active':''",@click="toRotate(1)") 文章
        li(:class="current==2?'active':''",@click="toRotate(2)") 生活
      a 反馈
      div.bar(v-for="(item,index) in menu",:key="index")
        strong {{item}}
        em {{item}}
    div.progress(:style="'width:' + progressWidth + '%'")
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  private current: number = 0;
  private menu: string[] = [];

  mounted() {
    const pname = window.location.pathname;
    if (pname.indexOf("/article") != -1) {
      this.current = 1;
    } else {
      this.current = 0;
    }
  }

  private toRotate(index: number) {
    this.current = index;
    switch (index) {
      case 0:
        if (this.$route.name == "homePage") {
          return;
        }
        this.$router.push({
          name: `homePage`
        });
        break;
      case 1:
        if (this.$route.name == "article") {
          return;
        }
        this.$router.push({
          name: `article`
        });
        break;
      case 2:
        if (this.$route.name == "article") {
          return;
        }
        this.$router.push({
          name: `article`
        });
        break;
      default:
        break;
    }
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
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  top: 0;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  margin-bottom: 10px;
  overflow: hidden;
  z-index: 1986;
  height: 57px;

  .wrap {
    width: 1024px;
    margin: 0 auto;
    overflow: hidden;

    .banner {
      float: left;
      overflow: hidden;

      li {
        float: left;
        font-size: 16px;
        cursor: pointer;
        padding: 0 20px;
        transition: color 0.5s;
      }

      li:hover {
        color: rgb(200, 200, 109);
      }

      li.active {
        color: rgb(200, 200, 109);
      }
    }

    a {
      line-height: 57px;
      float: right;
    }

    div {
      cursor: pointer;
      overflow: hidden;
      float: left;
      margin-top: 5px;

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

.inHeader {
  background: #fff;
  color: #000;
}
</style>
