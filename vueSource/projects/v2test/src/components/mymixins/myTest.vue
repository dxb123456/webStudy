<template>
    <div>
        <h3>我是测试3</h3>
        <p>{{ name1 }}</p>
        <button @click="add">+</button>
        <p>{{obj.name}}</p>
        <input type="text" v-model="input">
        <p>{{input}}</p>
    </div>
</template>

<script>
    import { mixins } from './mymixins'
    export default {
        name: "myTest",
        mixins:[mixins],
        data(){
            return {
                input:''
            }
        },
        methods:{
            add(){
                console.log(2222)
                console.log(this.$root)
                console.log(this.$parent)

            }
        }
    }
</script>

<style scoped>

</style>
