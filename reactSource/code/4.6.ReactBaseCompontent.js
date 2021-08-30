import {SyncLane} from './4.4.ReactFiberLane'
import {scheduleUpdateOnFiber} from './4.5.ReactFiberWorkLoop'
let classComponentUpdater = {
    enqueueState(inst,payload){
        let fiber = get(inst);
        let eventTime = requestEventTime();
        let lane = requestUpdateLane(fiber);//计算任务的优先级
        let update = createUpdate(eventTime,lane); //创建更新
        update.payload = payload;  //payload是用户写的函数或者对象
        enqueueUpdate(fiber,update);
        scheduleUpdateOnFiber(fiber)
    }
}

function enqueueUpdate (fiber,update){
    fiber.updateQueue.push(update) ; //源码中是链表
}

function createUpdate(eventTime,lane){
    return {eventTime,lane}
}
function requestUpdateLane(){
    //按照当前事件的优先级来返回 lane值；这里模拟返回1
    return SyncLane
}
//优先级高的会打断优先级低的
function requestEventTime(){
    return performance.now(); //获取程序启动到现在的时间
}
function get (inst){
    return inst._reactInteral
}
class Component{
    constructor(){
        this.updater = classComponentUpdater;
    }
    setState(partialState){
        this.updater.enqueueState(this,partialState)
    }
}
