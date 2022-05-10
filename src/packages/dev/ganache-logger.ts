/* eslint-disable unicorn/no-array-push-push */
/* eslint-disable no-eq-null */
/* eslint-disable eqeqeq */
import { Command } from '@oclif/core';
import { toChecksumAddress } from 'ethereumjs-util';
import { ethers } from 'ethers';
import { EthereumProvider } from 'ganache';

function color(str: string) {
  return ` ${str}}`;
}

export default function (
  provider: EthereumProvider,
  cliSettings: { host: string; port: number },
  context: Command
): void {
  const liveOptions = provider.getOptions();
  const accounts = provider.getInitialAccounts();

  const addresses = Object.keys(accounts);
  const logs = [];
  logs.push('', 'Available Accounts', '==================');
  if (addresses.length > 0) {
    for (const [index, address] of addresses.entries()) {
      const balance = accounts[address].balance;
      const strBalance = ethers.utils.formatEther(balance);

      let line = `(${index}) ${toChecksumAddress(address)} (${strBalance} ETH)`;

      if (!accounts[address].unlocked) {
        line += ' 🔒';
      }

      logs.push(line);
    }

    logs.push('', 'Private Keys', '==================');

    for (const [index, address] of addresses.entries()) {
      logs.push(`(${index}) ${accounts[address].secretKey}`);
    }

    if (liveOptions.wallet.accountKeysPath != null) {
      logs.push(
        '',
        `Accounts and keys saved to ${liveOptions.wallet.accountKeysPath}`
      );
    }
  } else {
    logs.push('(no accounts unlocked)');
  }

  if (liveOptions.wallet.accounts == null) {
    logs.push('', 'HD Wallet', '==================');
    logs.push(`Mnemonic:      ${color(liveOptions.wallet.mnemonic || '')}`);
    logs.push(
      `Base HD Path:  ${color(
        liveOptions.wallet.hdPath.join('/') + '/{account_index}'
      )}`
    );
  }

  if (liveOptions.miner.defaultGasPrice) {
    logs.push('', 'Default Gas Price', '==================');
    logs.push(
      color(liveOptions?.miner?.defaultGasPrice?.toBigInt()?.toString() || '')
    );
  }

  if (liveOptions.miner.blockGasLimit) {
    logs.push('', 'BlockGas Limit', '==================');
    logs.push(
      color(liveOptions?.miner?.blockGasLimit?.toBigInt()?.toString() || '')
    );
  }

  if (liveOptions.miner.callGasLimit) {
    logs.push('', 'Call Gas Limit', '==================');
    logs.push(
      color(liveOptions?.miner?.callGasLimit?.toBigInt()?.toString() || '')
    );
  }

  logs.push('', 'Chain Id', '==================');
  logs.push(
    color(liveOptions.chain.chainId.toString()),
    '',
    'RPC Listening on ' + cliSettings.host + ':' + cliSettings.port
  );
  context.log(logs.join('\n'));
}
