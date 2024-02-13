const core = () => {
  const states = {} as { [key: string]: any };
  let prevName: string | null = null;
  let animationFrameId: number | null = null;

  const useState = <T>(id: string, initState: T): [() => T, (newState: T) => void] => {
    if (!states[id]) states[id] = initState;

    const getState = () => states[id];
    const setState = (newState: T) => (states[id] = newState);

    return [getState, setState];
  };

  const render = (child: HTMLElement, root: HTMLElement, name: string, index?: number) => {
    if (!root || !child) {
      return;
    }

    if (animationFrameId !== null && prevName === name) {
      cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = requestAnimationFrame(() => {
      if (index !== undefined && root.childNodes[index]) {
        root.replaceChild(child, root.childNodes[index]);
      } else {
        root.innerHTML = '';
        root.appendChild(child);
      }
    });

    prevName = name;
  };

  return { useState, render };
};

export const { useState, render } = core();
