const core = () => {
  const options = {
    states: [] as any[],
    currentStateKey: 0,
  };

  const useState = <T>(initState: T): [() => T, (newState: T) => void] => {
    const { states, currentStateKey: key } = options;
    if (states.length === key) {
      states.push(initState);
    }

    const getState = () => states[key];

    const setState = (newState: T) => {
      states[key] = newState;
    };

    ++options.currentStateKey;
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
