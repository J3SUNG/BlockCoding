const core = () => {
  const states = {} as { [key: string]: any };

  const useState = <T>(id: string, initState: T): [() => T, (newState: T) => void] => {
    if (!states[id]) states[id] = initState;

    const getState = () => states[id];
    const setState = (newState: T) => (states[id] = newState);

    return [getState, setState];
  };

  const render = (child: HTMLElement, root: HTMLElement, index?: number) => {
    if (!root || !child) {
      return;
    }

    if (index !== undefined) {
      root.replaceChild(child, root.childNodes[index]);
    } else {
      root.innerHTML = '';
      root.appendChild(child);
    }
  };
  return { useState, render };
};

export const { useState, render } = core();
