<template lang='pug'>
  div#live2d
    div.live2d-panel
      div.dialogue-live2d(ref="live2dDialogue",v-if="islive2d") {{word}}
      live2d(v-if="islive2d" :width=200 :height=300 :modelPath="'/live2dw/live2d-widget-model-' + modelArr[5] + '.json'")
</template>
<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component
export default class componentName extends Vue {
  private islive2d: boolean = true;
  private word: string = "";
  private wordList: string[] = [];
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

  mounted() {
    this.getInfo();
    this.time();
  }

  private time() {
    let i = 0;
    let timer = setInterval(() => {
      if (i == this.wordList.length) {
        this.getInfo();
        i = 0;
      } else {
        this.word = this.wordList[i].content;
        i++;
      }
    }, 5000);
  }

  private getInfo() {
    this.$http.get(IPserver + "live2d/getLive2d.php").then((res: string[]) => {
      if (res) {
        this.wordList = res;
        this.islive2d = true
      }
    });
  }
}
</script>
<style lang='stylus' scoped>
#live2d {
  position: fixed;
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

  .dialogue-live2d {
    font-weight: 1000;
    text-align: center;
    opacity: 1;
    width: 140px;
    height: auto;
    min-height: 60px;
    margin: 0 0 -25px 20px;
    padding: 5px 10px;
    border-radius: 12px;
    -webkit-box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24);
    font-size: 13px;
    color: #212121;
    text-overflow: ellipsis;
    background-color: #fff;
    overflow: hidden;
    -webkit-animation: animation 50s ease-in-out 5s infinite;
    animation: animation 50s ease-in-out 5s infinite;
  }
}

