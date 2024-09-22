Are you going insane from uploading TikToks?

Is this you? 👇

<img src='assets/giphy.webp'>

.

.

**_Introducing..._**

# TikBot - an Easy Android Tiktok Uploader Script

This script is written in JS and is appium-based.

**Script is intended for educational purposes only**

**Read the license before usage**

## Requirements

- Android Platform Tools
- CMDline Android Studio tools
- NodeJS
- Android phone (no IOS support yet), root is not needed

## Installation

- Add Platform tools and cmdline tools to PATH variable or .bashrc
- Enable USB debugging on Android phone
- Add 2 folders, `PendingUploads` and `CompletedUploads` to the `/storage/emulated/0/`
- Edit `driver.executeScript()` in `funcs.js/runTest()` if you need to tap correct x and y values
- Install appium:

```powershell
npm install -g appium
```

- start it:

```powershell
appium // you can add --no-cors to use Web Appium Inspector
```

- Install the driver: [guide](https://appium.io/docs/en/latest/quickstart/uiauto2-driver/)

```powershell
appium driver doctor uiautomator2
```

- Clone the repo:

```powershell
git clone https://github.com/Vihershunde/tikbot.git
```

- Install packages from package.json

```powershell
npm i
```

- Put videos for upload into `/storage/emulated/0/PendingUploads`

- Run script:

```powershell
node test.js
```

**Enjoy!**

## Q&A:

Q: Will this shadowban/terminate my account?

A: It works fine for me, try out and let me know if it works for you!

---

Q: My computer keeps going to sleep and disconnecting ADB, how to prevent it?

A: Use https://github.com/CHerSun/NoSleep if you don't want to dig in settings every time you want to change sleep behaviour. You can also set up OpenSSH Server on your box and monitor it remotely.

### More? 👇

https://t.me/Viherrr
