import { Store } from "redux";
import { connect, Provider } from "react-redux";
import * as React from "react";
const Ele = React.createElement;
export function Fusion<S>(store: Store<S>) {
  return function Mapper<Props>(mapper: (state: S, ownProps?: any) => Props) {
    return function ProvideApp<ownProps = {}>(
      App: (p: Props & ownProps) => JSX.Element | null
    ) {
      return (p: ownProps) =>
        // Ele  为react.createElement;
        Ele(
          Provider,
          {
            store
          },
          Ele(connect(mapper)(App), p as any)
        );
    };
  };
}
