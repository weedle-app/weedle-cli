import { Hook } from '@oclif/core';

const hook: Hook<'postrun'> = async function (opts) {
  console.log(`example hook running ${opts}\n`);
};

export default hook;
