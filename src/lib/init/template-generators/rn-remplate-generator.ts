import fs from 'fs-extra';
import ora from 'ora';
import path from 'path';
import BaseTemplateGenerator from './base-generator';

import { promptForProjectName } from '../prompts';
import { modifyAndroidStringsXml, modifyProjectJsonFiles } from '../modify-template-files';

class RNTemplateGenerator extends BaseTemplateGenerator {
  private static _instance: RNTemplateGenerator;

  private constructor() {
    super();
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private async setupTemplate(workingDir: string, repoName: string) {
    const projectName = await promptForProjectName();

    const gitRepoUrlTemplate = `https://github.com/weedle-app/${repoName}/archive/main.zip`;
    const repoZipFileName = `${repoName}.zip`;
    const outputDir = path.join(workingDir, projectName);
    const repoFullZipPath = path.join(workingDir, repoZipFileName);

    const spinner = ora('Downloading template').start();
    await this.downloadRepofromGithub(gitRepoUrlTemplate, repoFullZipPath);
    spinner.text = 'Template downloaded!';
    spinner.text = 'Unzipping template';
    await this.unzipFileToDir(repoFullZipPath, workingDir);
    await fs.promises.unlink(repoFullZipPath);

    const extractedDir = fs.existsSync(`${workingDir}/${repoName}-main`)
      ? `${workingDir}/${repoName}-main`
      : `${workingDir}/${repoName}`;

    await fs.rename(extractedDir, outputDir);

    spinner.text = 'Template unzipped!';

    spinner.succeed('Good to go!');
    spinner.stop();

    return { projectRoot: outputDir, projectName };
  }

  async bareWorkFlowSetup(workingDir: string, repoName: string) {
    const setupResponse = await this.setupTemplate(workingDir, repoName);
    const { projectName, projectRoot } = setupResponse;
    await modifyProjectJsonFiles(projectRoot, projectName);
    await modifyAndroidStringsXml(projectRoot, projectName);

    return setupResponse;
  }

  async managedWorkFlowSetup(workingDir: string, repoName: string) {
    const setupResponse = await this.setupTemplate(workingDir, repoName);
    const { projectName, projectRoot } = setupResponse;
    await modifyProjectJsonFiles(projectRoot, projectName);

    return setupResponse;
  }
}

export default RNTemplateGenerator;
