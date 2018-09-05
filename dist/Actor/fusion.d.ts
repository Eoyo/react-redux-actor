import { Store } from "redux";
import { Provider } from "react-redux";
import * as React from "react";
export declare function Fusion<S>(store: Store<S>): <Props>(mapper: (state: S, ownProps?: any) => Props) => <ownProps = {}>(App: (p: Props & ownProps) => JSX.Element) => (p: ownProps) => React.ComponentElement<Readonly<{
    children?: React.ReactNode;
}> & Readonly<import("react-redux").ProviderProps>, Provider>;
