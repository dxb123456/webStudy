export var mixins = {
    data(){
        return {
            name1:1,
            obj:{
                name:100
            }
        }
    },
    methods:{
        add(){
            console.log(11111)
            this.name1++;
            this.obj.name++;
        }
    },

    created(){
        console.log(111)
    }

}
