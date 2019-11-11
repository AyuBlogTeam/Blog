<template lang="pug">
  section.allHeader(:class="current!=0?'inHeader':''")
    header.wrap
      div.logo(@click="toRotate(0)")
        span
          svg.icon(aria-hidden="true")
            use(xlink:href="#icon-yu1")
        span Ayu
      div.headMenu
        ul.banner
          li(:class="current==0?'active':''",@click="toRotate(0)") 首页
            div.underline
          li(:class="current==1?'active':''",@click="toRotate(1)") 文章
            div.underline
          li(:class="current==2?'active':''",@click="toRotate(2)") 生活
            div.underline
          li(:class="current==3?'active':''",@click="toRotate(3)") 搜索
            div.underline
          li(:class="current==4?'active':''",@click="toRotate(4)") 句子
            div.underline
        a(@click="showFeedbackFun") 反馈
      div.phone(@click="showPhoneMenu")
        span
          svg.icon(aria-hidden="true")
            use(xlink:href="#icon-_caidan")
      transition(name="fade")
        div.phoneMenu(v-if="phoneMenu")
          div(@click="toRotate(0)")
            svg.icon(aria-hidden="true")
              use(xlink:href="#icon-shouye")
          div(@click="toRotate(1)")
            svg.icon(aria-hidden="true")
              use(xlink:href="#icon-wenzhangchaxun")
          div(@click="toRotate(2)")
            svg.icon(aria-hidden="true")
              use(xlink:href="#icon-shenghuo")
          div(@click="toRotate(3)")
            svg.icon(aria-hidden="true")
              use(xlink:href="#icon-sousuo")
          div(@click="showFeedbackFun")
            svg.icon(aria-hidden="true")
              use(xlink:href="#icon-fankuipingjia")
    div.progress(:style="'width:' + progressWidth + '%'")
    transition(name="fade")
      div.feedback(v-if="showFeedback")
        div.content
          svg.icon(aria-hidden="true",@click="showFeedback=false")
            use(xlink:href="#icon-guanbi")
          div.header
            div.headerContent 反馈
          div.feedbackContent
            textarea(v-model="feedback",rows="7",placeholder="有任何建议和意见都可以随便提出来，本反馈实行匿名制，所以程序猿小哥哥无法联系到你哟，有需要的话可以在反馈中留下你的联系方式。")
          div.footer
            button(@click="feedbackToSql") 确定
            button.cancel(@click="showFeedback=false") 取消
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class Header extends Vue {
  private current: number = 0;
  private feedback: string = "";
  private showFeedback: boolean = false;
  private phoneMenu: boolean = false;

  mounted() {
    this.getPath();
  }

  private getPath() {
    const pname = window.location.pathname;
    if (pname.indexOf("/article") != -1) {
      this.current = 1;
    } else if (pname.indexOf("/life") != -1) {
      this.current = 2;
    } else if (pname.indexOf("/search") != -1) {
      this.current = 3;
    } else if (pname.indexOf("/word") != -1) {
      this.current = 4;
    } else {
      this.current = 0;
    }
  }

  private toRotate(index: number) {
    this.phoneMenu = false;
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
        if (this.$route.name == "life") {
          return;
        }
        this.$router.push({
          name: `life`
        });
        break;
      case 3:
        if (this.$route.name == "search") {
          return;
        }
        this.$router.push({
          name: `search`
        });
        break;
      case 4:
        if (this.$route.name == "word") {
          return;
        }
        this.$router.push({
          name: `word`
        });
        break;
      default:
        break;
    }
  }

  private showFeedbackFun() {
    this.phoneMenu = false;
    this.showFeedback = true;
    this.feedback = "";
  }

  private feedbackToSql() {
    if (this.feedback == "") {
      this.$Message("请输入反馈内容", "warning");
      return;
    }
    this.$http
      .post(IPserver + "feedback/addFeedback.php", {
        ip: this.$cookies.get("ip"),
        content: this.feedback
      })
      .then(res => {
        if (res) {
          this.$Message("反馈成功", "success");
          this.feedback = "";
          this.showFeedback = false;
        }
      });
  }

  private showPhoneMenu() {
    this.phoneMenu = !this.phoneMenu;
  }

  @Prop()
  progressWidth: number = 0;

  @Watch("$route")
  routeChange() {
    this.getPath();
  }
}
</script>

<style scoped lang="stylus">
strong, em {
  display: block;
}

.allHeader {
  position: fixed;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  top: 0;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  margin-bottom: 10px;
  z-index: 1986;
  overflow: hidden;
  height: 57px;

  .wrap {
    padding: 0 20px;
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

        .underline {
          margin-top: 5px;
        }
      }

      li:hover {
        color: rgb(200, 200, 109);

        .underline {
          width: 100%;
        }
      }

      li.active {
        color: rgb(200, 200, 109);
      }
    }

    .phone {
      display: none;
      float: right;
      margin-top: 5px;

      .icon {
        width: 40px;
        height: 40px;
      }
    }

    .phoneMenu {
      position: fixed;
      float: right;
      margin-top: 5px;
      padding: 20px;
      right: 0;
      top: 37px;

      .icon {
        width: 40px;
        height: 40px;
      }
    }

    a {
      line-height: 57px;
      float: right;
    }

    .logo {
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
    cursor: pointer;
  }

  .iconfont {
    font-size: 24px;
    margin-right: 10px;
  }

  .feedback {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(0, 0, 0, 0.5);

    .content {
      position: absolute;
      width: 500px;
      height: 300px;
      background: #fff;
      color: #000;
      top: 50%;
      margin-top: -150px;
      margin-left: -250px;
      left: 50%;
      border-radius: 10px;

      .icon {
        width: 25px;
        height: 25px;
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
        transform: scale(0.7);
      }

      .header {
        border-bottom: 1px solid #e8eaec;
        padding: 14px 16px;
        line-height: 1;

        .headerContent {
          display: inline-block;
          width: 100%;
          height: 20px;
          line-height: 20px;
          font-size: 16px;
          color: #17233d;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .feedbackContent {
        padding: 20px;
        height: 150px;
        overflow: hidden;
        border-bottom: 1px solid #e8eaec;

        textarea {
          border-radius: 5px;
          width: 100%;
          resize: none;
          border: 1px solid #dcdee2;
          font-size: 14px;
          transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }

        textarea:focus, textarea:hover {
          border-color: #57a3f3;
        }
      }

      .footer {
        button {
          height: 32px;
          padding: 0 15px;
          font-size: 14px;
          border-radius: 4px;
          border: 1px solid transparent;
          white-space: nowrap;
          color: #fff;
          background-color: #2d8cf0;
          border-color: #2d8cf0;
          float: right;
          margin-right: 20px;
          margin-top: 10px;
        }

        .cancel {
          color: #515a6e;
          background-color: transparent;
          border-color: transparent;
        }
      }
    }
  }
}

.inHeader {
  background: #fff;
  color: #000;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
