<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Player />
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
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
