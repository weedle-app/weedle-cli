import fs from 'fs-extra';
import axios from 'axios';
import admZip from 'adm-zip';

abstract class BaseTemplateGenerator {
  downloadRepofromGithub = async (url: string, dest: string) => {
    const response = await axios({
      method: 'GET',
      url,
      responseType: 'arraybuffer',
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    return fs.promises.writeFile(dest, response.data);
  };

  unzipFileToDir = async (repoFullZipPath: string, outputDir: string): Promise<void> => {
    const zip = new admZip(repoFullZipPath);
    await zip.extractAllToAsync(outputDir, true, true);
  };
}

export default BaseTemplateGenerator;
