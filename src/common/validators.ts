export const allowedPlatforms = (platform: string): void => {
  const platforms = ['mobile'];

  if (!platforms.includes(platform)) {
    throw new Error('Invalid platform provided.');
  }
};
