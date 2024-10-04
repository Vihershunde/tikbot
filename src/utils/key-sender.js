export async function sendString(driver, str) {
  const charArray = str.split('').map((char) => `${char}`);
  await driver.sendKeys(charArray);
}
