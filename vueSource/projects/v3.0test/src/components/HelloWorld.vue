<template>
  <h1>count is: {{ this.$store.state.a.a }}</h1>
  <button @click="myClick">+</button>
  <button @click="myClick1">-</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: this.$store.state.a.a,
    }
  },
  computed(){

  },
  methods:{
    myClick(){
      this.$store.commit("changeA")
      console.log('1111')
    },
    myClick1(){
      this.$store.dispatch('send')
      console.log(200);
      // this.$store.dispatch('send')
    }
  }
}
</script>
