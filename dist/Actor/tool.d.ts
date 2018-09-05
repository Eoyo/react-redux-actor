export declare type mergeObj<T> = {
    [P in keyof T]?: mergeObj<T[P]>;
};
export declare function Merge<T>(srcObj: T, obj: mergeObj<T>): T;
export declare function Various<T extends object>(s: T): (rf: (s: T) => void) => any;
export declare function next(func: Function): Promise<void>;
export declare function Senior(gen: IterableIterator<any>, valueTransformer?: Function, initValue?: any): void;
export declare const SeniorWords: {
    stop: symbol;
};
