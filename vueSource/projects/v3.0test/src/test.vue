<template>
   <div>
       我是test
       <h3>
           {{store.state.a}}
       </h3>

   </div>
</template>

<script>
    import router from '@/router'
    import store from './stores'
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

            setTimeout(()=>{
                store.commit('changeA',999)
            },1000)

            return {store}
        },
        created(){
            console.log(this.store.state.a)
        }
    }
</script>

<style scoped>

</style>
