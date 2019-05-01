<template>
  <div v-if="showHideAdv" class="adv-wrp" v-bind:class="{advShow: advShow}">
      <video id="adv-player">
        <source src="../assets/video/advertising720.mp4">
      </video>
      <div v-if="playBtn" @click="playAdv" class="play-adv"></div>
      <div v-if="miss" class="miss-adv">
        <button @click="missAdv">Miss</button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'adv',
  props: {
    show:{
      type: Boolean
    }
  },
  data(){
    return{
      showHideAdv: true,
      playBtn: true,
      advShow: false,
      miss:false,
      player: null
    }
  },
  mounted(){
    this.player = document.getElementById('adv-player');
    let _this = this
    this.player.addEventListener("ended",function(){
      _this.ended()
    });
  },
  methods: {
    ended: function () {
      this.missAdv()
    },
    playAdv: function(){
      console.log('PlAY')
      this.playBtn = false
      this.advShow = true
      this.player.play()
      let _this = this
      setTimeout(() => {
        _this.miss = true
      }, 4000)
    },
    missAdv: function () {
      console.log('MISS')
      this.player.pause()
      this.player.currentTime = 0
      this.showHideAdv = false
    }
  }
}
</script>

<style lang="scss">
.adv-wrp{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  opacity: 0;
  #adv-player{
    width: 100%;
    height: 100%;
  }
  .play-adv{
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: red;
    z-index: 11;
  }
  .miss-adv{
    position: absolute;
    bottom: 20px;
    right: 20px;
    button{
      width: 100px;
      padding: 5px 0;
      background: none;
      color: #fff;
      font-weight: 600;
      border: 2px solid #fff;
      cursor: pointer;
    }
  }
}

.advShow{
  opacity: 1;
}
</style>