@keyframes animation {
  2% {
    -webkit-transform: translate(0.5px, -1.5px) rotate(-0.5deg);
    transform: translate(0.5px, -1.5px) rotate(-0.5deg);
  }

  4% {
    -webkit-transform: translate(0.5px, 1.5px) rotate(1.5deg);
    transform: translate(0.5px, 1.5px) rotate(1.5deg);
  }

  6% {
    -webkit-transform: translate(1.5px, 1.5px) rotate(1.5deg);
    transform: translate(1.5px, 1.5px) rotate(1.5deg);
  }

  8% {
    -webkit-transform: translate(2.5px, 1.5px) rotate(0.5deg);
    transform: translate(2.5px, 1.5px) rotate(0.5deg);
  }

  10% {
    -webkit-transform: translate(0.5px, 2.5px) rotate(0.5deg);
    transform: translate(0.5px, 2.5px) rotate(0.5deg);
  }

  12% {
    -webkit-transform: translate(1.5px, 1.5px) rotate(0.5deg);
    transform: translate(1.5px, 1.5px) rotate(0.5deg);
  }

  14% {
    -webkit-transform: translate(0.5px, 0.5px) rotate(0.5deg);
    transform: translate(0.5px, 0.5px) rotate(0.5deg);
  }

  16% {
    -webkit-transform: translate(-1.5px, -0.5px) rotate(1.5deg);
    transform: translate(-1.5px, -0.5px) rotate(1.5deg);
  }

  18% {
    -webkit-transform: translate(0.5px, 0.5px) rotate(1.5deg);
    transform: translate(0.5px, 0.5px) rotate(1.5deg);
  }

  20% {
    -webkit-transform: translate(2.5px, 2.5px) rotate(1.5deg);
    transform: translate(2.5px, 2.5px) rotate(1.5deg);
  }

  22% {
    -webkit-transform: translate(0.5px, -1.5px) rotate(1.5deg);
    transform: translate(0.5px, -1.5px) rotate(1.5deg);
  }

  24% {
    -webkit-transform: translate(-1.5px, 1.5px) rotate(-0.5deg);
    transform: translate(-1.5px, 1.5px) rotate(-0.5deg);
  }

  26% {
    -webkit-transform: translate(1.5px, 0.5px) rotate(1.5deg);
    transform: translate(1.5px, 0.5px) rotate(1.5deg);
  }

  28% {
    -webkit-transform: translate(-0.5px, -0.5px) rotate(-0.5deg);
    transform: translate(-0.5px, -0.5px) rotate(-0.5deg);
  }

  30% {
    -webkit-transform: translate(1.5px, -0.5px) rotate(-0.5deg);
    transform: translate(1.5px, -0.5px) rotate(-0.5deg);
  }

  32% {
    -webkit-transform: translate(2.5px, -1.5px) rotate(1.5deg);
    transform: translate(2.5px, -1.5px) rotate(1.5deg);
  }

  34% {
    -webkit-transform: translate(2.5px, 2.5px) rotate(-0.5deg);
    transform: translate(2.5px, 2.5px) rotate(-0.5deg);
  }

  36% {
    -webkit-transform: translate(0.5px, -1.5px) rotate(0.5deg);
    transform: translate(0.5px, -1.5px) rotate(0.5deg);
  }

  38% {
    -webkit-transform: translate(2.5px, -0.5px) rotate(-0.5deg);
    transform: translate(2.5px, -0.5px) rotate(-0.5deg);
  }

  40% {
    -webkit-transform: translate(-0.5px, 2.5px) rotate(0.5deg);
    transform: translate(-0.5px, 2.5px) rotate(0.5deg);
  }

  42% {
    -webkit-transform: translate(-1.5px, 2.5px) rotate(0.5deg);
    transform: translate(-1.5px, 2.5px) rotate(0.5deg);
  }

  44% {
    -webkit-transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    transform: translate(-1.5px, 1.5px) rotate(0.5deg);
  }

  46% {
    -webkit-transform: translate(1.5px, -0.5px) rotate(-0.5deg);
    transform: translate(1.5px, -0.5px) rotate(-0.5deg);
  }

  48% {
    -webkit-transform: translate(2.5px, -0.5px) rotate(0.5deg);
    transform: translate(2.5px, -0.5px) rotate(0.5deg);
  }

  50% {
    -webkit-transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    transform: translate(-1.5px, 1.5px) rotate(0.5deg);
  }

  52% {
    -webkit-transform: translate(-0.5px, 1.5px) rotate(0.5deg);
    transform: translate(-0.5px, 1.5px) rotate(0.5deg);
  }

  54% {
    -webkit-transform: translate(-1.5px, 1.5px) rotate(0.5deg);
    transform: translate(-1.5px, 1.5px) rotate(0.5deg);
  }

  56% {
    -webkit-transform: translate(0.5px, 2.5px) rotate(1.5deg);
    transform: translate(0.5px, 2.5px) rotate(1.5deg);
  }

  58% {
    -webkit-transform: translate(2.5px, 2.5px) rotate(0.5deg);
    transform: translate(2.5px, 2.5px) rotate(0.5deg);
  }

  60% {
    -webkit-transform: translate(2.5px, -1.5px) rotate(1.5deg);
    transform: translate(2.5px, -1.5px) rotate(1.5deg);
  }

  62% {
    -webkit-transform: translate(-1.5px, 0.5px) rotate(1.5deg);
    transform: translate(-1.5px, 0.5px) rotate(1.5deg);
  }

  64% {
    -webkit-transform: translate(-1.5px, 1.5px) rotate(1.5deg);
    transform: translate(-1.5px, 1.5px) rotate(1.5deg);
  }

  66% {
    -webkit-transform: translate(0.5px, 2.5px) rotate(1.5deg);
    transform: translate(0.5px, 2.5px) rotate(1.5deg);
  }

  68% {
    -webkit-transform: translate(2.5px, -1.5px) rotate(1.5deg);
    transform: translate(2.5px, -1.5px) rotate(1.5deg);
  }

  70% {
    -webkit-transform: translate(2.5px, 2.5px) rotate(0.5deg);
    transform: translate(2.5px, 2.5px) rotate(0.5deg);
  }

  72% {
    -webkit-transform: translate(-0.5px, -1.5px) rotate(1.5deg);
    transform: translate(-0.5px, -1.5px) rotate(1.5deg);
  }

  74% {
    -webkit-transform: translate(-1.5px, 2.5px) rotate(1.5deg);
    transform: translate(-1.5px, 2.5px) rotate(1.5deg);
  }

  76% {
    -webkit-transform: translate(-1.5px, 2.5px) rotate(1.5deg);
    transform: translate(-1.5px, 2.5px) rotate(1.5deg);
  }

  78% {
    -webkit-transform: translate(-1.5px, 2.5px) rotate(0.5deg);
    transform: translate(-1.5px, 2.5px) rotate(0.5deg);
  }

  80% {
    -webkit-transform: translate(-1.5px, 0.5px) rotate(-0.5deg);
    transform: translate(-1.5px, 0.5px) rotate(-0.5deg);
  }

  82% {
    -webkit-transform: translate(-1.5px, 0.5px) rotate(-0.5deg);
    transform: translate(-1.5px, 0.5px) rotate(-0.5deg);
  }

  84% {
    -webkit-transform: translate(-0.5px, 0.5px) rotate(1.5deg);
    transform: translate(-0.5px, 0.5px) rotate(1.5deg);
  }

  86% {
    -webkit-transform: translate(2.5px, 1.5px) rotate(0.5deg);
    transform: translate(2.5px, 1.5px) rotate(0.5deg);
  }

  88% {
    -webkit-transform: translate(-1.5px, 0.5px) rotate(1.5deg);
    transform: translate(-1.5px, 0.5px) rotate(1.5deg);
  }

  90% {
    -webkit-transform: translate(-1.5px, -0.5px) rotate(-0.5deg);
    transform: translate(-1.5px, -0.5px) rotate(-0.5deg);
  }

  92% {
    -webkit-transform: translate(-1.5px, -1.5px) rotate(1.5deg);
    transform: translate(-1.5px, -1.5px) rotate(1.5deg);
  }

  94% {
    -webkit-transform: translate(0.5px, 0.5px) rotate(-0.5deg);
    transform: translate(0.5px, 0.5px) rotate(-0.5deg);
  }

  96% {
    -webkit-transform: translate(2.5px, -0.5px) rotate(-0.5deg);
    transform: translate(2.5px, -0.5px) rotate(-0.5deg);
  }

  98% {
    -webkit-transform: translate(-1.5px, -1.5px) rotate(-0.5deg);
    transform: translate(-1.5px, -1.5px) rotate(-0.5deg);
  }

  0%, to {
    -webkit-transform: translate(0) rotate(0);
    transform: translate(0) rotate(0);
  }
}
</style>