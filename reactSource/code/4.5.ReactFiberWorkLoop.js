import {HostRoot} from './4.3.ReactWorkTags'
import {NoLane,SyncLane} from './ReactFiberLane'
import {ClassComponent,HostRoot,HostComponent } from './4.3.ReactWorkTags'
var SyncLanePriority =12;  //最高优先级
var NoLanePriority = 0;//最低优先级
let syncQueue = [];

export function scheduleUpdateOnFiber(fiber) {
    //找到根节点
    let root = markUpdateLaneFromFiberRoot(fiber)
    //开始创建一个任务，从根节点开始进行更新
    ensureRootIsScheduled(root)
}
function ensureRootIsScheduled(root){
    let nextLanes = SyncLane; //1
    let newCallbackPriority = SyncLanePriority;//按理上应该等于最高优先级12
    var existingCallbackPriority = root.callbackPriority //当前根节点正在执行更新任务的优先级

    if(newCallbackPriority === existingCallbackPriority){
        //并发模式中，setTimout中也是批量处理的原因
        return  //如果这个新的更新和当前根节点已经调动的更新优先级相等，直接返回上次的更新
    }
    scheduleSyncCallback(performSyncWorkOnRoot.bind(null,root))
    queueMicrotask(flushSyncCallbackQueue);
    root.callbackPriority = newCallbackPriority;
}
function flushSyncCallbackQueue(){
    syncQueue.forEach(cb=>cb())
    syncQueue.length = 0
}



//把参数餐刀队列等待执行
function scheduleSyncCallback(callback){
    syncQueue.push(callback)
}
//执行渲染任务
function performSyncWorkOnRoot(workInProgress){
    let root = workInProgress;
    console.log('开始调和任务')
    while(workInProgress){
        if(workInProgress.tag === ClassComponent){
            let inst =workInProgress.stateNode;
            inst.state = processUpdateQueue(inst,workInProgress)
            inst.render(); //得到最新状态后,就可以调用render方法通过最新的虚拟dom，通过diff更新
        }
        workInProgress = workInProgress.child
    }
    commitRoot(root)
}
function commitRoot(root){

}



//根据老状态和更新队列计算状态
function processUpdateQueue(inst,fiber){
    fiber.updateQueue.reduce((state,{payload})=>{
        if(typeof payload == 'function'){
            payload = payload();
        }
        return {...state,...payload}
    },inst.state)
}

function markUpdateLaneFromFiberRoot(fiber) {
    let parent = fiber.return;
    while (parent) {
        fiber = parent;
        parent = parent.return
    }
    if (fiber.tag === HostRoot) {
        return fiber
    }
    return null
}
