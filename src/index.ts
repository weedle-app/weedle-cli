import { Command } from 'commander';
import init from '@commands/init';

const program = new Command();

(async () => {
  program
    .name('weedle')
    .description(
      '(Beta) Official cli for the weedle platform. It also provides tools for easy development in web3.'
    )
    .version('1.0.0')
    .addCommand(init);

  await program.parseAsync(process.argv);
})();
