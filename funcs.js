import chalk from 'chalk';
import { remote } from 'webdriverio';
import { exec } from 'child_process';
import { promisify } from 'util';

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
  try {
    console.log(chalk.bold.blue('Pressing Home Button')); // log
    await driver.pressKeyCode(3);
    await driver.$('//android.widget.TextView[@text="TikTok"]').click();
    countFrom(6);
    const createButton = await driver.$(
      '//android.widget.Button[@content-desc="Create"]'
    );
    if (await createButton.isExisting()) {
      await createButton.click();
    }
    countFrom(6);

    console.log(chalk.bold.blue('Clicking the Album Button')); // log
    await driver.executeScript('mobile: clickGesture', [
      {
        x: 1165 + Math.floor(Math.random() * 11) - 5,
        y: 2137 + Math.floor(Math.random() * 11) - 5,
      },
    ]);
    countFrom(6);

    console.log(chalk.bold.blue('Clicking the All⮟ Button')); // log
    await driver.$('//android.widget.TextView[@text="All"]').click();
    countFrom(6);

    console.log(chalk.bold.blue('Clicking the PendingUploads Folder')); // log
    await driver.$('//android.widget.TextView[@text="PendingUploads"]').click();
    countFrom(6);

    console.log(chalk.bold.blue('Clicking the first video in grid')); // log
    await driver.executeScript('mobile: clickGesture', [
      {
        x: 245 + Math.floor(Math.random() * 11) - 5,
        y: 669 + Math.floor(Math.random() * 11) - 5,
      },
    ]);

    countFrom(6);

    console.log(chalk.bold.blue('Clicking the Next button')); // log FIRST NEXT
    await driver.$('//android.widget.Button[@text="Next"]').click();
    countFrom(6);

    console.log(chalk.bold.blue('Clicking the second Next')); // log SECOND NEXT
    await driver.$('//android.widget.TextView[@text="Next"]').click();
    countFrom(6);

    console.log(chalk.bold.blue('Clicking the Post')); // log POST
    await driver.$('//android.widget.TextView[@text="Post"]').click();
    await new Promise((resolve) => setTimeout(resolve, 20_000));
    await driver.pressKeyCode(3);
    countFrom(11);
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
