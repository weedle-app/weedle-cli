import _set from 'lodash/set';

export const parseEvmNodeConfig = (
  nodeOptions: string | undefined
): Record<string, unknown> => {
  if (!nodeOptions) throw new Error('Invalid options provided');

  const options = {};

  const nodeArgs = nodeOptions.split(' ');
  for (const arg of nodeArgs) {
    const [k, v] = arg.replace('--', '').split('=');
    _set(options, k, v);
  }

  return options;
};
