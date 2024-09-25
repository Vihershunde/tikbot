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

const executionsPerDay = 3;
let delayMinutes = 120;

let executionCount = 0;

async function dailyExecution() {
  try {
    await runTest();
    await moveLatestVideo();

    executionCount++;
    delayMinutes += Math.round(Math.random() * 60);
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
      console.log(
        chalk.yellowBright.bold('Current time:', Date.now().toLocaleString())
      ); // log
      console.log(
        chalk.yellowBright.bold(
          'Next upload at:',
          (Date.now() + 61_200_000).toLocaleString()
        )
      ); // log
      setTimeout(dailyExecution, 61_200_000);
    }
  } catch (error) {
    console.log(chalk.redBright.bold(error));
  }
}

dailyExecution();
