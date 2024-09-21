import chalk from 'chalk';

export function sleep(milliseconds) {
  const end = Date.now() + milliseconds;
  while (Date.now() < end) {
    // Busy-wait loop
  }
}

export function countFrom(number) {
  for (let i = 0; i < number; i++) {
    console.log(chalk.blue.bold(`[${i}]`));
    sleep(1000); // Assuming sleep is defined elsewhere
  }
}
