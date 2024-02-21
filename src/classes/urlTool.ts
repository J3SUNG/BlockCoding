import { BlockCommon } from '../classes/block/blockClassCommon';
import { UpdateWorkspaceData } from '../types/stateType';
import { changeUniqueIdObj } from '../utils/changeUniqueIdObj';
import { restoreWorkspaceData } from '../utils/restoreWorkspaceData';
import { unzip } from '../utils/zipBlock';

export class UrlTool {
  url: URL;
  constructor() {
    this.url = new URL(window.location.href);
  }

  urlParser(updateWorkspaceData: UpdateWorkspaceData) {
    try {
      const data = this.getSearchParams('workspaceData');

      if (data) {
        const newData = this.unZipData(data);

        changeUniqueIdObj(newData);
        updateWorkspaceData(newData);
      }
    } catch (e) {
      this.moveOriginPage();
    }
  }

  getSearchParams(data: string) {
    return this.url.searchParams.get(data);
  }

  unZipData(data: string) {
    const unZipWorkspaceData = unzip(JSON.parse(data));

    return restoreWorkspaceData(unZipWorkspaceData) as BlockCommon[];
  }

  moveOriginPage() {
    window.location.href = this.url.origin;
  }
}
