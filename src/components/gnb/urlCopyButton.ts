import { MILLISECONDS } from '../../constants/commonMap';
import { WorkspaceData } from '../../types/stateType';
import { addCompressedDataToURL, compressString } from '../../utils/compressionStream';
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
    const URL_MAX_SIZE = 4000;
    const COPY_TEXT = 'URL Copy';
    const COPIED_TEXT = 'Copied!';
    const FAIL_TEXT = 'Fail Large!';
    const BUTTON_ACTIVE_TIME = 1;

    const zipWorkspaceData = JSON.stringify(zip(getWorkspaceData()));

    compressString(zipWorkspaceData).then((compressedBase64String) => {
      const copyUrl: string = addCompressedDataToURL(compressedBase64String);

      if (element instanceof HTMLButtonElement) {
        element.disabled = true;
        if (copyUrl.length > URL_MAX_SIZE) {
          element.textContent = FAIL_TEXT;
          element.classList.remove('gnb-button__url-copy');
          element.classList.add('gnb-button__url-copy--fail');
        } else {
          navigator.clipboard.writeText(copyUrl + zipWorkspaceData);
          element.textContent = COPIED_TEXT;
          element.classList.remove('gnb-button__url-copy');
          element.classList.add('gnb-button__url-copy--success');
        }

        setTimeout(() => {
          element.textContent = COPY_TEXT;
          element.classList.add('gnb-button__url-copy');
          element.classList.remove('gnb-button__url-copy--fail');
          element.classList.remove('gnb-button__url-copy--success');
          element.disabled = false;
        }, BUTTON_ACTIVE_TIME / MILLISECONDS);
      }
    });
  });

  return element;
};
