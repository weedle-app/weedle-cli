import { program, Command } from 'commander';
import createProjectHandler from './create-project-handler';

const initCommand = (): Command => {
  return (
    program
      .command('init')
      .description('Creates a new weedle project with from a specific template')
      //.option('-f, --float <number>', 'float argument', parseFloat)
      .action(createProjectHandler)
  );
};

export default initCommand();
