<template>
   <div>
       我是test
       <h3>
           {{store.state.a}}
       </h3>
       <input type="text" v-model="this.$store.state.uid">
        <p>{{this.$store.state.uid}}</p>
       <p>{{myUid}}</p>
   </div>
</template>

<script>
    import {ref, reactive, watch, computed, createApp} from 'vue'
    import router from '@/router'
    import store from './stores'
    import {useStore} from 'vuex'
    export default {
        name: "test.app",
        setup(props,context){
            // console.log(props,context)
            // console.log(router.currentRoute.value.params.id)
            // setTimeout(()=>{
            //     // context.emit('change-view','/test/10')       // 第一种
            //     // context.emit('change-view',                {    // 第二种通过name
            //     //     name:'Home',
            //     //     params:{
            //     //         id:3
            //     //     }
            //     // })
            //     context.emit('change-view',                {    // 第三种通过path
            //         path:'/app2/3',
            //     })
            // },2000)
            console.log(store.state.a)
            const stores = useStore();
            console.log(stores)
            stores.state.uid =100000
            let myUid = computed(()=>store.state.uid)
            setTimeout(()=>{
                store.commit('changeA',999)
            },1000)

            var sss=ref({
                mm:22
            })
            console.log(sss.value)
            return {store,sss,myUid}
        },
        created(){
            console.log(this.store.state.a)
        }
    }
</script>

<style scoped>

</style>
