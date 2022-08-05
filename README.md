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

To contribute Foxlmind, first fork this repository. Click 'fork', 'create fork'. Next, clone the your fork of repository in GitHub Desktop or equivilent, and make your changes. You can make an unlimited ammount of commits to your repository, though it's easier for us if you keep it small. After you push your changes, you can open a pull request so that we can merge your changes if we deem them helpful.

### Building app from CLI

Since Foxlmind runs on ElectronJS, NodeJS is required to run it. You can download NodeJS from the [official Node site](https://nodejs.org/en/download/). To run Foxlmind you will need to run these commands in your Foxlmind project folder.

```
npm install
npm start
```

If you build the app when another instance of it has already opened you could get an error like `Unable to create cache` because another instance of app has already loaded and working with the save file. 
