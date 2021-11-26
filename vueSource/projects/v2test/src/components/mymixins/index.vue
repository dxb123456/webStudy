<template>
    <div>
        <my-test></my-test>
        <my-test2></my-test2>
    </div>
</template>

<script>

    import myTest from './myTest'
    import myTest2 from './myTest2'
    export default {
        name: "index",
        components:{
            myTest,
            myTest2
        }
    }
</script>

<style scoped>

</style>
