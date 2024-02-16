import { WorkspaceData } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { zip } from '../../utils/zipBlock';

interface UrlCopyButtonProps {
  getWorkspaceData: () => WorkspaceData;
}

export const urlCopyButton = ({ getWorkspaceData }: UrlCopyButtonProps) => {
  const element = createElementCommon('button', {
    type: 'button',
    className: 'bg-gray',
    textContent: 'URL Copy',
    style: 'width: 100px',
  });

  element.addEventListener('click', () => {
    const url = new URL(window.location.origin) + '?workspaceData=';
    const zipWorkspaceData = JSON.stringify(zip(getWorkspaceData()));
    const URL_MAX_SIZE = 9600;
    const COLOR_RED = 'rgb(255 69 58)';
    const COLOR_GREEN = 'rgb(34 197 94)';
    const COLOR_GRAY = 'rgb(100 116 139)';
    const COPY_TEXT = 'URL Copy';
    const COPIED_TEXT = 'Copied!';
    const FAIL_TEXT = 'Fail Large!';
    const BUTTON_ACTIVE_TIME = 1000;

    if (element instanceof HTMLButtonElement) {
      element.disabled = true;
      if (zipWorkspaceData.length > URL_MAX_SIZE) {
        element.textContent = FAIL_TEXT;
        element.style.backgroundColor = COLOR_RED;
      } else {
        navigator.clipboard.writeText(url + zipWorkspaceData);
        element.textContent = COPIED_TEXT;
        element.style.backgroundColor = COLOR_GREEN;
      }

      setTimeout(() => {
        element.textContent = COPY_TEXT;
        element.style.backgroundColor = COLOR_GRAY;
        element.disabled = false;
      }, BUTTON_ACTIVE_TIME);
    }
  });

  return element;
};
