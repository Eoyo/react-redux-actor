import { Actor } from "src/stores/Actor/actor";

/**
 * 1. actor 的代码设计从状态树的设计入手.
 * 2. 每个状态接口使用类定义, 这些类为接口类;
 * 3. 打破namspace 的限制, 使用类的思想指导状态设计.
 */

export class Person {
  name = "";
}
export class PersonSelector extends Person {
  selected: boolean = false;
}
export class StateDesign {
  person = new Person();
}

// 归约逻辑通常不复用. 顶层的接口是全局的
export const stateDesign = Actor(new StateDesign())({
  setName: { name: "" },
})({
  setName: (s, a) => {
    return {
      person: {
        name: a.name,
      },
    };
  },
});
