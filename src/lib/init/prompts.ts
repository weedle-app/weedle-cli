import prompts from 'prompts';
import inquirer, { Separator } from 'inquirer';

export const promptForProjectName = async (): Promise<string> => {
  const promptResponse = await prompts({
    type: 'text',
    name: 'name',
    message: 'What would you like to name your project?',
  });

  return promptResponse.name;
};

export const promptPackageDependency = async (): Promise<string> => {
  const promptQuestions: string[] = ['yarn', 'npm'];

  const selectedProject = await inquirer.prompt([
    {
      type: 'list',
      name: 'manager',
      message: 'Choose your package manager.',
      choices: promptQuestions,
    },
  ]);

  return selectedProject.manager;
};

type ProjectTypeName = 'managed' | 'bare';

interface Project {
  name: string;
  key: string;
  type: ProjectTypeName;
}

export const selectProjectType = async (): Promise<Project> => {
  const promptQuestions: Project | any[] = [
    new Separator('------Managed workflow------'),
    {
      name: 'blank(Typescript)  minimal web3 ready react native project with ethers installed. Created from expo managed workflow.',
      key: 'weedle-expo-managed-workflow',
    },
    new Separator('------Bare workflow------'),
    {
      name: 'blank(Typescript)  minimal react native web3 ready project with ethers installed. Created from expo bare workflow.',
      key: 'weedle-expo-bare-workflow',
    },
  ];

  const selectedProject = await inquirer.prompt([
    {
      type: 'list',
      name: 'project',
      message: 'Choose a react native template.',
      choices: promptQuestions,
    },
  ]);

  const selectedPromptObject = promptQuestions.filter(
    (choice) => choice.name === selectedProject.project
  );

  if (!selectedPromptObject.length) {
    throw new Error('A problem occurred generating a new project. Please try again.');
  }

  return selectedPromptObject[0];
};
