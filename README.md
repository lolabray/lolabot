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
  [![License](https://img.shields.io/github/license/lolabray/lolabot?style=for-the-badge)](/LICENSE)

</div>

---

<p align="center"> The Discord Bot that controls your Lovense toys.
    <br> Currently supports Lush, Nora, Hush and Domi.
</p>

## 📝 Table of Contents
+ [About](#about)
+ [Demo](#demo)
+ [Usage](#usage)
+ [Getting Started](#getting_started)
+ [Deploying your own bot](#deployment)
+ [Built Using](#built_using)
+ [TO-DO](https://github.com/lolabray/lolabot/blob/main/todo.md)
+ [Contributing](../CONTRIBUTING.md)
+ [Authors](#authors)
+ [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>
LolaBot was developed by a camgirl who was looking for a way to control her lovense toys in her discord server. 
<br>LolaBot is contolled by text commands (example: !lushhigh) that activate the toys via the discord bot. 

## 🎥 Demo <a name = "demo"></a>
![Working](https://imgur.com/DfSrJgF.gif)

## 🎈 Usage <a name = "usage"></a>

To use the bot, type into your discord server after installation:
```
**LolaBot Commands:**

**Hush:**
!hushlow 
!hushmed 
!hushhigh 
!hushpulse 
!hushcircle 
!hushgrind
!hushstop

**Domi:**
!domilow 
!domimed 
!domihigh 
!domipulse 
!domicircle 
!domigrind
!domistop

**Nora:**
!noralow 
!noramed 
!norahigh 
!norapulse 
!noracircle 
!noragrind 
!noraright
!noraleft
!norastopvibe
!norastopturn

**Lush**
!lushlow
!lushmed
!lushhigh
!lushpulse
!lushcircle
!lushgrind
!lushstop
```

## 🏁 Getting Started <a name = "getting_started"></a>
### Installing <a name = "installing"></a>

Install node.js at https://nodejs.org/en/

You will need to download the code from GitHub, and open a powershell window (Shift+LeftClick) in the LolaBot main folder.
<br>
![working](https://imgur.com/pDFbcrt.gif)
<br>

In that powershell window, download discord js by typing:<br>

```
npm install discord.js

```
![working](https://imgur.com/IeITBJ0.gif)<br>

Do the same for node-fetch by typing:<br>

```
npm install node-fetch

```

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
