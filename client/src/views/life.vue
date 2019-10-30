<template lang="pug">
  div.main
    div.w70
      LifeList(@toLifeDetail="toLifeDetail")
    div.infoCard
      IndexUserInfo(@toArticleDetail="toLifeDetail",:currentComponent="'life'")
    div.clear
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LifeList from "@/components/LifeList.vue";
import IndexUserInfo from "@/components/UserInfo.vue";
@Component({
  components: {
    LifeList,
    IndexUserInfo
  }
})
export default class Index extends Vue {
  private toLifeDetail(id: string) {
    if (this.$route.params.id == id) {
      return;
    }
    this.$router.push({
      name: `lifeDetails`,
      params: {
        id: id
      }
    });
  }
}
</script>

<style lang="stylus" scoped>
.main {
  display: flex;
}
</style>