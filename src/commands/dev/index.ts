import { Command, Flags } from '@oclif/core';
import commandExists from 'command-exists';
import { spawn } from 'node:child_process';

import { parseEvmNodeConfig } from '../../common/parsers';
import { allowedPlatforms } from '../../common/validators';
import EvmNode from '../../packages/dev/evm-node';

export default class Dev extends Command {
  static description =
    'Helps setup a development environment for different platforms';

  static hidden = false;

  static flags = {
    'forward-port': Flags.boolean({
      char: 'f',
      description:
        'Forward the rpc node port for remote connection from mobile',
      required: false,
      default: false,
    }),
    'node-options': Flags.string({
      char: 'o',
      description:
        'Options for ganache cli. This supports all flags that can be found here https://www.npmjs.com/package/ganache',
      required: false,
    }),
    port: Flags.string({
      char: 'p',
      description: 'port to start node on',
      required: false,
    }),
  };

  static args = [
    {
      name: 'platform',
      required: true,
      description:
        'Platform to setup development environment for. It can be one of <mobile>',
    },
  ];

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Dev);
    allowedPlatforms(args.platform);

    this.log('Args', args);

    let nodeOptions: any = {};

    if (flags['node-options']) {
      const nodeArgs = flags['node-options'];
      nodeOptions = parseEvmNodeConfig(nodeArgs);
      this.log('nodeArgs', nodeOptions);
    }

    const port =
      flags?.port || nodeOptions?.server?.port || nodeOptions?.port || 8545;

    if (flags['forward-port']) {
      try {
        await commandExists('adb');
        const adb = spawn(`adb reverse tcp:${port} tcp:${port}`);
        adb.stdout.on('data', (data) => {
          this.log(data);
        });

        adb.stderr.on('data', (data) => {
          this.log(data);
        });

        adb.on('error', (error) => {
          this.log(error.message);
        });

        adb.on('close', (code) => {
          this.log(`child process exited with code ${code}`);
        });
        // eslint-disable-next-line unicorn/catch-error-name
      } catch (e: any) {
        this.error('Could not forward port. adb command not found.', e);
      }
    }
    // We need to forward port before starting server if port forwarding is required.

    EvmNode.run(this, nodeOptions, port);
  }
}
