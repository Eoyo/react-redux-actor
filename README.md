# react-neuron (react-redux-actor 3.0)

这个不是使用人工智能开发 react, 而是借鉴人工神经网络的一小小部分的思想构建前端应用.

当我以神经元的角度来考虑 react 应用中的状态管理器时, 我发现前端中要弄的逻辑与视图的分离,就好比是生物体中大脑和躯体的分离.

如果生命是编程而来的, 那么编程也应当仿生.

react-neuron 要做的就是模拟神经网络搭建应用的状态网络.模拟大脑构建前端应用的逻辑体.

状态管理的思想, 我是从 redux 得来的. 目前的状态管理的内核使用的是 redux.

再此感谢 redux, 因为 react-neuron 接下来的版本将要弃用 redux. react-neuron 将于 2018 年 11 月初正式上线.

将提供一些新的开发理念：

- [ ] disperser, 离约函数.
- [x] 递归归约和自归约.

更强的规范：

1. reducer 不可以监听外部的事件。reducer 内部允许对时间和 sign 做监听式处理。
2. Promise 构造的函数提供可选的 cancleHock，用于外部取消 Promise 的异步链主动释放内存

todo：

- race 和 Promise.race 的比较.
- yet.count 的方式不安全, 应该和每次运行的 reducer 匹配.
- connect, 兼容 react-redux
- state net, 引用修改, 状态传导. 更新事件冒泡.
