import {createStore} from 'vuex'

const moduleA = {
    state: () => ({
        a:1,
    }),
    mutations: {
        async changeA(data){

            var mm = await new Promise((res)=>{
                setTimeout(()=>{res(100)},3000);
            });
            console.log(mm)
            this.state.a.a+=mm;
            //  new Promise((resolve,reject)=>{
            //     setTimeout(()=>{
            //
            //         resolve(100)
            //     },2000)
            // }).then(value=>)
        },

    },
    actions: {
        send(context,data){
            console.log(this.state);
            setTimeout(()=>{
                this.state.a.a++
            },2000)
        },
    },

}

const moduleB = {
    mutations: {
        async changeA(data){
            var mm = await new Promise((res)=>{
                console.log(this)
                setTimeout(
                    ()=>{res(100)
                        this.state.a.a++
                    },
                    3000);
            });
            this.state.a.a+=mm;
        },
    },
    actions: {
        send(context,data){
            new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve()
                },2000)
            })
        },
    },
}


export default createStore({
    // modules:{
    //     a:moduleA,
    //     b:moduleB
    // }
    state:{
        a:1
    },
    mutations:{
        changeA(state,preload){
            console.log(preload)
            this.state.a=preload
        },
        deleA(state,data){
            this.state.a--
        }
    },
    getters:{

    },
    actions:{
        send(context,data){
            console.log(data);
            setTimeout(()=>{
                this.state.a++
            },300)
        },
        dd(context){

        }
    }
})
