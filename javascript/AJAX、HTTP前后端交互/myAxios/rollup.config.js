import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
    input:'axios.js',
    output:{
        file:'../4.1.myaxios.js',
        format:'iife'
    },
    plugins:[
        resolve(),
        commonjs()
    ]
}

// export default {
//     input: 'axios.js',
//     output: {
//         file: 'index.js',
//         format: 'cjs'
//     }
// }
