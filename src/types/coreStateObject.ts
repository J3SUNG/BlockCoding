type CurrentStateKey = number;
type RenderCount = number;
type Root = HTMLElement | null;
type RootComponent = (() => DocumentFragment) | null;

export interface StateOptions {
  currentStateKey: CurrentStateKey;
  renderCount: RenderCount;
  root: Root;
  rootComponent: RootComponent;
}
