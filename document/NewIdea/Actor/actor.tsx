import { Actor, Fusion } from "../../../es";
// @ts-ignore ; demo 没有react-dom;
import { render } from "react-dom";
/**
 * actor 的基本使用demo
 */

// 构建一个简单的actor;
const actor = Actor({
  name: "default",
  address: "cvte"
})({
  setName: {} as {
    name: string;
  }
})({
  setName: (s, a) => {
    // 使用Actor 2.0 的自动merge, 此处表示只修改状态树上的name.
    return {
      name: a.name
    };
  }
});

// 将actor的store 链接到某个react 的组件上.
const Connected = Fusion(actor.getStore())(s => {
  return {
    name: s.name
  };
})(p => {
  return <div>{p.name}</div>;
});

// 渲染到某个dom 上. 这里主要表明的是Connected 可以当做react的组件使用了.
render(<Connected />, document.getElementById("root"));
// 这时显示的 为: <div>default</div>

// 使用actor上的setName action function触发对应的setName reducer归约.
actor.setName({
  name: "liumiao"
});
// Connected 被修改为: <div>liumiao</div>
