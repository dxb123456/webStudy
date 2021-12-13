<template>
    <div>
        <my-test id="pp2"></my-test>
        <my-test2 id="pp3"></my-test2>
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
