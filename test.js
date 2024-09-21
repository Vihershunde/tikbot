import { remote } from 'webdriverio';
import { countFrom, sleep } from './funcs.js';
import chalk from 'chalk';

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

async function runTest() {
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

runTest().catch(console.error);
