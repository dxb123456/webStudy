// 第 1 步：创建一个 Vue 实例
const Vue = require('vue')
const app = new Vue({
    template: `<div>
        <header> 你是谁 </header>
        Hello World:{{a}}+{{b}}
        <span :class="className">我是你</span>
        
</div>`,
    data: ()=>{
        return {
            a:1000,
            b:20000,
            className:{
                'pp':true
            }
        }
    }
})

// 第 2 步：创建一个 renderer
const renderer = require('vue-server-renderer').createRenderer()

// 第 3 步：将 Vue 实例渲染为 HTML
// renderer.renderToString(app, (err, html) => {
//     if (err) throw err
//     console.log(html)
//     // => <div data-server-rendered="true">Hello World</div>
// })

// 在 2.5.0+，如果没有传入回调函数，则会返回 Promise：
renderer.renderToString(app).then(html => {
    console.log(html)
}).catch(err => {
    console.error(err)
})
