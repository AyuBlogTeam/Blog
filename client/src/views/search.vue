<template lang="pug">
  div.main
    div.search
      div
        input(type="text",placeholder="请输入您的搜索内容",v-model="searchContent")
        svg.icon(aria-hidden="true",@click="search")
          use(xlink:href="#icon-sousuo")
    div.list(v-if="searchResult.length!=0")
      div.oneArticle(v-for="item in searchResult",:key="item.articalid")
        div(v-if="item.summary")
          h2.title.fl(@click="toLifeDetail(item.articalid,item.label)") {{item.title}}
            div.underline
          div.clear
          div.richContent
            div.pic
              img(:src="item.coverimg")
            div.info
              p {{item.summary}}
          div.footArticle
            p.fl.grey {{item.kind}}
            p.fr.grey {{item.time}}
            p.clear
        div(@click="toLifeDetail(item.articalid,item.label,item.content)",v-if="!item.summary")
          h2.title.fl
            div(v-html="item.title")
          div.clear
          p.fr.grey {{item.time}}
          p.clear
    div.noresult(v-if="noResult")
      svg.icon(aria-hidden="true")
        use(xlink:href="#icon-meiyousousuojieguo")
      p 没有找到您的搜索内容
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class Index extends Vue {
  private noResult: boolean = false;
  private searchContent: string = "";
  private searchResult: object[] = [];

  mounted() {
    if (this.$route.params.search) {
      this.searchContent = this.$route.params.search;
      this.search();
    }
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

  private toLifeDetail(id: string, label: string, content: string) {
    switch (label) {
      case "artical":
        this.$router.push({
          name: `articleDetails`,
          params: {
            id: id
          }
        });
        break;
      case "journal":
        this.$router.push({
          name: `lifeDetails`,
          params: {
            id: id
          }
        });
        break;
      case "record":
        this.$router.push({
          name: `lifeDetails`,
          params: {
            id: id
          }
        });
        this.$cookies.set("content", content);
        break;
      default:
        break;
    }
  }

  private search() {
    if (this.searchContent === "") {
      this.$Message("请输入搜索内容", "warning");
      return;
    }
    this.searchResult = [];
    this.noResult = false;
    this.$showLoading(true);
    this.$http
      .post(IPserver + "search/search.php", {
        search: this.searchContent
      })
      .then(res => {
        if (res === null) {
          this.noResult = true;
        } else {
          res.map(item => {
            if (item.content) {
              if (item.content.length >= 30) {
                item.title = item.content.substr(0, 30) + "...";
              } else {
                item.title = item.content;
              }
            }
            this.searchResult.push(item);
          });
        }
        this.$showLoading(false);
      });
  }
}
</script>

<style lang="stylus" scoped>
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 87px);
  background: #fff;

  .search {
    background: #fff;
    width: 100%;

    div {
      width: 50%;
      height: 36px;
      text-align: center;
      margin: 0 auto;
      position: relative;
      margin-top: 20px;
      margin-bottom: 20px;

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

  .noresult {
    text-align: center;
    margin-top: 50px;
  }

  .list {
    .oneArticle:hover {
      box-shadow: #ccc 1px 1px 8px;

      img {
        transform-origin: center center;
        transform: scale(1.5);
      }
    }

    .oneArticle {
      transition: all 0.5s;
      padding: 20px;
      background-color: #fff;
      border-bottom: 5px solid #eee;

      .title {
        font-size: 18px;
        margin-bottom: 15px;
        cursor: pointer;
        color: #1a1a1a;
        transition: all 0.5s;
      }

      .title:hover {
        color: #c8c86d;

        .underline {
          width: 100%;
        }
      }

      .richContent {
        display: flex;
        flex-direction: row;
        align-items: stretch;

        .pic {
          border-radius: 5px;
          position: relative;
          text-align: center;
          width: 190px;
          height: 105px;
          margin-right: 20px;
          overflow: hidden;

          img {
            height: 100%;
            object-fit: cover;
            transition: all 0.5s;
          }
        }

        .info {
          flex: 1;
          line-height: 1.5;

          p {
            word-break: break-word;
            line-height: 1.6;
          }
        }
      }

      .footArticle {
        margin-top: 20px;
      }
    }

    .oneArticle:first-child {
      border-top: 5px solid #eee;
    }
  }
}
</style>