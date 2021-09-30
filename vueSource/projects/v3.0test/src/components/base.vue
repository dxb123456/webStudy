<template>
    <div>
        <h2>基本测试：</h2>
        <p>{{message}}</p>
        <p v-text="message+'100'" @click="pClick"></p>
        <ul>
            <li v-for="(value,key) of list " :key="key">{{value}}-{{key}}</li>
            <li v-for="(value,key,index) of obj " :key="key">{{value}}-{{key}}-{{index}}</li>
        </ul>
        <p>输入:<input type="text" v-model="inputNum">{{inputNum}}</p>
        <p>{{pp}}</p>
        <h2>ref,reactive 测试</h2>
        <p>{{num}}
            <button @click="()=>this.num++">+</button>
            <button @click="click2">-</button>
        </p>

    </div>
</template>

<script>
    import {ref,reactive} from 'vue';

    var message = '我是 message';
    export default {
        name: "base",
        data: () => {
            return {}
        },
        setup() {
            let num=ref(10)
            function pClick(){
                console.log(111)
            }
            let list = [
                '下载1',
                '下载2',
                '下载3'
            ];
            let obj={
                name:'老王',
                age:'14',
                studyRoom:'301'
            }
            let pp = ref(20); //基本数据类型，需要响应式时也需要使用ref
            function click2(){
                num.value--;
                pp.value--;
                obj.name='老李'+num.value;

            }
            let inputNum = ref("10")
            return {
                message,pClick,list,obj,num,click2,inputNum,pp
            }
        }

    }
</script>

<style scoped>

</style>
