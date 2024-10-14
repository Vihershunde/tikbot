import inquirer from 'inquirer';
import { ctaString } from '../config.js';

export async function yesNoText() {
  console.log({ ctaString });
  const { userConfirmation } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'userConfirmation',
      message: 'Do you want to add the CTA?',
      default: false,
    },
  ]);

  return userConfirmation;
}
