<div align="center">
    <img src="readme/media/logo.svg" alt="logo" height="200px"><br>
    <h3>Foxlmind</h3>
    An epic note-keeping and to-do app built in <a href="https://electronjs.org">Electron</a> by <a href="https://github.com/foxlldev">Foxlldev</a><br><br>
    <a href="https://foxl.design/mind"><b>Website</b></a>&nbsp;&nbsp;&nbsp;
    <a href="https://foxl.design/mind#downloads"><b>Downloads</b></a>&nbsp;&nbsp;&nbsp;
    <a href="https://github.com/foxlldev/Foxlmind/releases"><b>Releases</b></a>&nbsp;&nbsp;&nbsp;
    <a href="https://github.com/foxlldev/Foxlmind/issues"><b>Issues</b></a>&nbsp;&nbsp;&nbsp;
</div>

## Features

**Totally local. Maximum security.** We don't collect any data about you - you don't even need to log in to use Foxlmind - and your posts are stored locally (on your computer). Don't trust us? Check our source, right here on GitHub.

**Notes & to-dos. In one app.** It's easy to remember anything with Foxlmind - whether it's in need of an in-depth explanation or simple steps.

**Themes? No problem.** With dark, light and easy-to-make custom themes with our Themes Designer, Foxlmind can look any way you want it to.

**Simple design.** Foxlmind has a simple design, which still proves to be great-looking (especially after [Joasss'](https://github.com/Joasss) redesign in 0.7) and efficient.

**Completion doesn't mean deletion.** You can view your completed posts in the Completed page, choose to mark them as uncompleted or permenantly delete them.

**Quick & easy editing.** Made a typo or have new ideas? Edit your post - change the date, title, content, and even add a to-do point to an existing post.

## For developers

### How to contribute Foxlmind

To contribute Foxlmind create a fork of this repository in your profile. Click to **Fork** and in opened page click **Create fork**. Next, clone the your fork of repository, and make your changes. You can make the unlimited count of commits to your repository. After you push your changes, you can click the **Contribute** and **Open pull request**.

### Building app from CLI

Since Foxlmind runs on Electron.js, Node.js is required to run. You can download Node.js from the [official site](https://nodejs.org/en/download/). To build Foxlmind you need to run this commands in Terminal from repo root directory:

```
npm install
npm start
```

If you build the app when the other instance of app already opened you can get an error like `Unable to create cache` because the first runned instance of app already loaded and working with the save file. 