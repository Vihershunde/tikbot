import chalk from 'chalk';
import { remote } from 'webdriverio';
import { exec } from 'child_process';
import { promisify } from 'util';
import { count } from './utils/sleep.js';
import { userConfirmation, ctaString } from './main.js';
import { sendString } from './utils/key-sender.js';

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
};

const wdOpts = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

export async function runTest() {
  const driver = await remote(wdOpts);

  // #region Playground

  // await count(30);
  // #endregion Playground

  try {
    console.log(chalk.bold.cyan('Pressing Home Button')); // log
    await driver.pressKeyCode(3);
    await driver.$('//android.widget.TextView[@text="TikTok"]').click();
    await count(5);
    const createButton = await driver.$(
      '//android.widget.Button[@content-desc="Create"]'
    );
    if (await createButton.isExisting()) {
      await createButton.click();
    }
    await count(5);

    console.log(chalk.bold.cyan('Clicking the Album Button')); // log
    await driver.executeScript('mobile: clickGesture', [
      {
        x: 1165 + Math.floor(Math.random() * 11) - 5,
        y: 2137 + Math.floor(Math.random() * 11) - 5,
      },
    ]);
    await count(5);

    console.log(chalk.bold.cyan('Clicking the All⮟ Button')); // log
    await driver.$('//android.widget.TextView[@text="All"]').click();
    await count(5);

    console.log(chalk.bold.cyan('Clicking the PendingUploads Folder')); // log
    await driver.$('//android.widget.TextView[@text="PendingUploads"]').click();
    await count(5);

    console.log(chalk.bold.cyan('Clicking the first video in grid')); // log
    await driver.executeScript('mobile: clickGesture', [
      {
        x: 245 + Math.floor(Math.random() * 11) - 5,
        y: 669 + Math.floor(Math.random() * 11) - 5,
      },
    ]);

    await count(5);

    console.log(chalk.bold.cyan('Clicking the Next button')); // log FIRST NEXT
    await driver.$('//android.widget.Button[@text="Next"]').click();
    await count(5);

    // INQUIRER AREA

    if (userConfirmation) {
      console.log(chalk.bold.cyan('Clicking the Aa')); // Clicking Aa
      await driver.$('accessibility id:Text').click();

      await count(3);
      await sendString(driver, ctaString);

      await count(3);
      await driver.pressKeyCode(4); // KEYCODE_BACK

      await count(3);
      console.log(chalk.bold.cyan('Draging it lower')); // Draging it lower
      await driver.executeScript('mobile: dragGesture', [
        {
          startX: 683 + Math.floor(Math.random() * 11) - 5,
          startY: 1270 + Math.floor(Math.random() * 11) - 5,
          endX: 683 + Math.floor(Math.random() * 11) - 5,
          endY: 1934 + Math.floor(Math.random() * 11) - 5,
          speed: 500 + Math.floor(Math.random() * 11) - 5,
        },
      ]);
      await count(3);
    }

    console.log(chalk.bold.cyan('Clicking the second Next')); // log SECOND NEXT
    await driver.$('//android.widget.TextView[@text="Next"]').click();
    await count(5);

    console.log(chalk.bold.cyan('Clicking the Post')); // log POST
    await driver.$('//android.widget.TextView[@text="Post"]').click();
    await count(40);
    await driver.pressKeyCode(3);
    await count(10);
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

const execPromise = promisify(exec);
const PENDING_UPLOADS = '/storage/emulated/0/PendingUploads';
const COMPLETED_UPLOADS = '/storage/emulated/0/CompletedUploads';

export async function moveLatestVideo() {
  try {
    // Check if device is connected
    await execPromise('adb devices');

    // Find the latest video
    const findCommand = `ls -t ${PENDING_UPLOADS}/*.mp4 | head -1`;
    const { stdout: latestVideo } = await execPromise(
      `adb shell "${findCommand}"`
    );

    if (!latestVideo.trim()) {
      console.log('No video files found in PendingUploads.');
      return;
    }

    // Move the file
    const moveCommand = `mv '${latestVideo.trim()}' '${COMPLETED_UPLOADS}/'`;

    await execPromise(`adb shell "${moveCommand}"`);

    console.log(
      `Successfully moved ${latestVideo.trim()} to CompletedUploads.`
    );

    // Verify the move
    const listCommand = `ls -trh ${COMPLETED_UPLOADS}/ | head -n 10`;
    const { stdout: completedList } = await execPromise(
      `adb shell "${listCommand}"`
    );
    console.log('Contents of CompletedUploads:');
    console.log(completedList);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}
