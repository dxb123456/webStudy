var ws = require('nodejs-websocket')
var fs = require('fs')
var roomLists = require('./rooms.js');
const {roomList} = roomLists;
// 读取文件
// 第一个参数就是要读取的文件路径
// 第二个参数是一个回调函数
//        成功
//          data 数据
//          error null
//        失败
//          data undefined没有数据
//          error 错误对象
// fs.readFile('log.txt', function (error, data) {
//     if (error) {
//         // 在这里就可以通过判断 error 来确认是否有错误发生
//         console.log('读取文件失败了')
//     } else {
//         // 所以我们可以通过 toString 方法把其转为我们能认识的字符
//         console.log(data.toString())
//     }
// })
//
//
function writeFun(str) {

    fs.appendFile('log.txt', `${str}${CurentTime()}\n`, function (error) {
        if (error) {
            console.log('写入失败')
        }
    })
}


var server = ws.createServer(conn => {
    var path = conn.path.slice(2);
    let map = new Map(), chat_name, chat_id;
    var origin = conn.headers.origin;
    if (path) {
        path.split('&').map(item => {
            const [key, value] = item.split('=')
            map.set(key, value)
        })

    }
    chat_name = map.get("chat_name") || '游客';
    chat_id = map.get("chat_id") || parseInt((Math.random() * 10000000000).toFixed(8));

    //监听客户端发的信息
    conn.on('text', function (json) {
        var req = JSON.parse(json);
        //type =1 代表进入房间
        if (req.type == 1) {
            conn.chat_id = req.chat_id;
            conn.roomId = req.roomId;
            var room = roomList.find(item => item.roomId == req.roomId);
            room && room.list.push(conn);
            boardcast({
                //进入 200 ,201 离开，202讲话，
                type: 200,
                roomId: req.roomId,
                chat_id: req.chat_id,
                msg: ` 欢迎 游客${req.chat_id}进入房间！！！ `,
            })
            writeFun(`${origin} ${req.chat_id} 进入id: ${req.roomId} 房间;`)
        }
        if (req.type == 2) {
            boardcast({
                type: 202,
                roomId: req.roomId,
                chat_id: req.chat_id,
                msg: req.input
            })
            writeFun(`${origin} ${req.chat_id}:${req.input};`)
        }
    })


    //给客户端推消息
    conn.sendText(
        JSON.stringify({
            //进入
            type: 0,
            msg: '连接成功!',
            chat_name,
            chat_id,
            roomList: copyObj(roomList)
        }), function () {
            writeFun(`${origin} 连接成功;`)
        }
    )


    conn.on('error', function (err) {
        console.log(err)
    })

    conn.on('close', function () {
        const {roomId, chat_id, headers} = conn;
        const { origin } = headers
        var room = roomList.find(item => item.roomId == roomId);
        if (room) {
            var index = room.list.findIndex(item => item.chat_id == chat_id);
        }
        if (index > -1) {
            writeFun(`${origin} ${chat_id}离开了房间id ${roomId};`)
            room.list.splice(index, 1);
        } else {
            console.log('没找到用户')
        }
        boardcast({
            type: 201,  //对话状态
            msg: `游客${conn.chat_id}离开了房间。`,
            chat_id: conn.chat_id,
            roomId: roomId
        })
    })
}).listen(8002);

    function boardcast(obj) {
        const {roomId, chat_id, type, msg} = obj;
        var room = roomList.find(item => item.roomId == roomId);
        if (!room) {
            console.log('没有找到房间')
            return
        }
        var allUserList = getAllUser(room.list);
        room.list.map(conn => {
            if (type == 202) {
                conn.sendText(JSON.stringify({
                    type: 202,  //对话状态
                    msg: msg,
                    say_chat_id: chat_id
                }))
            }
            if (type == 200) {
                conn.sendText(JSON.stringify({
                    type: 200,  //系统提示
                    roomId: roomId,
                    msg: msg,
                    allUser: allUserList
                }))
            }
            if (type == 201) {
                conn.sendText(JSON.stringify({
                    type: 201,  //离开
                    roomId: roomId,
                    chat_id: chat_id,
                    msg: msg,
                }))
            }
        })


    }

    function CurentTime() {
        var now = new Date();

        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日

        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分

        var clock = year + "-";
        if (month < 10)
            clock += "0";
        clock += month + "-";
        if (day < 10)
            clock += "0";
        clock += day + " ";
        if (hh < 10)
            clock += "0";
        clock += hh + ":";
        if (mm < 10) clock += '0';
        clock += mm;
        return (clock);
    }

    function getAllUser(arr) {
        var array = [];
        arr.map(item => {
            const {chat_id} = item;
            array.push({
                chat_id
            })
        })
        return array
    }

    function deleteUser(arr) {
        var array = [];
        arr.map(item => {
            const {chat_id, chat_name} = item;
            array.push({
                chat_id,
                chat_name
            })
        })
        return array
    }

    function copyObj(arr) {
        var array = [];
        arr.map(item => {
            const {roomId, name} = item
            array.push({
                roomId,
                name
            })
        })
        return array
    }
