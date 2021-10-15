import { render, screen,fireEvent,RenderResult } from '@testing-library/react';
import App from './App';
//    运行npm test -- --coverage查看


// test('renders learn react link', () => {
//   // render 方法返回一个包裹对象 对象中包括一些对 DOM 的查询/获取方法
//   render(<App />);
//   // getByText: 通过标签的 text 获取 DOM
//   // 获取 text 匹配正则 /learn react/i 的 DOM
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

let wrapper;

// 运行每一个测试用例前先渲染组件
beforeEach(() => {
  wrapper = render(<App />);
});
//test('测试用例的描述', () => {});
describe('Should render App component correctly', () => {
  // 初始化文本内容为 "Hello World!"
  test('Should render "Hello World!" correctly', () => {
    // getByTestId: 通过属性 data-testid 来获取对应的  DOM
    // 这里我们获取到的是上面 HelloWorld 组件中的 div 标签
    const app = wrapper.getByTestId('container');
    expect(app).toBeInTheDocument();
    // 判断获取到的标签是否是 div
    expect(app.tagName).toEqual('DIV');
    // 判断 div 标签的 text 是否匹配正则 /world/i
    expect(app.textContent).toMatch(/world/i);
  });

  // 点击后文本内容为 "Hello Jack!"
  test('Should render "Hello Jack!" correctly after click', () => {
    const app = wrapper.getByTestId('container');
    // fireEvent: 模拟点击事件
    fireEvent.click(app);

    setTimeout(()=>{
      expect(app.textContent).toMatch(/world/i);
    })

  });
});



