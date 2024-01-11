import { StateOptions } from '../types/coreStateObject';
import { debounceFrame } from '../utils/debounceFrame';

const core = () => {
  const options: StateOptions = {
    currentStateKey: 0,
    renderCount: 0,
    root: null,
    rootComponent: null,
  };

  const _render = debounceFrame(() => {
    options.currentStateKey = 0;
    const { root, rootComponent } = options;
    if (!root || !rootComponent) return;
    root.innerHTML = '';
    root.appendChild(rootComponent());
    options.renderCount += 1;
  });

  const render = (rootComponent: () => DocumentFragment, root: HTMLElement) => {
    options.root = root;
    options.rootComponent = rootComponent;
    _render();
  };

  return { render };
};

export const { render } = core();
