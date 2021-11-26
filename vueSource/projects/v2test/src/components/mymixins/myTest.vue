<template>
    <div>
        <h3>我是测试3</h3>
        <p>{{ name1 }}</p>
        <button @click="add">+</button>
        <p>{{obj.name}}</p>
    </div>
</template>

<script>
    import { mixins } from './mymixins'
    export default {
        name: "myTest",
        mixins:[mixins],
        // data(){
        //     return {
        //         name1:'我是test中的name',
        //     }
        // }
    }
</script>

<style scoped>

</style>
