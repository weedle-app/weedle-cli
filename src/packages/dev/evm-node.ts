import { Command } from '@oclif/core';
import ganache, { EthereumProvider, ServerOptions } from 'ganache';
import ganacheLogger from './ganache-logger';

type EvmNodeArgs = ServerOptions<'ethereum'> | Record<string, unknown>;

const EvmNode = {
  run(context: Command, options: EvmNodeArgs = {}, port = 8545): any {

    const server = ganache.server(options);

    server.listen(port, (err) => {
      if (err) {
        context.error(`Error ${err.message}`);
      }
      // server.status;

      ganacheLogger(
        server.provider as EthereumProvider,
        { host: '', port },
        context
      );
    });
  },
};

export default EvmNode;
