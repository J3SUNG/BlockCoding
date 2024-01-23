import { debounceFrame } from '../utils/debounceFrame';

interface StateOptions {
  currentStateKey: number;
  renderCount: number;
  states: any[];
  root: HTMLElement | null;
  rootComponent: (() => DocumentFragment) | null;
}

const core = () => {
  const options: StateOptions = {
    currentStateKey: 0,
    renderCount: 0,
    states: [],
    root: null,
    rootComponent: null,
  };

  const useState = <T>(initState: T): [T, (newState: T) => void] => {
    const { currentStateKey: key, states } = options;

    if (states.length === key) {
      states.push(initState);
    }

    const setState = (newState: T) => {
      states[key] = newState;
      _render();
    };
    const state = states[key];

    options.currentStateKey += 1;

    return [state, setState];
  };

  const _render = debounceFrame(() => {
    options.currentStateKey = 0;
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
    _render();
  };

  return { useState, render };
};

export const { useState, render } = core();
