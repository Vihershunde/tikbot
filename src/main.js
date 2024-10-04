import { runTest, moveLatestVideo } from './funcs.js';
import chalk from 'chalk';
import { showBanner } from './utils/show-banner.js';
import { count, sleep } from './utils/sleep.js';
import { yesNoText } from './utils/prompt-utils.js';

// Config
const executionsPerDay = 6;
const delayMinutes = 120;
let executionCount = 0;
export const ctaString =
  'Click the link in the bio to earn a $500 DoorDash voucher!';

await showBanner('TikBot');
await sleep(200);
export const userConfirmation = await yesNoText();

async function dailyExecution() {
  try {
    await runTest();
    await moveLatestVideo();

    executionCount++;
    let randDelayMinutes = delayMinutes + Math.round(Math.random() * 60);
    console.log({ delayMinutes, randDelayMinutes, executionCount }); // console log
    const nextExecutionTime = new Date(
      Date.now() + randDelayMinutes * 60 * 1000
    );
    console.log(
      chalk.yellowBright.bold(
        'Next upload at:',
        nextExecutionTime.toLocaleString()
      )
    );
    //
    if (executionCount < executionsPerDay) {
      setTimeout(dailyExecution, randDelayMinutes * 60 * 1000);
    } else {
      executionCount = 0;
      console.log(
        chalk.yellowBright.bold('Reached Daily Limit ()()()()()()()()')
      );
      console.log(
        chalk.yellowBright.bold(
          'Current time:',
          new Date(Date.now()).toLocaleString()
        )
      ); // log
      console.log(
        chalk.yellowBright.bold(
          'Next upload at:',
          new Date(Date.now() + 61_200_000).toLocaleString()
        )
      ); // log
      setTimeout(dailyExecution, 61_200_000);
    }
  } catch (error) {
    console.log(chalk.redBright.bold(error));
  }
}

dailyExecution();
