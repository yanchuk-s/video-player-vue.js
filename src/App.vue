<template>
  <div id="app">
    <div class="container">
     <div class="col9">
        <div class="general-video">
          <Player />
        </div>
     </div>
    <div class="col3">
      <div class="play-list">
        s
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Player from './components/Player.vue'

export default {
  name: 'app',
  components: {
    Player
  }
}
</script>

<style lang="scss">
html{
  height: 100%;
}
body{
  height: 100%;
  margin: 0;
}
.container{
  padding-right: 15px!important;
  padding-left: 15px!important;
  margin-right: auto!important;
  margin-left: auto!important;
  max-width: 100%!important;
  padding-top: 0!important;
  padding-bottom: 0!important;
  display: flex;
}

.col9{
  width: 70%;
  padding: 0 10px;
}
.col3{
  width: 30%;
  padding: 0 10px;
}
#app {

  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
