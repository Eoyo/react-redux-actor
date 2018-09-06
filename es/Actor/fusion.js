import { connect, Provider } from "react-redux";
import * as React from "react";
var Ele = React.createElement;
export function Fusion(store) {
    return function Mapper(mapper) {
        return function ProvideApp(App) {
            return function (p) {
                // Ele  为react.createElement;
                return Ele(Provider, {
                    store: store
                }, Ele(connect(mapper)(App), p));
            };
        };
    };
}
//# sourceMappingURL=fusion.js.map