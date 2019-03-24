version

----- 2018-08-30

----- goto [redux-actor](redux-actor.md)

----- goto [Actor Demo](https://github.com/Eoyo/RandomRectDemo)

# Actor 2.0 , 状态管理器 ([redux-actor](redux-actor.md) 的升级版本)

redux 的思想是对的, 只是他的实现需要 Actor 来加强.

## Actor 2.0 版本的主要的新特性

1. 高阶函数的写法
2. 自动 merge
3. 解构模块化
4. 信号状态 sign;
5. 支持 generate 函数.

## 1. 高阶函数的写法

其实就是把三个参数变成了三个函数的方式传入.
依次分别是:

1. initState, 初始化的状态
2. actionInit, action 函数的初始参数.
3. reducers, 和 action 一一对应的归约函数.

```typescript
const app = Actor({
  person: {
    name: "liu",
    age: 100
  },
  data: {
    address: "cvte"
  }
})({
  setName: {
    newName: ""
  }
})({
  setName: (s, a) => {
    return {
      person: {
        name: a.newName
      }
    };
  }
});

// app上存在和reducers, action一一对应的action function.
app.setName({
  newName: "xutao"
});
```

### 1.2

## 2. Reducer 返回值时自动 Merge

基于 redux 的思想, reducer 的过程中每次都得返回一个新的对象. 受到之前的 1.0 版本的 Actor 的 merge 函数的启发, 我们的 Actor 的 reducer 函数也具有 Merge 的能力了.

### 1.1 为了了解 merge 的需求, 可以先看看如下没有自动 merge 的日子, 和有了自动 merge 后的比较.

```typescript
// 假设初始的状态如下:
const state = {
  person: {
    name: 'liumiao',
    age: '??'
  }
  data: {
    address: 'cvte'
  }
}

// 如下前两个归约函数为之前 redux 思路下的常见写法.
const reducers = {
  // setName reducers 会意外的不会触发被链接的react元素的更新渲染. 初学者极易犯这个错误.
  setName(s, action: { newName: string }) {
    const newState = {...s};
    newSate.person.name = newName;
    return newState;
  },

  // setName 改为如下的setNewName的写法就可如预期的触发react元素的更新渲染
  setNewName (s, action: {newName: string}) {
    return {
      ...s,
      person: {
        ...s.person,
        name: action.newName
      }
    }
  },

  // 如果加上了自动merge, 可以省去'...', 可以让开发者更加的关注状态树上到底更新了哪里.
  // 也可以避免犯无法更新的错.
  setNewNameAuto(s, action: {newName: string}) {
    return {
      person: {
        name: action.newName
      }
    }
  }
};
```

### 1.2 自动 merge 的使用约定

0. **状态树的一个子结构**. Actor 具有优秀的类型推断, 当 return 的不是一个状态树的子结构时会报错, 在编写的时候也有类型提示.

1. **reducer 的开发统一依赖自动 merge**, 当有了自动 merge 后应该统一使用自动 merge. 当前 Actor 默认所有的 redcuer 是一个返回 **用于自动 merge的对象** 的函数. 将来可能有依赖于自动 merge 的开发思路, 例如 接下来的 **sign**;

1. **返回空对象用于表示不更新** 当你就是不想更新时可以用空字对象{}. 遵守约定 1 : 不可使用直接返回 s 的方式

```typescript
// 直接返回 s 也不会触发更新, 但是这会让代码不那么直观了, 同时也会导致下面sign使用的不安全
const reducers = {
  doNothing(s, a) {
    return {};
  }
};
```

## 2. 状态中用于通讯的特殊属性 sign

### 2.1 sign 的来源

最初 sign 是为了解决 Team 项目 1 期中使用了多个 Actor 的坑

> #### 早期为啥使用了多个 Actor?
>
> 1. **便于分工**, 基于以往的开发经验, 一个人负责一个组件的全部开发. (react 的模版, 状态归约的函数, css 样式 等). Actor 作为状态控制器,自然而然的, 一个人负责一个复杂的组件就建立一个 Actor. 这样分工开发时可以互不影响.
> 2. **可以使用命名空间管理**, Actor 放在了全局的命名空间 S 上, 当在业务中需要控制其他的组件的时候,可以直接通过 S.[actor 的 名字]获取到这个组件对应的 Actor, 通过调用这个组件的 Actor 的 action 函数控制这部分组件的行为.
> 3. **订阅同一个 Actor 可以实现数据共享**, 当多个 Actor 需要共享同一份数据时, 可以向同一个 Actor 订阅. 也就是使用 Actor 的 Subscribe 方法. 用于将父 Actor 的数据映射给子 Actor.
> 4. **Actor 树状网络** : Actor 网搭建好了之后, 子 Actor 向外依赖的数据,可以通过调用父 Actor 的 action 函数触发归约, 子Actor 收到新的父 state, 然后才更新自己向上依赖的数据. 当一个子 Actor 的内部发生更新时, 由于其他的子 Actor 没有订阅, 不会造成额外的数据消耗.

如果两个 Actor 之间没有订阅的关系, 一切都很简单. 就算是在一个 Actor 的 Reducer 中直接调用另一个 Actor 也可以. 一旦有了订阅的关系, 这样做就会有问题. redux 归约的内部容易报 **双 reducer 的错误**, 这是时很有可能是陷入了 **归约的死循环**. 为了在可能发生死循环的使用场景中下避免死循环,引入了 sign. sign 可以标记当前的归约的意图是什么, 当状态树上 **出现了特定的 sign 就停止归约**.

### 2.2 使用 sign 的 信号数组通讯

目前的 sign 是一个字符串数组, 在 Actor 中的具体写法如下:  
[signTest](../../../src/forDocument/signTest.ts)  
[signTestOption](../../../src/forDocument/signTestOption.ts)

```typescript
// 代码 signTest;
const signTest = Actor({
  sign: [] as "scroll" | "click"[],
  data: {
    name: ""
  }
})({
  clickName: {
    name: ""
  },
  getName: {}
})({
  clickName: (s, a) => {
    return {
      sign: ["click"],
      data: {
        name: a.name
      }
    };
  },
  getName: (s, a) => {
    return {};
  }
});

// 依次执行clickName,  getName,
signTest.clickName({
  name: "string"
});
signTest.getName({});

// 在其他地方对sign做出判断
signTest.subscribe(s => {
  if (s.sign.indexOf("click") >= 0) {
    // do something;
  }
});
```

代码 signTest 的运行后, 内部的状态是?

```typescript
// A
const stateA = {
  sign: ["click"],
  data: {
    name: "string"
  }
};

// B
const stateB = {
  sign: [],
  data: {
    name: ""
  }
};

// C
const stateC = {
  sign: [],
  data: {
    name: "string"
  }
};

// 答案详见文末, signTest
```

sign 用于在状态树上标记一次当前 action 函数的意图.

1. sign 是 **描述当前状态树**的数据应当用于干啥的.
2. 通俗的说就是状态树上发生的一个 **事件**.
3. sign 的消息是一次性的, reducer 返回的 merge 对象中只有主动的标记了 sign 的, 才会使得归约的时候让状态树中的 sign 中有内容, 否则 状态树中的 sign 会被 **自动清空成空数组**.

> #### sign 为啥是个数组?? 且放在了状态树上?
>
> 1. Actor 内部比较实现方便.
> 2. 一个 reduce 的过程可能要通知多个事件到状态树上.
> 3. 使用方便, 只是监听状态树就可以了, 不用改变已有的开发方式.

### 2.3 sign 的使用例子

案例场景: 开发一个控制页面滚动的 react 组件 Scroll, 同时开发一个侧边 悬停的按钮集合 Control 控制页面滚动. 要求页面切换, 数据刷新等都不会触发页面的滚动. 只有通过点击 Control 组件, 才触发 Srcoll 的滚动.

分析:

1. 状态树上肯定要保存 Scroll 滚动到哪里的状态; 并有个状态 scrollable, 记录是否应该滚动.
2. 控制页面切换的, 数据刷新的不滚动, 这时需要将 scrollable 设置为 false;
3. 点击 Control 时设置 scrollable 为 true;
4. 实际上, 不只是页面切换， 或数据刷新需要将 scrollable 设置为 false, 其实很可能是除了Control 的点击是把 scrollable 设为 true 外, 所有其他的 action 触发,都要把 scrollable 设置为 false;
5. 每次新加一个 action 时都要考虑是否要把 scrollable 设置为 false;
6. 为了降低问题的复杂度, 把 scrollable 替换为 sign 就可以了.

使用 sign:

1. scrollable 的 sign只用Control 触发, 其他的 action 不想触发滚动时可以不用显式的标记出来.
2. sign 其实就是实现了一个事件机制, 可以方便的实现组件之间点对点的控制.

### 2.4 sign 的使用约定

纯粹的 redux 思路可以满足 90%的应用场景, 加入了 sign 是为了服务剩下的 10%的特殊场景的. 因此有如下的一些约定:

1. **尽可能少用 sign**, 两个组件之间对于 sign 的依赖是离散耦合的,这使得程序设计变得灵活了的同时,也增加了不可控性. 总之目前的 sign 尽可能少用.
2. **sign 只能定义成字符串数组**, 考虑到兼容性, 以及兼顾一次性发出多个 sign 的情况.

### 2.5 sign 的通俗介绍

sign 主要是为了满足事件通讯的需求.

1. 在以往 redux 的思路下通知事件, 直接把事件状态标记在状态树上, 就好比立了一个明天大甩卖的牌子, 看到的人会一直以为是明天.
2. 使用 sign , 则是大声的喊买, 喊完了就没了 , 这个信息就一次性的传出去了.

## 3. 使用解构赋值的模块化方案

一个 Actor 的内容可能很庞大, reducer 的数量可能很多. 目前采用了解构赋值的模块化方案, 用于拆分一个 Actor. 减少单文件的代码量, 同时又能够保证类型.

把一个 Actor 模块化称为 **动作分解**.

```typescript
type State = {
  sign: 'click' | 'scroll' [];
  data: {
    name:string
  }
}

// 动作分解函数, 使用方式和Actor极其的类似, 只是第一个参数的不同--初始状态不传, 只是使用<>传类型.
// 他实际生成的是一个动作分解对象, 只是包含actions 和reducers 两个属性.
const nameOperate = Act<State>()({
  getName : {},
  clickName: {
    name: "",
  },
})({
  getName: (s, a) => {
    return {};
  },
  clickName: (s, a) => {
    return {
      sign: ["click"],
      data: {
        name: a.name,
      },
    };
  }
})


// 之前的signTest可以改写为
const signTest = Actor <State>({
  sign: [],
  data: {
    name: "",
  },
})({
  ...nameOperate.actions,
})({
  ...nameOperate.reducers
})
```

但是这只是实现了一个大 Actor 的分解而已, 没有实现状态树的 state 的分解. Actor 3.0 (下一个版本)将提供将多个 actor 联系起来用于共用一个状态树的方式, 并且保证每个 Actor 的独立性. 目前我个人已经构思出了许多的可能的雏形. 其难度比想象中的要大, 很多方案已经被我自己干掉了. 因此我放缓了研发进一步的 Actor 模块化方案, 转为研发更重要的 generate 函数的支持.

## 4. 支持 generate 函数用于实现异步的归约.

generate 函数是 ES6 的新特性, Actor 支持把 reducer 直接写成 generate 函数实现异步的归约.  
进入了 generate 的时代, 代码看起来高级那么一点点了.

```typescript
const reducers = {
  fetchData: function * (s, a) {

    // yield 一个对象, 将会触发自动merge到状态树上, 将状态树loading设为true;
    yield {
      loading: true;
    }

    // yield 了一个promise 对象, 此处发生了一次异步!!!, 异步返回的结果赋值给res;
    const res = yield getDataFrom('cvte.com');


    // 再次yield一个对象, 触发自动merge, 关闭了loading, 填充数据.
    yield {
      loading: false,
      data: {
        html: res.data
      }
    }
  }
}
```

以上就是目前 Actor 的 generate函数的全部功能啦. 是不是很简单?

Actor 2.0 后期的研发工作需要进一步完善 generate.

1. **容易让新手犯错** , generate 函数看起来是同步的函数, 实际上执行的时候是分段异步了的. 容易让新手误以为 generate 函数传进来的 s, 可以在第二次 yield mergeObj 的时候还是可以用的. 其实这不对, 是需要重新获取一遍 s(状态树)的. 因为异步的期间可能有其他的操作改变了状态树. 每次归约的时候传入的 s 都是一个新对象, 这是因为状态树本身就是变成了一个新的对象. 因此异步之后 s 有可能不是指当前的状态树了. 需要手动获取.
2. **缺少异步流程的控制工具** , 在异步业务的实际开发过程中会碰到许多的常用的异步流程的控制, 例如只是用 **最后一次** 的 generate 归约的值或是 **取消** 其他正在处理的流程. 虽然都可以手动的实现, 但是为了保证大家代码的清晰度, 和不必要的重复劳动, 有必要开发一个 Actor 的统一的异步管理工具.(直接拿 saga 来用是不可能了, 因为 saga 太针对 redux 了, 只能抄点源码过来); 这里已经专门的分出了一个小项目: BuildGenerator , 用于生成自动迭代 generate 函数的工具的工具.
3. **不可以 yield 一个数组**, 今后也不打算支持 yield 一个数组的. yield 一个数组使得代码复杂度变得太高了, 直接拒绝使用!

## 5. 小问题的答案.

1. signTest: C
