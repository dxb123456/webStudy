<template>
  <div id="app">
<!--    <my-test msg="Welcome to Your Vue.js App"/>-->
    <mixins-index />
  </div>
</template>

<script>
import mixinsIndex from './components/mymixins/index.vue'

export default {
  name: 'App',

  components: {
      mixinsIndex,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
