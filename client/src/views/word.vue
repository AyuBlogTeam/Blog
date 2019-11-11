<template lang='pug'>
  div.main
    div.content
      div.search
        div
          textarea(v-model="board",rows="3",cols="20")
          svg.icon(aria-hidden="true",@click="liveBoard")
            use(xlink:href="#icon-TIFFANYSROOM_huaban")
      div.list
        div.oneWord(v-for="item in list",:key="item.key")
          div.htmlContent.fl {{item.content}}
            div.underline
          div.clear
          div.grey.fr {{item.time}}
          div.grey.fr(style="margin-right:10px") {{item.username}}
          div.clear
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component
export default class componentName extends Vue {
  private board: string = "";
  private list: object[] = [];
  private count: number = 0;
  private hasMore: boolean = true;

  mounted() {
    this.getInfo();
    document.addEventListener("scroll", this.scroll);
  }

  beforeDestroy() {
    document.removeEventListener("scroll", this.scroll);
  }

  private scroll(e) {
    const allHeight: number = document.body.clientHeight;
    const scrollHeight: number = document.documentElement.scrollTop;
    const clientHeight: number = document.documentElement.clientHeight;
    if (scrollHeight / (allHeight - clientHeight) >= 1) {
      if (this.hasMore) {
        this.count++;
        this.getInfo();
      }
    }
  }

  private liveBoard() {
    if (this.board === "") {
      this.$Message("请先输入内容哟", "warning");
      return;
    }
    this.$http
      .get(IPserver + "live2d/addLive2d.php", {
        content: this.board,
        ip: this.$cookies.get("ip"),
        username: "匿名用户"
      })
      .then(res => {
        this.$Message("操作成功", "success");
        this.count = 0;
        this.board = "";
        this.list = [];
        this.getInfo();
      });
  }

  private getInfo() {
    this.$http
      .get(IPserver + "live2d/getLive2ds.php", { from: this.count * 10 })
      .then((res: object[]) => {
        if (res) {
          if (res.length === 0) {
            this.hasMore = false;
            return;
          }
          res.map(item => {
            this.list.push(item);
          });
        }
      });
  }
}
</script>
<style lang='stylus' scoped>
.main {
  display: flex;

  .content {
    width: 100%;
    background: #fff;
  }

  .search {
    background: #fff;
    width: 100%;

    div {
      width: 50%;
      text-align: center;
      margin: 0 auto;
      position: relative;
      margin-top: 20px;
      margin-bottom: 20px;

      textarea {
        resize: none;
        width: 100%;
        color: #999;
        border-radius: 4px;
        border: 1px solid #d9d9d9;
        padding: 10px;
        transition: all 0.3s;
      }

      textarea:hover, input:focus {
        border-color: #40a9ff;
        border-right-width: 1px !important;
      }

      svg {
        cursor: pointer;
        width: 30px;
        height: 30px;
        position: absolute;
        right: -10px;
        top: 3px;
      }
    }
  }

  .list {
    .oneWord:hover {
      box-shadow: #ccc 1px 1px 8px;
    }

    .oneWord {
      transition: all 0.5s;
      padding: 20px;
      background-color: #fff;
      border-bottom: 5px solid #eee;

      .htmlContent {
        font-size: 18px;
        margin-bottom: 15px;
        cursor: pointer;
        color: #1a1a1a;
        transition: all 0.5s;
      }

      .htmlContent:hover {
        color: #c8c86d;

        .underline {
          width: 100%;
        }
      }
    }

    .oneWord:first-child {
      border-top: 5px solid #eee;
    }
  }
}
</style>