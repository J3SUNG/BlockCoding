import { debounceFrame } from '../utils/debounceFrame';

export interface StateOptions {
  renderCount: number;
  states: { [key: string]: any };
  root: HTMLElement | null;
  rootComponent: (() => DocumentFragment) | null;
}

const core = () => {
  const options: StateOptions = {
    renderCount: 0,
    states: {},
    root: null,
    rootComponent: null,
  };

  const useState = <T>(id: string, initState: T): [T, (newState: T) => void] => {
    if (!options.states[id]) {
      options.states[id] = initState;
    }

    const setState = (newState: T) => {
      options.states[id] = newState;
      innerRender();
    };

    return [options.states[id], setState];
  };

  const innerRender = debounceFrame(() => {
    const { root, rootComponent } = options;

    if (!root || !rootComponent) {
      return;
    }

    root.innerHTML = '';
    root.appendChild(rootComponent());
    options.renderCount += 1;
  });

  const render = (rootComponent: () => DocumentFragment, root: HTMLElement) => {
    options.root = root;
    options.rootComponent = rootComponent;
    innerRender();
  };

  return { useState, render };
};

export const { useState, render } = core();
