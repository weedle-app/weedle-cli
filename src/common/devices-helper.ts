import inquirer from 'inquirer';

interface DeviceType {
  id: string;
  type: string;
}

export const selectAConnectedDevice = async (client: any): Promise<string> => {
  const devices: DeviceType[] = await client.listDevices();
  if (devices.length === 0) {
    throw new Error(
      'There are no devices connected, please connect a device and run the command again.'
    );
  }

  if (devices.length === 1) {
    return devices[0].id;
  }

  const promptQuestions = devices
    .filter((device: DeviceType) => device.type === 'device')
    .map((device: DeviceType) => ({
      name: device.id,
    }));

  const selectedDevice = await inquirer.prompt([
    {
      type: 'list',
      name: 'device',
      message: 'Please select the device to reverse proxy for',
      choices: promptQuestions,
    },
  ]);

  return selectedDevice.device;
};
