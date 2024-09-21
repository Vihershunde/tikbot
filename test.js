import { runTest, moveLatestVideo } from './funcs.js';
import chalk from 'chalk';

const executionsPerDay = 12;
const delayMinutes = 35;

let executionCount = 0;

async function dailyExecution() {
  await runTest().catch(console.error);
  await moveLatestVideo();
  executionCount++;
  console.log(chalk.bold.greenBright('executionCount = ', executionCount));
  //
  if (executionCount < executionsPerDay) {
    setTimeout(dailyExecution, delayMinutes * 60 * 1000);
  } else {
    executionCount = 0;
    setTimeout(
      dailyExecution,
      86400000 - executionsPerDay * delayMinutes * 60 * 1000
    );
  }
}

dailyExecution();
