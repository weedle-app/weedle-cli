import fs from 'fs-extra';
import xml2js from 'xml2js';
import FileIOHelper from '../common/file-io-helper';

export const modifyProjectJsonFiles = async (
  projectRoot: string,
  projectName: string
): Promise<void> => {
  const packageJsonPath = `${projectRoot}/package.json`;
  const appJsonPath = `${projectRoot}/app.json`;

  const fileIO = FileIOHelper.Instance;
  await fileIO.writeJsonFile(packageJsonPath, { name: projectName });
  await fileIO.writeJsonFile(appJsonPath, { 'expo.name': projectName, 'expo.slug': projectName });
};

export const modifyAndroidStringsXml = async (
  projectRoot: string,
  projectName: string
): Promise<void> => {
  const androidStringsPath = `${projectRoot}/android/app/src/main/res/values/strings.xml`;

  const xmlObject = {
    resources: { string: { $: { name: 'app_name' }, _: projectName } },
  };
  const xmlBuilder = new xml2js.Builder({ headless: true });
  const xml = xmlBuilder.buildObject(xmlObject);
  await fs.writeFile(androidStringsPath, xml);
};
