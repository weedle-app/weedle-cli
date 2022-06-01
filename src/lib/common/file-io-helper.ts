import fs from 'fs-extra';
import _set from 'lodash/set';

class FileIOHelper {
  private static _instance: FileIOHelper;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  async writeJsonFile(filePath: string, data: Record<string, unknown>) {
    const packageJsonContent = await fs.readJson(filePath);
    Object.keys(data).forEach((k) => {
      _set(packageJsonContent, k, data[k]);
    });
    await fs.writeJson(filePath, packageJsonContent, { spaces: 2 });
  }
}

export default FileIOHelper;
