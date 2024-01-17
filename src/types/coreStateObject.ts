type CurrentStateKey = number;
type RenderCount = number;
type States = any[];
type Root = HTMLElement | null;
type RootComponent = (() => DocumentFragment) | null;

export interface StateOptions {
  currentStateKey: CurrentStateKey;
  renderCount: RenderCount;
  states: States;
  root: Root;
  rootComponent: RootComponent;
}
