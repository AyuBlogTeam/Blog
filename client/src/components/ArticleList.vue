<template lang="pug">
  div
    div.oneArticle(v-for="item in articleList",:key="item.articalid")
      h2.title.fl(@click="toArticleDetail(item.title,item.articalid)") {{item.title}}
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
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component
export default class IndexList extends Vue {
  private articleList: object[] = [];

  mounted() {
    this.getArtical();
  }

  private toArticleDetail(name: string, id: string) {
    this.$emit("toArticleDetail", name, id);
  }

  private getArtical() {
    this.$emit("showLoading", true);
    this.$http
      .get(IPserver + "articals/getArtical.php")
      .then((res: object[]) => {
        if (res) {
          this.$emit("showLoading", false);
          this.articleList = res;
        }
      });
  }
}
</script>
<style lang="stylus" scoped>
.oneArticle:hover {
  box-shadow: #ccc 1px 1px 8px;

  img {
    transform-origin: center center;
    transform: scale(1.5);
  }
}

.oneArticle {
  transition: all 0.5s;
  margin-top: 5px;
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #eee;

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

.oneArticle:first-child{
  margin-top:0px;
}
</style>