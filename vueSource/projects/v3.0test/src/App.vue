<template>
    <!--  <HelloWorld msg="Hello Vue 3.0 + Vite" />-->
<!--    <BaseL msg="Hello Vue 3.0 + Vite"/>-->
    <div>
        <UpsA msg="Hello Vue 3.0 + Vite" :appObj = appObj :appNum=appNum @sub-event="onTestClick" />
        <p>{{appObj.a}}</p>
        <p>{{appNum}}</p>

    </div>

</template>

<script>
    import {ref, reactive, watch, computed, createApp} from 'vue'
    import HelloWorld from './components/HelloWorld.vue'
    import BaseL from "./components/base.vue";
    import UpsA from './components/UpsA.vue'
    console.log(BaseL)
    export default {
        name: 'App',
        components: {
            BaseL,
            HelloWorld,
            UpsA
        },
        setup(){
            const appObj = reactive({
                a:100,
                b:200
            })
            function onTestClick(num){
                appNum.value = num;
            }
            const appNum = ref('11')
            return {appObj,appNum,onTestClick}
        },
        created() {
            console.log(this.$store.state.a)
            setTimeout(()=>{
                this.appNum =10000
            },2000)
        }
    }
</script>
<style>
    h2{
        text-align: left;
    }
</style>
