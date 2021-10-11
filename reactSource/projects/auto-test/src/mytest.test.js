const  aa= function(k){
    return k>200 ? "大于200":'<=200'
}
const  bb= function(k){
    return k>200 ? "大于200":'<=200'
}

describe('传入值测试', () => {
    test('测试数据',()=>{
        expect(aa(1000)).toBe("大于200");
        expect(bb(100)).toBe("<=200");
    })
});

