<template lang='pug'>
  div#live2d
    div.live2d-panel
      //- dialogue(v-if="isDialogue" :customDialogue="customDialogue")
      live2d(v-if="islive2d" :width=300 :height=400 :modelPath="'/live2dw/live2d-widget-model-' + modelArr[5] + '.json'")
</template>
<script lang='ts'>
// 5 6 7 8 9 10 17 18 19 20 21
// 5 7 9 10 17 20
import custom from "Common/custom";

import { Component, Vue } from "vue-property-decorator";
@Component
export default class componentName extends Vue {
  // private customDialogue: object = custom;
  private islive2d: boolean = true;
  // private isDialogue: boolean = true;
  private modelArr: string[] = [
    "haruto/assets/haruto.model",
    "hibiki/assets/hibiki.model",
    "hijiki/assets/hijiki.model",
    "izumi/assets/izumi.model",
    "koharu/assets/koharu.model",
    "miku/assets/miku.model",
    "tororo/assets/tororo.model",
    "tsumiki/assets/tsumiki.model",
    "unitychan/assets/unitychan.model",
    "wanko/assets/wanko.model",
    "z16/assets/z16.model"
  ];
}
</script>
<style lang='stylus' scoped>
#live2d {
  position: absolute;
  transform: scale(0.7);
  bottom: 0px;
  left: 0px;
  z-index: 99999;
  pointer-events: none;
}

.tools-panel {
  position: fixed;
  left: 0;
  bottom: 0;
  max-width: 32px;
}

.live2d-panel {
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>