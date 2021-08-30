<template>
  <div>
    <ul>
<!--      <nuxt-link to="/aa" tag="li" activeClass="active">我是aa下面的标签</nuxt-link>-->
      <nuxt-link to="/home" tag="li" activeClass="active">aa</nuxt-link>
      <nuxt-link to="/aa" tag="li" activeClass="active">bb</nuxt-link>
      <nuxt-link to="/" tag="li" activeClass="active">cc</nuxt-link>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped>
  .active{
    color:red
  }
</style>
