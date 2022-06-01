import { ConsoleBackend, Logger } from 'clui-logger';
import { boolish } from 'getenv';

const Log = new Logger(new ConsoleBackend());

export const debug = (message: string, data: any) => {
  const isDebug = boolish('NODE_DEBUG', false);
  if (!isDebug) return;
  Log.debug(message, data);
};

export default Log;
