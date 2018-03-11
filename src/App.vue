<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <div id ="main-title">
      Fantasy Football News Aggregator
    </div>
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <SearchBar/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import SearchBar from './components/SearchBar.vue'

export default {
  name: 'app',
  components: {
    SearchBar, HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 100px;
}
html {
  /*background: linear-gradient(#d442f4, #6b1d7c);*/
  background-repeat: no-repeat;
  min-height: 786px;
}

#main-title {
  font-size: 48px;
  padding: 60px 0px;
  font-weight: bold;
}
</style>
