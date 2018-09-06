var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { createStore, applyMiddleware } from "redux";
import { Merge, next, Senior, Various } from "./tool";
import logger from "redux-logger";
function specialActions(s, d) {
    switch (d.type) {
        case "redux-actor-merge":
            // merge 的时候也做信道的处理;
            if (s.sign !== undefined && !d.mergeState.sign) {
                s.sign = [];
            }
            return Merge(s, d.mergeState);
        case "redux-actor-update":
            return Various(s)(function (ns) { return ns; });
        default:
            if (d.type[0] === "*" && typeof d.yetRus === "object") {
                if (s.sign !== undefined && !d.yetRus.sign) {
                    s.sign = [];
                }
                return Merge(s, d.yetRus);
            }
            else {
                return null;
            }
    }
}
function BuildBigReducer(reducers, actions, type) {
    var normal = function (state, ac, store) {
        var isSpecialRus = specialActions(state, ac);
        // 特殊的内置action不使用reducers处理
        if (isSpecialRus) {
            return isSpecialRus;
        }
        else if (typeof reducers[ac.type] === "function") {
            var reducerRus_1 = reducers[ac.type](state, Object.assign({}, actions[ac.type], ac));
            var usertoMerge = reducerRus_1;
            if (
            // is generator
            typeof reducerRus_1[Symbol.iterator] === "function") {
                // next promise tick to generate;
                next(function () {
                    Senior(reducerRus_1, function (yetRus) {
                        if (typeof yetRus === "function") {
                            return yetRus();
                        }
                        else if (!Array.isArray(yetRus) && typeof yetRus === "object") {
                            return store.dispatch({
                                type: "*[" + ac.type + "]",
                                yetRus: yetRus
                            });
                        }
                        else {
                            console.log("Actor reducer wrong state return @" + ("*[" + ac.type + "]"), yetRus);
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
                if (state.sign !== undefined && !reducerRus_1.sign) {
                    state.sign = [];
                }
                // auto merge
                return Merge(state, usertoMerge);
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
        return function (s, d, store) {
            return reducers.always(normal(s, d, store), d.type);
        };
    }
    else {
        return normal;
    }
}
export function Actor(state) {
    return function Actions(actions) {
        return function Reducers(reducers) {
            // 建立 reducer , store
            var isAlways = reducers.always ? "always" : "normal";
            var bigReducer = BuildBigReducer(reducers, actions, isAlways);
            // 不直接开发成redux的中间件, 避免和redux 耦合过多, Actor 4.0 可能使用新的内核.
            var store = createStore(function (s, d) {
                if (s === void 0) { s = state; }
                return bigReducer(s, d, store);
                // @Middleware here!!
            }, applyMiddleware(logger));
            // });
            // Actor预留的函数
            var rus = {
                getStore: function () {
                    return store;
                },
                merge: function (obj) {
                    store.dispatch({
                        type: "redux-actor-merge",
                        mergeState: obj
                    });
                },
                update: function () {
                    store.dispatch({
                        type: "redux-actor-update"
                    });
                },
                grab: function (graber) {
                    if (graber) {
                        return graber(store.getState());
                    }
                    else {
                        return store.getState();
                    }
                },
                subscribe: function (follower) {
                    return store.subscribe(function () {
                        next(function () {
                            var state = store.getState();
                            follower(state);
                        });
                    });
                },
                pipe: function (actor, func) {
                    store.subscribe(function () {
                        var mergeState = func(store.getState());
                        actor.merge(mergeState);
                    });
                }
            };
            // 构造用户的action函数到Actor上;
            Object.getOwnPropertyNames(actions).forEach(function (d) {
                // @ts-ignore; 注入
                rus[d] = function (prop) {
                    store.dispatch(__assign({ type: d }, prop));
                };
            });
            // 作为真正的ActorRus返回
            return rus;
        };
    };
}
// 动作分解, 主要是为了类型!
export function Act() {
    return function Actions(actions) {
        return function Reducers(reducers) {
            return {
                reducers: reducers,
                actions: actions
            };
        };
    };
}
//# sourceMappingURL=actor.js.map