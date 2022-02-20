<p align="center">
  <a href="" rel="noopener">
 <img width=300px height=300px src="https://imgur.com/zLVEWVU.png" alt="LolaBot"></a>
</p>

<h3 align="center"></h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge&logo=appveyor)](https://github.com/lolabray/lolabot)
  [![Discord](https://img.shields.io/discord/813192428256231425?style=for-the-badge)](https://discord.gg/4VGtUNKrkT)
  [![Platform](https://img.shields.io/badge/Platform-Discord-blueviolet?style=for-the-badge&logo=appveyor)](https://github.com/search?q=discord)
  [![GitHub Issues](https://img.shields.io/github/issues/lolabray/lolabot?style=for-the-badge)](https://github.com/lolabray/lolabot/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/lolabray/lolabot?style=for-the-badge)](https://github.com/lolabray/lolabot/pulls)
  [![License](https://img.shields.io/github/license/lolabray/lolabot?style=for-the-badge)](/LICENSE) <br>
</div>

---

<p align="center"> The Discord Bot that controls your Lovense toys.
    <br> Currently supports *most* Lovense brand toys<br>
    Join the Discord server for support or to contribute to the bot: (https://discord.gg/4VGtUNKrkT) <br> </p>



## 📝 Table of Contents
+ [About](#about)
+ [Demo](#demo)
+ [Usage](#usage)
+ [Getting Started](#getting_started)
+ [Deploying your own bot](#deployment)
+ [Built Using](#built_using)
+ [TO-DO](https://github.com/lolabray/lolabot/blob/main/todo.md)
+ [Authors](#authors)
+ [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>
LolaBot was developed by a camgirl who was looking for a way to control her lovense toys in her discord server.
<br>LolaBot is contolled by slash commands (example: /high) that activate the toys via the discord bot.

## 🎥 Demo <a name = "demo"></a>
![Working](https://i.imgur.com/RgKnOGj.gif)

## 🎈 Usage <a name = "usage"></a>

To use the bot, type into your discord server after installation:
```md
**LolaBot Commands:**

**General**
Ping      - Pong
Server    - Get Server information
User      - Get User information
Battery   - Get Battery of a Given Toy.

**Toy commands**
*Supported by All Lovense devices*
high      - Vibrate a specific or ALL toys at MAX POWER
medium    - Vibrate a specific or ALL toys at Mediuim Power
low       - Vibrate a specific or ALL toys at low power
stop      - Stop a specific or ALL toys.

*Only avalaible on Lush, Hush, Ambi, Edge, Domi & Osci Toys*
pulse     - Pulsate a specific or ALL possile toys
grind     - Grind a specific or ALL possible toys
circle    - Circle a specific or ALL possible toys

*Only avalaible on Nora*
Rotateleft  - Rotate a specific or ALL possible toys Counter Clockwise.
RotateRight - Rotate a specific or ALL possible toys Clockwise.
RotateStop  - Stop rotating on a specific or ALL possible toys.

*More commands are planned for some of the more specific toys like Edge & Max.*
```

## 🏁 Getting Started <a name = "getting_started"></a>
### Installing <a name = "installing"></a>

1) Install node.js at https://nodejs.org/en/ (I recommend downloading the latest version of v16)

2) Next, You will need to download the source code from GitHub. This can be done either via the Green **Code** Button and clicking Download ZIP, and Extracting the contents where you'd like.

3) Then open a powershell window (Shift+LeftClick) in the LolaBot main folder.
<br>

![working](https://imgur.com/pDFbcrt.gif)<br>

3) In that powershell window, download all the required packages for this to work. This includes some stuff for Discord and basic Web requests:<br>

```
npm install
```
![working](https://i.imgur.com/dPSOFtl.gif)<br>

Additional resources: [Discord.Js Guide](https://discordjs.guide/)

## 🚀 Deploying your own bot <a name = "deployment"></a>
Log onto the Discord Developer Portal: (https://discord.com/developers/applications) and create a new application.<br>

![working](https://imgur.com/JS4TdZK.png)<br>

Set your photo, name your bot, add a description.<br>
Select "Bot" on the side panel, under settings.<br>
![working](https://imgur.com/Etzf6RF.png)<br>
Click to find your token, copy this and add it to the file config.json that you downloaded.<br>
![working](https://imgur.com/n0drNJW.png)<br>
Replace "YOUR-DISCORD-TOKEN" in config.json, with the token you copied.<br>
![working](https://imgur.com/br2RKT8.png)<br>

Next find your guild ID, which will also need to be replaced in config.json by:
Turning on developer mode on your Discord client, under Settings/Advanced.

![working](https://imgur.com/vyvqNW3.png)<br>
Once developer mode is on, left click on the server/channel your bot is joining and copy ID (bottom of menu). This is your guild ID.

Go to OAuth2 on the Discord Developer Portal, located on the side panel under settings.<br>
![working](https://imgur.com/pE3KbZv.png)<br>

From here, click the bot square and generate a url. You can also set permissions below, or leave it blank.<br>
![working](https://imgur.com/KAIBhsi.png)<br>
Copy this url into your web browser and add the bot to a server you manage<br>
![working](https://imgur.com/GA84dnX.png)<br>

Last, find your client ID by left clicking on the bot (once it's added in the previous step), going to 'copy ID' and replace in config.json.

Additional resources: [Discord.Js Guide](https://discordjs.guide/)

### Deploy the Bot
Deploying the bot will create the commands based upon which toys which are available within the app (even if they're not online). So if you have added more toys to your collection, please re-run this command and it will add them too. 

1) Go to the main file folder that you downloaded from GitHub and reopen your Powershell window (shift+LeftClick) if you have closed it.

	This time, copy and paste the following in powershell:
	```
	npm run deploy
	```
	This should reply with information about your toys and finally end off on: **Successfully registered slash commands.**<br/>
  If this returns **No information found in Lovense Config**, Make sure that your Phone/Desktop App is online and re-try running the deploy script.

2)	Next, deploy the bot with 'node index.js', this will be how you start the bot each time.

	```
	npm run main
	```

	If done correctly, the bot should say "LolaBot 3.0 - Ready to Play!". Do not close the powershell window while the bot is operating.<br>
Each time you want to run the bot, you must repeat the 'Deploy the bot' instructions and leave the powershell window open.<br>

## ⛏️ Built Using <a name = "built_using"></a>
+ [node.js](https://praw.readthedocs.io/en/latest/)
+ [discord.js](https://www.heroku.com/)
+ [node-fetch](https://www.https://github.com/node-fetch/node-fetch)
+ [Lovense Local API](https://www.lovense.com/sextoys/developer/doc#solution-3-cam-kit-step3)

## TO-DO for LolaBot

All work that is currently planned for LolaBot:

### To-do:

- [ ] Detailed Wiki
- [ ] Bot Hosting

### In Progress:

- [ ] Neater code, a command handler plus separate files for commands
- [ ] Commands for all Lovense toys, *Currently missing specific commands for: Max, Edge*

### Done:
- [x] Battery Life command
- [x] Ability to change parameters (toyId, domain/port) via discord commands - *Technically this is made obsolite via the API*
- [x] Complete Readme.md with full instructions for LolaBot
- [x] Upload LolaBot code, start readme.md

## ✍️ Authors <a name = "authors"></a>
+ [@lolabray](https://github.com/lolabray)

## 🙌 Contributors <a name = "contributors"></a>
+ [@Lat3xKitty](https://github.com/lat3xkitty)

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

+ [Discord.Js Guide](https://discordjs.guide/)
