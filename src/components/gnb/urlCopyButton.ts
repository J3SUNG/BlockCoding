import { MILLISECONDS } from '../../constants/commonMap';
import { WorkspaceData } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';
import { zip } from '../../utils/zipBlock';

interface UrlCopyButtonProps {
  getWorkspaceData: () => WorkspaceData;
}

export const urlCopyButton = ({ getWorkspaceData }: UrlCopyButtonProps) => {
  const element = createElementCommon('button', {
    type: 'button',
    className: 'gnb-button__url-copy',
    textContent: 'URL Copy',
    style: 'width: 100px',
  });

  element.addEventListener('click', () => {
    const url = window.location.origin + '/?workspaceData=';
    const zipWorkspaceData = JSON.stringify(zip(getWorkspaceData()));
    const URL_MAX_SIZE = 9600;
    const COPY_TEXT = 'URL Copy';
    const COPIED_TEXT = 'Copied!';
    const FAIL_TEXT = 'Fail Large!';
    const BUTTON_ACTIVE_TIME = 1;

    if (urlCopyButton instanceof HTMLButtonElement) {
      urlCopyButton.disabled = true;
      if (zipWorkspaceData.length > URL_MAX_SIZE) {
        urlCopyButton.textContent = FAIL_TEXT;
        urlCopyButton.classList.remove('gnb-button__url-copy');
        urlCopyButton.classList.add('gnb-button__url-copy--fail');
      } else {
        navigator.clipboard.writeText(url + zipWorkspaceData);
        urlCopyButton.textContent = COPIED_TEXT;
        urlCopyButton.classList.remove('gnb-button__url-copy');
        urlCopyButton.classList.add('gnb-button__url-copy--success');
      }

      setTimeout(() => {
        urlCopyButton.textContent = COPY_TEXT;
        urlCopyButton.classList.add('gnb-button__url-copy');
        urlCopyButton.classList.remove('gnb-button__url-copy--fail');
        urlCopyButton.classList.remove('gnb-button__url-copy--success');
        urlCopyButton.disabled = false;
      }, BUTTON_ACTIVE_TIME / MILLISECONDS);
    }
  });

  return element;
};
