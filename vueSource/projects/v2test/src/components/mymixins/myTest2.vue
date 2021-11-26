<template>
    <div>
        <h3>我是测试2</h3>
        <p>{{name1}}</p>
        <button @click="add" >+</button>
        <p>{{obj.name}}</p>
    </div>
</template>

<script>
    import { mixins } from './mymixins'
    export default {
        name: "myTest2",
        mixins:[mixins],
        data(){
            return {
                // name1:2,
            }
        }
    }
</script>

<style scoped>

</style>
