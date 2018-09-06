"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const tool_1 = require("./tool");
const redux_logger_1 = require("redux-logger");
function specialActions(s, d) {
    switch (d.type) {
        case "redux-actor-merge":
            // merge 的时候也做信道的处理;
            if (s.sign !== undefined && !d.mergeState.sign) {
                s.sign = [];
            }
            return tool_1.Merge(s, d.mergeState);
        case "redux-actor-update":
            return tool_1.Various(s)(ns => ns);
        default:
            if (d.type[0] === "*" && typeof d.yetRus === "object") {
                if (s.sign !== undefined && !d.yetRus.sign) {
                    s.sign = [];
                }
                return tool_1.Merge(s, d.yetRus);
            }
            else {
                return null;
            }
    }
}
function BuildBigReducer(reducers, actions, type) {
    const normal = (state, ac, store) => {
        const isSpecialRus = specialActions(state, ac);
        // 特殊的内置action不使用reducers处理
        if (isSpecialRus) {
            return isSpecialRus;
        }
        else if (typeof reducers[ac.type] === "function") {
            const reducerRus = reducers[ac.type](state, Object.assign({}, actions[ac.type], ac));
            let usertoMerge = reducerRus;
            if (
            // is generator
            typeof reducerRus[Symbol.iterator] === "function") {
                // next promise tick to generate;
                tool_1.next(() => {
                    tool_1.Senior(reducerRus, (yetRus) => {
                        if (typeof yetRus === "function") {
                            return yetRus();
                        }
                        else if (!Array.isArray(yetRus) && typeof yetRus === "object") {
                            return store.dispatch({
                                type: `*[${ac.type}]`,
                                yetRus: yetRus
                            });
                        }
                        else {
                            console.log("Actor reducer wrong state return @" + `*[${ac.type}]`, yetRus);
                            return;
                        }
                    });
                });
                // same state , notthing to do;
                usertoMerge = state;
            }
            // 原对象引用不处理
            if (usertoMerge === state) {
                return state;
            }
            else {
                // auto set sign;
                if (state.sign !== undefined && !reducerRus.sign) {
                    state.sign = [];
                }
                // auto merge
                return tool_1.Merge(state, usertoMerge);
            }
        }
        else {
            if (state.sign !== undefined) {
                state.sign = [];
            } // else {}
            return state;
        }
    };
    if (type === "always") {
        return (s, d, store) => reducers.always(normal(s, d, store), d.type);
    }
    else {
        return normal;
    }
}
function Actor(state) {
    return function Actions(actions) {
        return function Reducers(reducers) {
            // 建立 reducer , store
            const isAlways = reducers.always ? "always" : "normal";
            const bigReducer = BuildBigReducer(reducers, actions, isAlways);
            // 不直接开发成redux的中间件, 避免和redux 耦合过多, Actor 4.0 可能使用新的内核.
            const store = redux_1.createStore((s = state, d) => {
                return bigReducer(s, d, store);
                // @Middleware here!!
            }, redux_1.applyMiddleware(redux_logger_1.default));
            // });
            // Actor预留的函数
            const rus = {
                getStore() {
                    return store;
                },
                merge(obj) {
                    store.dispatch({
                        type: "redux-actor-merge",
                        mergeState: obj
                    });
                },
                update() {
                    store.dispatch({
                        type: "redux-actor-update"
                    });
                },
                grab(graber) {
                    if (graber) {
                        return graber(store.getState());
                    }
                    else {
                        return store.getState();
                    }
                },
                subscribe(follower) {
                    return store.subscribe(() => {
                        tool_1.next(() => {
                            const state = store.getState();
                            follower(state);
                        });
                    });
                },
                pipe(actor, func) {
                    store.subscribe(() => {
                        const mergeState = func(store.getState());
                        actor.merge(mergeState);
                    });
                }
            };
            // 构造用户的action函数到Actor上;
            Object.getOwnPropertyNames(actions).forEach(d => {
                // @ts-ignore; 注入
                rus[d] = (prop) => {
                    store.dispatch({
                        type: d,
                        ...prop
                    });
                };
            });
            // 作为真正的ActorRus返回
            return rus;
        };
    };
}
exports.Actor = Actor;
// 动作分解, 主要是为了类型!
function Act() {
    return function Actions(actions) {
        return function Reducers(reducers) {
            return {
                reducers,
                actions
            };
        };
    };
}
exports.Act = Act;
//# sourceMappingURL=actor.js.map