/// <reference types="react-scripts" />

// Global Types
type int = number;
type uint = number;
type float = number;
type ufloat = number;

type KeysOfUnion<T> = T extends any ? keyof T : never;

type PromiseResolve = (value?: void | PromiseLike<void> | undefined) => void;
type PromiseReject = (reason?: any) => void;

type Constructor<T> = new (...args: any[]) => T;
type Decorator<T, U extends T> = (Component: Constructor<T>) => Constructor<U>;

type ReadonlyPartial<T> = { readonly [P in keyof T]?: T[P] };
type Writable<T> = { -readonly [K in keyof T]: T[K] };

type Handler<T = any> = (...args: any[]) => T;

interface Dictionary<T> {
  [key: string]: T;
}

interface Tuple<T> {
  [key: number]: T;
}

interface ReadonlyDictionary<T> {
  readonly [key: string]: T;
}

interface ComponentClass<P, S, C extends React.Component<P, S>> extends Constructor<C> {
  propTypes?: React.WeakValidationMap<P>;
  contextType?: React.Context<any>;
  contextTypes?: React.ValidationMap<any>;
  childContextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

declare namespace $[namespace] {
  // write common types here using the namespace so that there is no intersection with other types
}

import $[namespaceAlias] = $[namespace];
