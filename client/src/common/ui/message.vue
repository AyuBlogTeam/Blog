<template lang='pug'>
  transition(name="move")
    div.message(v-if="isShow")
      div.content 
        svg.icon(aria-hidden="true")
          use(xlink:href="#icon-jinggao",v-if="type=='warning'")
          use(xlink:href="#icon-chenggong",v-if="type=='success'")
          use(xlink:href="#icon-cuowu",v-if="type=='error'")
        div {{text}}
</template>

<style lang="stylus" scoped>
.message {
  pointer-events: none;
  width: 100%;
  position: fixed;
  top: 16px;
  z-index: 10000;
  text-align: center;
  font-size: 14px;

  .content {
    background: #fff;
    padding: 8px 16px;
    display: inline-block;
    border-radius: 4px;
    color: #515a6e;

    .icon {
      width: 20px;
      height: 20px;
      float: left;
    }

    div {
      float: left;
      margin-left: 2px;
    }
  }
}

.move-enter-active, .move-leave-active {
  transition: all 0.3s;
}

.move-enter, .move-leave-to {
  top: 0;
  opacity: 0;
}
</style>