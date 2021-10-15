import {aa,bb,throwFun,axiosPost} from './mytest'

describe('传入值测试', () => {
    test('测试数据',()=>{
        expect(aa(1000)).toBe("大于200");
        expect(bb(100)).toBe("<=200");
        const  a={number:100}
        expect(a).toEqual(a);
        expect(null).toBeNull();
        expect(undefined).toBeUndefined();
        expect(11).toBeDefined();
        expect(1).toBeTruthy();
        expect(0).toBeFalsy();
        expect(0).toBeGreaterThan(-1);
        expect(0.1+0.2).toBeCloseTo(0.3)
        expect('张三，李四，王五').toMatch('三')
        expect(['张三','李四']).toContain('张三')
        expect(throwFun).toThrow('this is a error!')
        // expect(throwFun).not.toThrow('a error!')
    })

});


//匹配器
// 1) toBe(内容)     //匹配  ===
//  2)toEqual()     //内容结果的匹配  ==
//  3)toBeNull()    //匹配null
//  4)toBeUndefined //匹配undefined
//  5)toBeDefined   //匹配非undefined
//  6)toBeTruthy()  //匹配true
//  7)toBeFalsy()   //匹配false


//  8)toBeGreaterThan()   //大于
//  9)toBeLessThan()      //小于
//  10)toBeGreaterThanOrEqual() //大于等于
//  11)toBeCloseTo()     //解决浮点错误 eg：0.1+0.2 === 0.3


//  12)toMatch(str)   str是否在前面的字符串中
//  13)toContain(str)  //数组(或者Set)中匹配str

// 13)toThrow()   匹配异常
//  14)toThrow(str) //异常的内容应该和str一致
//  15)更多 https://jestjs.io/zh-Hans/docs/using-matchers



describe('异步接口测试！', () => {
    // 点击后文本内容为 "Hello Jack!"
    test('axios-post测试', async() => {
        const response = await axiosPost();
        expect(response.code).toBe(0)
    });
});
