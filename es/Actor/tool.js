var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
export function Merge(srcObj, obj) {
    if (Array.isArray(obj) && Array.isArray(srcObj)) {
        // @ts-ignore;
        return obj;
    }
    else if (typeof obj === "object" && typeof srcObj === "object") {
        // @ts-ignore; srcObj 肯定是object{}; 更新一层object 包装
        srcObj = __assign({}, srcObj);
        for (var x in obj) {
            srcObj[x] = Merge(srcObj[x], obj[x]);
        }
        return srcObj;
    }
    else {
        // @ts-ignore
        return obj;
    }
}
function newState(s) {
    if (Array.isArray(s)) {
        return s.slice();
    }
    else if (typeof s === "object") {
        return __assign({}, s);
    }
    else {
        return s;
    }
}
export function Various(s) {
    var nS = newState(s);
    Object.getOwnPropertyNames(s).forEach(function (d) {
        nS[d] = newState(s[d]);
    });
    return function (rf) {
        rf(nS);
        return nS;
    };
}
export function next(func) {
    return new Promise(function (res) {
        res();
    }).then(function () {
        func();
    });
}
// generator 函数迭代器.
export function Senior(gen, valueTransformer, initValue) {
    var sync = true;
    var i = 0;
    var nextValue = initValue;
    var rus;
    do {
        rus = gen.next(nextValue);
        var transValue = void 0;
        // 不是Promise 的交给Transformer 解析一下;
        if (typeof rus.value === "object" && typeof rus.value.then === "function") {
            transValue = rus.value;
        }
        else {
            transValue = valueTransformer ? valueTransformer(rus.value) : rus.value;
        }
        // Geno自带的解析.
        if (typeof transValue === "object" &&
            typeof transValue.then === "function") {
            transValue.then(function (d) {
                Senior(gen, valueTransformer, d);
            });
            sync = false;
        }
        else {
            nextValue = transValue;
        }
    } while (sync && !rus.done);
}
export var SeniorWords = {
    stop: Symbol("stop")
};
//# sourceMappingURL=tool.js.map