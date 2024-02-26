import { UpdateWorkspaceData, WorkspaceData } from '../types/stateType';
import { changeUniqueIdObj } from '../utils/changeUniqueIdObj';
import { decompressString } from '../utils/compressionStream';
import { restoreWorkspaceData } from '../utils/restoreWorkspaceData';
import { unzip } from '../utils/zipBlock';

export class UrlTool {
  url: URL;
  constructor() {
    this.url = new URL(window.location.href);
  }

  async urlParser(updateWorkspaceData: UpdateWorkspaceData) {
    try {
      const data = this.getSearchParams('workspaceData');

      if (data) {
        const newData = await this.unZipData(data);

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
    return decompressString(data).then((compressedBase64String) => {
      const newData = restoreWorkspaceData(unzip(JSON.parse(compressedBase64String)));
      return newData as WorkspaceData;
    });
  }

  moveOriginPage() {
    window.location.href = this.url.origin;
  }
}
