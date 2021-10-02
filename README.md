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
[VERSION 2 NOW IN PRE-RELEASE](https://github.com/lolabray/lolabot/tree/LolaBot2.0)
</div>

---

<p align="center"> The Discord Bot that controls your Lovense toys.
    <br> Currently supports Lush, Nora, Hush and Domi (Support for other lovense brand toys IS POSSIBLE)<br>
    Join the Discord server for support: (https://discord.gg/4VGtUNKrkT) <br> </p>
    
    

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
<br>LolaBot is contolled by slash commands (example: /lushhigh) that activate the toys via the discord bot. 

## 🎥 Demo <a name = "demo"></a>
![Working](https://imgur.com/nUtBui4.gif)

## 🎈 Usage <a name = "usage"></a>

To use the bot, type into your discord server after installation:
```
**LolaBot Commands:**

**Hush:**
/hushlow 
/hushmed 
/hushhigh 
/hushpulse 
/hushcircle 
/hushgrind
/hushstop

**Domi:**
/domilow 
/domimed 
/domihigh 
/domipulse 
/domicircle 
/domigrind
/domistop

**Nora:**
/noralow 
/noramed 
/norahigh 
/norapulse 
/noracircle 
/noragrind 
/noraright
/noraleft
/norastopvibe
/norastopturn

**Lush**
/lushlow
/lushmed
/lushhigh
/lushpulse
/lushcircle
/lushgrind
/lushstop
```

## 🏁 Getting Started <a name = "getting_started"></a>
### Installing <a name = "installing"></a>

1) Install node.js at https://nodejs.org/en/

2) Next, You will need to download the source code from GitHub, then open a powershell window (Shift+LeftClick) in the LolaBot main folder.
<br>
![Working](https://imgur.com/pDFbcrt.gif)
<br>

3) In that powershell window, download discord js by typing 'npm install discord.js' then hitting enter:<br>

```
npm install discord.js

```
![Working](https://imgur.com/IeITBJ0.gif)<br>

4) Next, download the next three libraries in powershell (this will make deploy-commands.js work) by typing in 'npm install @discordjs/builders @discordjs/rest discord-api-types' then hitting enter: <br>
```
npm install @discordjs/builders @discordjs/rest discord-api-types
```

5) Do the same for node-fetch by typing 'npm install node-fetch' and hitting enter<br>

```
npm install node-fetch
```
Additional resources: [Discord.Js Guide](https://discordjs.guide/)

## 🚀 Deploying your own bot <a name = "deployment"></a>
Log onto the Discord Developer Portal: (https://discord.com/developers/applications) and create a new application.<br>

![working](https://imgur.com/JS4TdZK.png)<br>

Set your photo, name your bot, add a description.<br> 
Select "Bot" on the side panel, under settings.<br>
![working](https://imgur.com/Etzf6RF.png)<br>
Click to find your token, copy this and add it to the file config.json that you downloaded.<br> 
![working](https://imgur.com/n0drNJW.png)<br>
Replace "YOUR-DISCORD-TOKEN" with the token you copied.<br>
![working](https://imgur.com/br2RKT8.png)<br>

Go to OAuth2 on the Discord Developer Portal, located on the side panel under settings.<br>
![working](https://imgur.com/pE3KbZv.png)<br>

From here, click the bot square and generate a url. You can also set permissions below, or leave it blank.<br>
![working](https://imgur.com/KAIBhsi.png)<br>
Copy this url into your web browser and add the bot to a server you manage<br>
![working](https://imgur.com/GA84dnX.png)<br>

Additional resources: [Discord.Js Guide](https://discordjs.guide/)

### Config File

Now, it's time to configurate the bot. You've already changed the token, now it's time to input the parameters to make the APIs work.<br>
Open up the file 'config.json', this is the file we are changing.<br>

Connect your lovense toys to Lovense Connect App for Android. Once connected, copy and paste this link into a web browser: https://api.lovense.com/api/lan/getToys <br>
This returns a string of JSON that contains your domain, httpPort, and toyId. Copy then replace each 'domain' with your domain. Do the same for httpsPort and your toyIds. <br>
When complete, each link will have a unique domain, httpsPort, and toyId unless you do not own the toy. <br>
Save your config.json file and let's deploy the bot. <br>

**New**: If you would like to connect your toys via the lovense usb dongle for PC, you need to edit the API links in the config file. Remove the "A" before Vibrate/Rotate in each link in the config file. When you are done each link should look like: 

```
https://{domain}:{httpsPort}/Vibrate?v=speed&t=toyId or https://{domain}:{httpsPort}/RotateClockwise?v=speed&t=toyId
```
### Deploy the Bot

1) Go to the main file folder that you downloaded from GitHub and reopen your Powershell window (shift+LeftClick) if you have closed it. 

	This time, copy and paste the following in powershell:
	```
	node deploy-commands.js
	```
	This should reply with 'Successfully registered slash commands.' This will need to be repeated each time the 			deploy-commands.js file is changed to add/remove commands. 

2)	Next, deploy the bot with 'node index.js', this will be how you start the bot each time. 

	```
	node index.js
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
- [ ] Commands for all Lovense toys (Max, Edge, others)
- [ ] Battery Life command
- [ ] Bot Hosting
- [ ] Ability to change parameters (toyId, domain/port) via discord commands
- [ ] Neater code, a command handler plus separate files for commands

### In Progress:



### Done:

- [x] Complete Readme.md with full instructions for LolaBot
- [x] Upload LolaBot code, start readme.md 

## ✍️ Authors <a name = "authors"></a>
+ [@lolabray](https://github.com/lolabray)

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

+ [Discord.Js Guide](https://discordjs.guide/)
