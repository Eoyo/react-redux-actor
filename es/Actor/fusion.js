"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const React = require("react");
const Ele = React.createElement;
function Fusion(store) {
    return function Mapper(mapper) {
        return function ProvideApp(App) {
            return (p) => 
            // Ele  为react.createElement;
            Ele(react_redux_1.Provider, {
                store
            }, Ele(react_redux_1.connect(mapper)(App), p));
        };
    };
}
exports.Fusion = Fusion;
//# sourceMappingURL=fusion.js.map