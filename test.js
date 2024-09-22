import { runTest, moveLatestVideo } from './funcs.js';
import chalk from 'chalk';
import figlet from 'figlet';
import lolcatjs from 'lolcatjs';

figlet.text(
  'TikBot',
  {
    font: 'Roman',
  },
  function (err, data) {
    if (err) {
      console.log('Something went wrong with figlet...');
      console.dir(err);
      return;
    }
    lolcatjs.fromString(data);
  }
);

const executionsPerDay = 12;
const delayMinutes = 35;

let executionCount = 0;

async function dailyExecution() {
  try {
    await runTest();
    await moveLatestVideo();

    executionCount++;
    console.log(chalk.bold.greenBright('executionCount = ', executionCount));
    const nextExecutionTime = new Date(Date.now() + delayMinutes * 60 * 1000);
    console.log(
      chalk.yellowBright.bold(
        'Next upload at:',
        nextExecutionTime.toLocaleString()
      )
    );
    //
    if (executionCount < executionsPerDay) {
      setTimeout(dailyExecution, delayMinutes * 60 * 1000);
    } else {
      executionCount = 0;
      console.log(
        chalk.yellowBright.bold('Reached Daily Limit ()()()()()()()()')
      );
      setTimeout(
        dailyExecution,
        86_400_000 - executionsPerDay * delayMinutes * 60 * 1000
      );
    }
  } catch (error) {
    console.log(chalk.redBright.bold(error));
  }
}

dailyExecution();
