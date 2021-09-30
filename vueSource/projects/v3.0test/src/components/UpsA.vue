<template>
    <div>
        <h2>watcher:</h2>
        <p>{{firstName}}
            <button @click="()=>this.firstName++">+</button>
        </p>
        <p>{{objs.aa}}
            <button @click="()=>this.objs.aa++">+</button>
        </p>
        <p>{{fullName}}</p>
        <h2>computed</h2>
        <p>newCom:{{newCom}}</p>
        <p>newCom2:{{newCom2}}</p>
        <first :personName="newCom2"></first>
    </div>
</template>

<script>
    import {ref, reactive, watch, computed, createApp} from 'vue'
    import HelloWorld from './HelloWorld.vue'

    const firstName = ref(10)
    const fullName = ref(20)
    //reactive的包装是深层次的里面的属性也包装成了响应式对象
    const objs = reactive({
        aa: 1,
        bb: 2
    })
    const helloComp = {
        name: 'hello-comp',
        props: {
            personName: {
                type: [String , Number],
                default: 'wangcong'
            }
        },
        template: '<p>hello {{personName}}!</p>'
    }
    export default {
        name: "UpsA",
        props:['appObj','appNum'],
        components: {
            first: helloComp
        },
        setup(props,context) {
            console.log(context)
            watch(firstName, (newVal, oldVal) => {
                fullName.value = firstName.value + 100
            })
            watch(objs, (newVal, oldVal) => {
                fullName.value = objs.aa + 1000
            })
            //监听部分属性
            watch(() => objs.bb, (newVal, oldVal) => {
                console.log(2222)
            })

            const newCom = computed(() => {
                return objs.aa + objs.bb
            })
            setTimeout(()=>{
                props.appObj.a = 200;
                context.emit('sub-event',100000000)
            },1000)

            props.appNum =3000;
            console.log(props.appObj)
            const newCom2 = computed({
                get: () => objs.aa + fullName.value,
                set: (val) => {
                    objs.aa = val
                }
            })

            return {
                firstName, fullName, objs, newCom, newCom2
            }
        }
    }
</script>

<style scoped>

</style>
