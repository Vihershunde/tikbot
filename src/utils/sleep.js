import chalk from 'chalk';

export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function count(number) {
  for (let i = 1; i <= number; i++) {
    await sleep(1000); // Now async
    console.log(chalk.blue.bold(`[${i}]`));
  }
}
