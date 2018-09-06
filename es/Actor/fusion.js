import { connect, Provider } from "react-redux";
import * as React from "react";
const Ele = React.createElement;
export function Fusion(store) {
    return function Mapper(mapper) {
        return function ProvideApp(App) {
            return (p) => 
            // Ele  为react.createElement;
            Ele(Provider, {
                store
            }, Ele(connect(mapper)(App), p));
        };
    };
}
//# sourceMappingURL=fusion.js.map