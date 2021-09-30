<template>
    <div>
        我是app2
        <router-view @change-view="onChangeView"
        ></router-view>
    </div>
</template>

<script>
    console.log(2222)
    import {ref, reactive, watch, computed, createApp} from 'vue'
    import router from '@/router'
    export default {
        name: 'App2',
        components: {

        },
        setup(){
            const appObj = reactive({
                a:100,
                b:200
            })
            function onTestClick(num){
                appNum.value = num;
            }
            const appNum = ref('11');

            function onChangeView(event) {

                router.push(event)
                console.log(event)
            }
            return {appObj,appNum,onTestClick,onChangeView}
        },
        created() {
            //
            // console.log(this.$store.state.a)
        },
        // mounted(){
        //     console.log(router.currentRoute.value.params.id)
        // }
    }
</script>
<style>
    h2{
        text-align: left;
    }
</style>
