<template>
  <div class="hello">
   <div class="player" v-bind:class="{ fullscreen: ifFullScreen }">
     <adv />
      <div class="video-wrp">
         <video id="videoplayer">
          <!-- <source src="https://www.videvo.net/videvo_files/converted/2018_04/preview/180301_06_A_CityRoam_03.mp420186.webm"> -->
          <!-- <source src="https://www.videvo.net/videvo_files/converted/2016_04/preview/Audio_bands_Feed.mov25390.webm"> -->
          <source src="../assets/video/advertising720.mp4">
           <!-- <source src="../assets/video/brat2.mp4"> -->
        </video>
        <transition name="fade">
           <div v-if="playwrp" class="video-hover if-play">
            <div>
              <button @click="play"><i class="fas fa-play"></i></button>
            </div>
          </div>
          <!-- <div v-else class="video-hover video-hover-pause if-pause">
            <div>
              <button @click="pause"><i class="fas fa-pause"></i></button>
            </div>
          </div> -->
        </transition>
      </div>
      <div class="bar-container">
        <div class="progres-general">
            <progress v-on:mousemove="mousemove($event)" @click="videoRewind($event)" id="progres" max="100" value="0"></progress>
        </div>
        <div class="progres-move">
            <progress v-on:mouseout="mouseout($event)" v-on:mousemove="mousemove($event)" @click="videoRewind($event)" id="progres2" max="100" value="0"></progress>
        </div>
         <div class="player-nav">
           <div class="nav-left">
            <button v-if="inPause" class="nav-btn" @click="play"><i class="fas fa-play"></i></button>
            <button v-else class="nav-btn" @click="pause"><i class="fas fa-pause"></i></button>
            <button @click="backward" class="nav-btn"><i class="fas fa-step-backward"></i></button>
            <div class="progres-volume">
                <button v-if="muteValue == false" @click="mute"><i class="fas fa-volume-up"></i></button>
                <button v-else @click="mute"><i class="fas fa-volume-mute"></i></button>
                <progress @click="volume($event)" id="volume" max="100" value="100"></progress>
            </div>
           </div>
           <div class="nav-right">
             <span>{{currentTime}}/{{duration}}</span>
             <button v-if="ifFullScreen" class="nav-btn" @click="closeFullscreen"><i class="fas fa-compress-arrows-alt"></i></button>
             <button v-else class="nav-btn" @click="openFullscreen"><i class="fas fa-expand"></i></button>
           </div>
        </div>
      </div>
   </div>
   <div class="video-info">
     <div class="title">
       {{video.title}}
     </div>
     <div class="video-info-second">
       <div class="video-views">
         {{video.views}} views
       </div>
       <div class="video-likes-dislikes">
         <div class="like">
           {{video.likes}}
           <button @click="like(video.id)" class="like-btn"><i class="fas fa-thumbs-up"></i></button>
         </div>
         <div class="dislikes">
           {{video.dislikes}}
          <button @click="dislike(video.id)" class="like-btn"><i class="fas fa-thumbs-down"></i></button>
         </div>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
