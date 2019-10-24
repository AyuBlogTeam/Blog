<template lang="pug">
  div.loading
    div.loader
      div.track
        div.mouse
      div.face
        div.ears-container
        div.eyes-container
          div.eye
          div.eye
        div.phiz
          div.nose
          div.lip
          div.mouth
</template>
<style lang="stylus" scoped>
.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1987;

  .loader {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 260px;
    height: 260px;
    margin-left: -130px;
    margin-top: -130px;

    .track {
      width: 100%;
      height: 100%;
      border: solid white;
      border-width: 5px 5px 3px 0;
      border-top-color: transparent;
      border-radius: 50%;
      margin-left: -3px;
      margin-top: -3px;
      -webkit-animation: rotate 3s infinite linear;
      -moz-animation: rotate 3s infinite linear;
      -o-animation: rotate 3s infinite linear;
      animation: rotate 3s infinite linear;

      .mouse {
        position: absolute;
        right: 31px;
        top: 18px;
        width: 25px;
        height: 25px;
        background: white;
        border-radius: 80% 0 55% 50% / 55% 0 80% 50%;
        transform: rotate(-95deg);
      }

      .mouse:before, .mouse:after {
        position: absolute;
        content: '';
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: inherit;
      }

      .mouse:before {
        left: 5px;
        top: -4px;
      }

      .mouse:after {
        left: 20px;
        top: 11px;
      }
    }

    .face {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 130px;
      height: 130px;
      margin-left: -65px;
      margin-top: -65px;

      .ears-container {
        position: absolute;
        top: -8px;
        width: 130px;
        height: 50px;
      }

      .ears-container:before, .ears-container:after {
        position: absolute;
        content: '';
        width: 0;
        height: 0;
        border-top: 35px solid transparent;
        border-bottom: 35px solid transparent;
      }

      .ears-container:before {
        border-left: 35px solid #c8c6c9;
      }

      .ears-container:after {
        right: 0;
        border-right: 35px solid #c8c6c9;
      }

      .eyes-container {
        position: absolute;
        overflow: hidden;
        left: 50%;
        top: 30px;
        width: 106px;
        height: 50px;
        margin-left: -53px;
        z-index: 1;
        -webkit-animation: hideEye 3s infinite linear;
        -moz-animation: hideEye 3s infinite linear;
        -o-animation: hideEye 3s infinite linear;
        animation: hideEye 3s infinite linear;

        .eye {
          position: relative;
          bottom: 0;
          float: left;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          color: #c8c6c9;
          background: white;
          -webkit-animation: blink 3s infinite linear;
          -moz-animation: blink 3s infinite linear;
          -o-animation: blink 3s infinite linear;
          animation: blink 3s infinite linear;
        }

        .eye:after {
          position: absolute;
          content: '';
          top: 4px;
          right: 14px;
          width: 12px;
          height: 12px;
          border-radius: inherit;
          background: #838091;
        }

        .eye:last-child {
          float: right;
          color: #d0ced1;
        }
      }

      .phiz {
        position: absolute;
        left: 50%;
        top: 66px;
        width: 32px;
        height: 48px;
        margin-left: -16px;
        z-index: 1;

        .nose {
          width: 100%;
          height: 15px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          border-bottom-left-radius: 25px;
          border-bottom-right-radius: 25px;
          background: #838091;
        }

        .lip {
          position: relative;
          left: 50%;
          width: 4px;
          height: 12px;
          margin-left: -2px;
          background: #838091;
        }

        .lip:before {
          position: absolute;
          content: '';
          width: 100%;
          height: 5px;
          background: #767385;
        }

        .mouth {
          position: relative;
          left: 50%;
          width: 20px;
          height: 6px;
          margin-left: -13px;
          background: white;
          border: 3px solid #838091;
          border-bottom-right-radius: 12px;
          border-bottom-left-radius: 12px;
        }
      }
    }

    .face:before, .face:after {
      position: absolute;
      content: '';
      width: 50%;
      height: 100%;
    }

    .face:before {
      background: #c8c6c9;
      border-top-left-radius: 65px;
      border-bottom-left-radius: 55px;
    }

    .face:after {
      left: 50%;
      background: #d0ced1;
      border-top-right-radius: 65px;
      border-bottom-right-radius: 55px;
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(-0.08turn);
  }

  100% {
    transform: rotate(-1.08turn);
  }
}

@keyframes hideEye {
  0%, 10%, 85% {
    margin-top: 0;
    height: 50px;
  }

  30%, 65% {
    margin-top: 20px;
    height: 30px;
  }
}

@keyframes blink {
  0%, 10%, 85% {
    bottom: 0;
  }

  30%, 65% {
    bottom: 20px;
  }

  0% {
    transform: rotate(-0.08turn);
  }

  100% {
    transform: rotate(-1.08turn);
  }
}
</style>