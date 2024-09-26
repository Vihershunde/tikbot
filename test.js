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

const executionsPerDay = 4;
let delayMinutes = 120;

let executionCount = 0;

async function dailyExecution() {
  try {
    await runTest();
    await moveLatestVideo();

    executionCount++;
    let randDelayMinutes = delayMinutes + Math.round(Math.random() * 60);
    console.log(chalk.bold.greenBright('executionCount = ', executionCount));
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