import adv from '../components/Adv.vue'
export default {
  name: 'Player',
  components: {
    adv
  },
  data(){
    return{
      video: null,
      player: null,
      progres: null,
      progres2: null,
      duration: 0,
      currentTime: 0,
      inPause: true,
      playing: false,
      ifFullScreen: false,
      volumeEl: null,
      valueWidth: {
        o: null,
        w: null
      },
      muteValue: false,
      volumeSave: 1,
      playwrp: true,
      document: null
    }
  },
  beforeCreate(){
    // if(JSON.parse(localStorage.getItem('videos')) != null){
    //   this.$store.state.videos = localStorage.getItem('videos')
    // }
  },
  created(){
    this.video = this.$store.getters.getVideoById(1)
    this.view(this.video.id)
    // console.log(this.video)
    // console.log(this.video)
  },
  computed:{
    chengeVideo(){
      return this.video = this.$store.getters.getVideoById(1)
    }
  },
  mounted(){
    this.player = document.getElementById('videoplayer');
    this.progres = document.getElementById('progres');
    this.progres2 = document.getElementById('progres2');
    this.volumeEl = document.getElementById('volume')
    let _this = this
    this.player.addEventListener("timeupdate",function(){
      _this.videoTime()
    });
    this.player.addEventListener("canplay",function(){
      _this.canplay()
    });
    
    this.player.addEventListener("ended",function(){
      _this.ended()
    });

    window.addEventListener("keydown", function (event) {
      // console.log(event)
      _this.spaceEvent(event)
    });
  },
  methods: {
    spaceEvent: function (e) {
      if(e.keyCode == 32){
        // if(this.inPause == true){
        //   this.play()
        // }else{
        //   this.pause()
        // }
      }
       if (e.keyCode == 27) {
          this.closeFullscreen()
          // this.closeFullscreen()
        }
    },
    ended: function () {
      this.progres.value = 0
      this.player.currentTime = 0
      this.playwrp = true
      this.inPause = true
    },
    canplay: function () {
      this.duration = this.player.duration.toFixed(1)
      this.player.value = 1
    },
    mouseout: function () {
      this.progres2.value = 0
    },
    mousemove:function (e) {
      let w = e.target.offsetWidth
      let o = event.offsetX
      this.progres2.value = 100 * o/w
    },
    videoTime: function () {
      this.duration = this.player.duration.toFixed(1)
      this.currentTime = this.player.currentTime.toFixed(1)
      this.progres.value = 100 * this.currentTime / this.duration
    },
    videoRewind: function (e) {
      let w = e.target.offsetWidth
      let o = event.offsetX
      this.progres.value = 100 * o/w
      this.pause()
      this.player.currentTime = this.player.duration* (o/w)
      this.play()
      this.progres2.value = 0
    },
    backward: function(){
      this.progres.value = 0
      this.player.currentTime = 0
    },
    volume: function (e) {
        let w = e.target.offsetWidth
        let o = event.offsetX
        // console.log(w, o)
        // console.log(e)
        this.volumeEl.value = 100 * o/w
        // console.log(this.volumeEl.value = 1 * o/w)
        let volumeFix = 1 * o/w
        this.player.volume = volumeFix
        this.volumeSave = volumeFix
    },
    mute: function () {

      if(this.muteValue == false){
        this.muteValue = true
        this.player.volume = 0
      }else{
        this.muteValue = false
        this.player.volume = this.volumeSave
      }
    },
    play: function () {
      this.player.play()
      this.inPause = false
      this.playing = true
      this.playwrp = false
    },
    pause: function () {
      this.player.pause()
      this.inPause = true
      this.playing = false
      this.playwrp = true
    },
    openFullscreen: function () {
      let elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
      this.ifFullScreen = true
    },
    closeFullscreen: function () {
      // console.log('closeFullscreen')
      this.ifFullScreen = false
      let elem = document.documentElement;
      if (elem.exitFullscreen) {
        elem.exitFullscreen();
      } else if (elem.mozCancelFullScreen) { /* Firefox */
        elem.mozCancelFullScreen();
      } else if (elem.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitExitFullscreen();
      } else if (elem.msExitFullscreen) { /* IE/Edge */
        elem.msExitFullscreen();
      }
       this.ifFullScreen = false
    },
    like: function (id) {
      // console.log(id)
      this.$store.dispatch('like', id)
    },
    dislike: function (id) {
      this.$store.dispatch('dislike', id)
    },
    view: function (id) {
      // console.log(id)
      this.$store.dispatch('view', id)
    }
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.nav-btn{
  background: none;
  border: none;
  outline:none;
  opacity: 0.7;
  color: #fff;
  cursor: pointer;
  &:hover{
    opacity: 1;
  }
}

.player-nav{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: rgba(1,1,1,0.7);
  box-sizing: border-box;
  .nav-left{
    display: flex;
    justify-content: flex-start;
  }
  .nav-right{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    span{
      font-size: 14px;
      margin-right: 10px;
    }
  }
}

.player{
  width: 100%;
  height: auto;
  position: relative;
  .video-wrp{
    position: relative;
    video{
    width: 100%;
    position: relative;
    }
    .video-hover{
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.4);
      button{
        background: none;
        border: none;
        outline: none;
        color: #fff;
        font-size: 60px;
        opacity: 0.4;
        cursor: pointer;
        &:hover{
          opacity: 0.7;
        }
      }
    }
    .video-hover-pause{
      display: none;
      background: none;
    }
    &:hover{
      .video-hover-pause{
        display: flex;
      }
    }
  }
}

.bar-container{
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: -5px;
  opacity: 0;
  div{
    width: 100%;
  }
  &:hover{
    opacity: 1;
  }
}

// .player{
//   &:hover{
//     .bar-container{
//       display: flex;
//     }
//   }
// }

.progres-general{
  progress {
	width: 100%;
	height: 10px;
	display: block;
	/* Important Thing */
	-webkit-appearance: none;
	border: none;
  cursor: pointer;
}
progress::-webkit-progress-bar {
	background: #eee;
	border-radius: 0;
	padding: 1px;
  border:none;
	// box-shadow: 0 1px 0px 0 rgba(255, 255, 255, 0.2);
}
progress::-webkit-progress-value {
	border-radius: 0;
	// box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.4);
	background: #ccc;
	-webkit-animation: move 5s linear 0 infinite;
  border:none;
}
@-webkit-keyframes move {
	0% {background-position: 0px 0px, 0 0, 0 0}
	100% {background-position: -100px 0px, 0 0, 0 0}
}
}


.progres-move{
  position: absolute;
  top: 0;
  progress {
	width: 100%;
	height: 10px;
	display: block;
	/* Important Thing */
	-webkit-appearance: none;
	border: none;
  cursor: pointer;
}
progress::-webkit-progress-bar {
	background: none;
  opacity: 0.4;
	border-radius: 0;
  border:none;
	padding: 1px;
	// box-shadow: 0 1px 0px 0 rgba(255, 255, 255, 0.2);
}
progress::-webkit-progress-value {
	border-radius: 0;
	// box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.4);
	background: black;
  border:none;
}
@-webkit-keyframes move {
	0% {background-position: 0px 0px, 0 0, 0 0}
	100% {background-position: -100px 0px, 0 0, 0 0}
}
}

.progres-volume{
  display: flex;
  align-items: center;
  width: 100px!important;
  button{
    background: none;
    color: #fff;
    border: none;
    outline: none;
    cursor: pointer;
  }
  progress {
    width: 100%;
    height: 5px;
    display: block;
    /* Important Thing */
    -webkit-appearance: none;
    border: none;
    cursor: pointer;
  }
progress::-webkit-progress-bar {
	background: #fff;
  opacity: 0.7;
	border-radius: 0;
  border:none;
	padding: 1px;
	// box-shadow: 0 1px 0px 0 rgba(255, 255, 255, 0.2);
}
progress::-webkit-progress-value {
	border-radius: 0;
	// box-shadow: inset 0 1px 1px 0 rgba(255, 255, 255, 0.4);
	background: rgb(70, 58, 58);
  border:none;
}
@-webkit-keyframes move {
	0% {background-position: 0px 0px, 0 0, 0 0}
	100% {background-position: -100px 0px, 0 0, 0 0}
}
}

.fullscreen{
  height: 100%;
  width: 100%;
  .video-wrp{
    height: 100vh;
    background: #000;
    display: flex;
  }
}

video[poster]{
height:100%;
width:100%;
object-fit: cover;
}

.video-info{
  padding: 10px 0;
  .title{
    text-align: left;
    margin-bottom: 10px;
  }
  .video-info-second{
    display: flex;
    justify-content: space-between;
    .video-views{
      color: #606060;
    }
    .video-likes-dislikes{
      display: flex;
      color: #606060;
      div{
        display: flex;
        align-items: center;
        margin-left: 20px;
      }
      .like-btn{
        font-size: 16px;
        cursor: pointer;
        color: #606060;
        background: none;
        border: none;
        outline: none;
      }
    }
  }
}
</style>
