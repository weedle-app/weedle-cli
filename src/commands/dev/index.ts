import { Command, Flags } from '@oclif/core';
import * as adbKit from 'adbkit';
import { selectAConnectedDevice } from '../../common/devices-helper';

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

    let nodeOptions: any = {};

    if (flags['node-options']) {
      const nodeArgs = flags['node-options'];
      nodeOptions = parseEvmNodeConfig(nodeArgs);
    }

    const port =
      flags?.port || nodeOptions?.server?.port || nodeOptions?.port || 8545;

    if (flags['forward-port']) {
      try {
        const client = adbKit.createClient();
        const device = await selectAConnectedDevice(client);

        const proxyReversed = await client.reverse(
          device,
          `tcp:${port}`,
          `tcp:${port}`
        );
        if (!proxyReversed) {
          throw new Error('An error occurred reversing proxy');
        }

        this.log('Proxy reversed successful - ', port);

        // eslint-disable-next-line unicorn/catch-error-name
      } catch (e: any) {
        this.error(e.message);
      }
    }

    EvmNode.run(this, nodeOptions, port);
  }
}
