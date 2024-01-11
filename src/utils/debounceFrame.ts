export const debounceFrame = (callback: FrameRequestCallback): (() => void) => {
  let nextFrameCallback: number = -1;

  return () => {
    cancelAnimationFrame(nextFrameCallback);
    nextFrameCallback = requestAnimationFrame(callback);
  };
};
