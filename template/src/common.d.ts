/// <reference types="node" /><% if (react) { %>
/// <reference types="react" />
/// <reference types="react-dom" />
<% } %>

declare type int = number;
declare type uint = number;
declare type float = number;
declare type ufloat = number;

declare type KeysOfUnion<T> = T extends any ? keyof T : never;
declare type PickField<T, K extends keyof T> = T[K];

declare type PromiseResolve = (value?: void | PromiseLike<void> | undefined) => void;
declare type PromiseReject = (reason?: any) => void;

declare type Constructor<T extends object> = T extends object ? new (...args: any[]) => T : never;
declare type Decorator<T extends object, U extends T> = (Component: Constructor<T>) => Constructor<U>;

declare type ReadonlyPartial<T> = { readonly [P in keyof T]?: T[P] };
declare type Writable<T> = { -readonly [K in keyof T]: T[K] };

declare type Handler<T = any> = (...args: any[]) => T;

declare interface Dictionary<T> {
  [key: string]: T;
}

declare interface Tuple<T> {
  [key: number]: T;
}

declare interface ReadonlyDictionary<T> {
  readonly [key: string]: T;
}

<% if (react) { %>
declare interface ComponentClass<P, S, C extends React.Component<P, S>> extends Constructor<C> {
  propTypes?: React.WeakValidationMap<P>;
  contextType?: React.Context<any>;
  contextTypes?: React.ValidationMap<any>;
  childContextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<P>;
  displayName?: string;
}

declare function shallow<C extends React.Component, P = C["props"], S = C["state"]>(
  node: React.ReactElement<P>,
  options?: import("enzyme").ShallowRendererProps
): import("enzyme").ShallowWrapper<P, S, C>;
declare function shallow<P>(
  node: React.ReactElement<P>,
  options?: import("enzyme").ShallowRendererProps
): import("enzyme").ShallowWrapper<P, any>;
declare function shallow<P, S>(
  node: React.ReactElement<P>,
  options?: import("enzyme").ShallowRendererProps
): import("enzyme").ShallowWrapper<P, S>;

declare function mount<C extends React.Component, P = C["props"], S = C["state"]>(
  node: React.ReactElement<P>,
  options?: import("enzyme").MountRendererProps
): import("enzyme").ReactWrapper<P, S, C>;
declare function mount<P>(
  node: React.ReactElement<P>,
  options?: import("enzyme").MountRendererProps
): import("enzyme").ReactWrapper<P, any>;
declare function mount<P, S>(
  node: React.ReactElement<P>,
  options?: import("enzyme").MountRendererProps
): import("enzyme").ReactWrapper<P, S>;

declare function render<P, S>(node: React.ReactElement<P>, options?: any): Cheerio;
<% } %>

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly PUBLIC_URL: string;
  }

  interface Global {
    <% if (react) { %>
    shallow<C extends React.Component, P = C["props"], S = C["state"]>(
      node: React.ReactElement<P>,
      options?: import("enzyme").ShallowRendererProps
    ): import("enzyme").ShallowWrapper<P, S, C>;
    shallow<P>(
      node: React.ReactElement<P>,
      options?: import("enzyme").ShallowRendererProps
    ): import("enzyme").ShallowWrapper<P, any>;
    shallow<P, S>(
      node: React.ReactElement<P>,
      options?: import("enzyme").ShallowRendererProps
    ): import("enzyme").ShallowWrapper<P, S>;

    mount<C extends React.Component, P = C["props"], S = C["state"]>(
      node: React.ReactElement<P>,
      options?: import("enzyme").MountRendererProps
    ): import("enzyme").ReactWrapper<P, S, C>;
    mount<P>(
      node: React.ReactElement<P>,
      options?: import("enzyme").MountRendererProps
    ): import("enzyme").ReactWrapper<P, any>;
    mount<P, S>(
      node: React.ReactElement<P>,
      options?: import("enzyme").MountRendererProps
    ): import("enzyme").ReactWrapper<P, S>;

    render<P, S>(node: React.ReactElement<P>, options?: any): Cheerio;
    <% } %>
  }
}


declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  <% if (react) { %>export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;<% } %>

  const src: string;
  export default src;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare namespace <%= namespace %> {
  // write common types here using the namespace so that there is no intersection with other types
}

import <%= namespaceAlias %> = <%= namespace %>;
