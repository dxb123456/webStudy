import {Component} from './ReactBaseCompontent'
class Count {
    state={
        number:0,
    }
    handle = ()=>{
        //回调函数是在更新之后执行的
        this.setState({number:this.state.number+1},()=>{
            console.log(this.state.number)
        })
        console.log(this.state.number)
        this.setState({number:this.state.number+1})
        console.log(this.state.number)
        this.setState((oldState)=>{
            number:oldState.number++
        })
        this.setState((oldState)=>{
            number:oldState.number++
        })
        console.log(this.state.number)

        setTimeout(()=>{
            //在宏任务中 setState 是同步的
            //也可以强制改成异步：ReactDom.unstable_batchedUpdates(()=>{}) 即可
            //在并发模式下,最新版17+，宏任务也异步了
            // ReactDom.unstable_batchedUpdates(()=>{
            //     this.setState({number:this.state.number+1})
            //     console.log('kk',this.state.number)     //3
            //     this.setState({number:this.state.number+1})
            //     console.log('kkk',this.state.number)    //3
            // })
            this.setState({number:this.state.number+1})
            console.log('kk',this.state.number)     //4
            this.setState({number:this.state.number+1})
            console.log('kkk',this.state.number)    //5
        })

    }
    render(){
        return (
            <div>
            <p>{this.state.number}</p>
            <button onClick={this.handle}>+</button>
            </div>
    )
    }
}
export default Count
