import { Store } from "redux";
import { mergeObj } from "./tool";
interface Unsubscribe {
    (): void;
}
declare type ActorReserve<S> = {
    merge(obj: mergeObj<S>): void;
    update(): void;
    subscribe(follower: (obj: S) => void): Unsubscribe;
    grab: {
        <T>(graber: (obj: S) => T): T;
        (): S;
    };
};
declare type CustomRus<A> = {
    [x in keyof A]: (actionData: A[x]) => void;
};
declare type MergePipe<S> = {
    pipe<state>(actor: ActorReserve<state>, transform: (s: S) => mergeObj<state>): void;
};
declare type GetStore<S> = {
    getStore(): Store<S>;
};
declare type ActorRus<S, A> = GetStore<S> & ActorReserve<S> & CustomRus<A> & MergePipe<S>;
declare type oneReducer<S, A, x extends keyof A> = (s: S, d: A[x] & {
    type: x;
}) => mergeObj<S> | IterableIterator<mergeObj<S> | (() => void) | Promise<any>>;
declare type ActorReducer<S, A> = {
    [x in keyof A]: oneReducer<S, A, x>;
};
export declare function Actor<S>(state: S): <A extends object>(actions: A) => (reducers: ActorReducer<S, A> & {
    always?: (s: S, t?: keyof A) => S;
}) => ActorRus<S, A>;
export declare function Act<S>(): <A extends object>(actions: A) => (reducers: ActorReducer<S, A>) => {
    reducers: ActorReducer<S, A>;
    actions: A;
};
export {};
