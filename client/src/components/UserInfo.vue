<template>
  <div class="card">
    <div class="userinfo">
      <div class="headImg">
        <img src="~Images/fish.svg">
      </div>
      <div class="infoUsername">Ayu</div>
      <div class="infoDesc">
        前端爱好者
      </div>
      <div class="github">
        <span class="iconfont icon-git"></span>
      </div>
    </div>
    <div class="articleList">
      <div class="title">
        <span>
          <svg
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-mulu1" />
          </svg>
        </span>
        <span>目录</span>
        <div class="clear"></div>
      </div>
      <ul>
        <li
          v-for="(item) in articleList"
          :key="item.articalid"
        >
          <a @click="toArticleDetail(item.title,item.articalid)">{{item.title | maxStrLen}}</a></li>
      </ul>
    </div>
    <div class="time">

    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component({
  filters: {
    maxStrLen: (item: string) => {
      if (item && item.length > 20) {
        return item.substr(0, 30) + "...";
      } else {
        return item;
      }
    }
  }
})
export default class componentName extends Vue {
  private articleList: object[] = [];

  mounted() {
    // console.log((new Date().getTime() - new Date("2016-02-19").getTime())/86400000)
    this.getArtical();
  }

  private toArticleDetail(name: string, id: string) {
    this.$emit("toArticleDetail", name, id);
  }

  private getArtical() {
    this.$http
      .get(IPserver + "articals/getArticalList.php")
      .then((res: object[]) => {
        if (res) {
          this.articleList = res;
        }
      });
  }
}
</script>

<style lang="stylus" scoped>
.card {
  height: 100%;

  .userinfo {
    border-radius: 10px;
    background-color: #fff;

    .headImg {
      background-image: url('~Images/user-bg.jpg');
      height: 80px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      margin-bottom: 60px;

      img {
        display: block;
        width: 120px;
        height: 120px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
        transform: translateY(20px);
      }
    }

    .infoUsername {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      text-align: center;
    }

    .infoDesc {
      text-align: center;
      color: #666;
      font-size: 0.7rem;
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }

    .github {
      text-align: center;
      padding: 0.5em;
      border-bottom: 1px solid #eee;

      .iconfont {
        cursor: pointer;
        font-size: 25px;
        transition: color 0.5s;
      }

      .iconfont:hover {
        color: #1e90ff;
      }
    }
  }

  .articleList {
    position: sticky;
    top: 50px;
    border-radius: 10px;
    background-color: #FFF;
    margin-top: 20px;
    padding: 20px;

    .title {
      span {
        display: inline-block;
        float: left;
      }

      span:nth-child(2) {
        line-height: 30px;
      }

      .icon {
        width: 30px;
        height: 30px;
      }
    }

    ul {
      padding-left: 20px;

      li {
        line-height: 30px;
        color: #1e90ff;
        font-size: 14px;
      }
    }
  }
}
</style>