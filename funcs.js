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
    await driver.$('~TikTok').click();
    countFrom(6);
    const createButton = await driver.$(
      '//android.widget.Button[@content-desc="Create"]'
    );
    if (await createButton.isExisting()) {
      await createButton.click();
    }
    countFrom(6);

    console.log(chalk.bold.blue('Clicking the Album Button')); // log
    await driver.executeScript('mobile: clickGesture', [{ x: 1165, y: 2137 }]);
    countFrom(6);

    console.log(chalk.bold.blue('Clicking the All⮟ Button')); // log
    await driver
      .$(
        '//android.widget.LinearLayout[@resource-id="com.zhiliaoapp.musically:id/bvz"]'
      )
      .click();
    countFrom(6);

    console.log(chalk.bold.blue('Clicking the PendingUploads Folder')); // log
    await driver
      .$(
        '//android.widget.TextView[@resource-id="com.zhiliaoapp.musically:id/gaj" and @text="PendingUploads"]'
      )
      .click();
    countFrom(6);

    console.log(chalk.bold.blue('Clicking the first video in grid')); // log
    await driver
      .$(
        '(//android.widget.ImageView[@resource-id="com.zhiliaoapp.musically:id/irb"])[1]'
      )
      .click();
    countFrom(6);

    console.log(chalk.bold.blue('Clicking the Next button')); // log FIRST NEXT
    await driver
      .$(
        '//android.widget.Button[@resource-id="com.zhiliaoapp.musically:id/jfq"]'
      )
      .click();
    countFrom(6);

    console.log(chalk.bold.blue('Clicking the second Next')); // log SECOND NEXT
    await driver
      .$(
        '//android.widget.TextView[@resource-id="com.zhiliaoapp.musically:id/jfz"]'
      )
      .click();
    countFrom(6);

    console.log(chalk.bold.blue('Clicking the Post')); // log POST
    await driver
      .$(
        '//android.widget.TextView[@resource-id="com.zhiliaoapp.musically:id/ldf"]'
      )
      .click();
    countFrom(6);
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
    const findCommand = `find ${PENDING_UPLOADS} -type f \\( -name "*.mp4" -o -name "*.avi" -o -name "*.mov" \\) -printf '%T@ %p\\n' | sort -n | tail -1 | cut -f2- -d" "`;
    const { stdout: latestVideo } = await execPromise(
      `adb shell "${findCommand}"`
    );

    if (!latestVideo.trim()) {
      console.log('No video files found in PendingUploads.');
      return;
    }

    // Move the file
    const moveCommand = `mv "${latestVideo.trim()}" ${COMPLETED_UPLOADS}/`;
    await execPromise(`adb shell "${moveCommand}"`);

    console.log(
      `Successfully moved ${latestVideo.trim()} to CompletedUploads.`
    );

    // Verify the move
    const listCommand = `ls -l ${COMPLETED_UPLOADS}/`;
    const { stdout: completedList } = await execPromise(
      `adb shell "${listCommand}"`
    );
    console.log('Contents of CompletedUploads:');
    console.log(completedList);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}
