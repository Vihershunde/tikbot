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
    console.log(chalk.bold.blue('Pressing Home Button'));
    await driver.pressKeyCode(3);
    const tikTokButton = await driver.$('~TikTok');
    await tikTokButton.click();
    countFrom(5);
    const imageViewElement = await driver.$(
      '//android.widget.Button[@content-desc="Create"]'
    );
    await imageViewElement.click();
    console.log(chalk.bold.blue('Clicking the Album Button'));
    const touchAlbum = await driver.executeScript('mobile: clickGesture', [
      { x: 1165, y: 2137 },
    ]);
    // await touchAlbum.click();
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

runTest().catch(console.error);
