import { OptionValues } from 'commander';
import * as PackageManager from '@expo/package-manager';
import chalk from 'chalk';
import commandExists from 'command-exists';
import terminalLink from 'terminal-link';
import RNTemplateGenerator from '@lib/init/template-generators/rn-remplate-generator';
import Log from '@lib/common/logger';
import { promptPackageDependency, selectProjectType } from '@lib/init/prompts';

async function createProjectHandler(this: { args: []; opts: () => OptionValues }) {
  try {
    const expoCommandExists = await commandExists('expo');
    if (!expoCommandExists) {
      throw new Error(
        `The project template uses expo, you need to install expo to continue. ${terminalLink(
          'Click here for more info',
          chalk.blueBright('https://docs.expo.dev/workflow/expo-cli/#installation')
        )}`
      );
    }
    const cwd = process.cwd();

    const rnTemplateGenerator = RNTemplateGenerator.Instance;

    const selectedPackageManager = await promptPackageDependency();
    const projectType = await selectProjectType();
    const repoName = projectType.key;

    const { projectRoot } =
      projectType.type === 'bare'
        ? await rnTemplateGenerator.bareWorkFlowSetup(cwd, repoName)
        : await rnTemplateGenerator.managedWorkFlowSetup(cwd, repoName);

    const manager = await PackageManager.createForProject(projectRoot, {
      yarn: selectedPackageManager === 'yarn',
      npm: selectedPackageManager === 'npm',
    });

    await manager.installAsync();
    Log.info('🎉Template setup complete!');
  } catch (e: any) {
    Log.fatal(e.message);
  }
}

export default createProjectHandler;
