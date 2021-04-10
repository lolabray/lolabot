const Discord = require('discord.js');
const config = require('./config.json');
const sayings = require('./sayings.json');
const devices = require('./devices.json');
const Device = require('./device.js');
const commands = require('./Commands.json');
const CommandFactory = require('./commandFactory.js');
const commandFactory = new CommandFactory();
const client = new Discord.Client();
const fetch = require('node-fetch');
let guilds = {};
client.once('ready', () => {
	console.log('LolaBot 2.0 Ready to Play!');

	client.guilds.cache.each(function(guild) {

		guild.members.fetch(guild.ownerID).then(function(o) {
			guilds[guild.id] = {
				guildid: guild.id,
				ownerid: o.id,
				LoadedDevices: []
			}
			if(config.MainUser === o.user.username + "#" + o.user.discriminator)
			{
				for(var i = 0; i < devices.length; i++)
				{
					var newDevice = new Device(fetch,devices[i],commands,config.defaultDuration);
					guilds[guild.id].LoadedDevices.push(newDevice);
				}
			}
			//console.log(guilds);
		}).catch(console.error);
		//console.log(owner);

	});


});
client.on('guildCreate', guild => {
	guilds[guild.id] = {
		guildid: guild.id,
		ownerid: guild.ownerID,
		LoadedDevices: []
	};
});

client.on('message', message => {
	if (message.content === '!ping') {
		message.channel.send('Pong.');
	}
});

client.on('message', async message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	console.log(args);
	const command = args.shift().toLowerCase();
	commandFactory.fireCommand(command,message,args);
	if(message.channel.guild)
	{
		var LoadedDevices = guilds[message.channel.guild.id].LoadedDevices;
		for(var i = 0; i < LoadedDevices.length; i++)
		{
			if(command === LoadedDevices[i].deviceName)
			{
				var results = await LoadedDevices[i].fireCommand(message,args);
				if(results.error)
				{
					message.channel.send(results.message || "There was an error!");
				}
				else if(!results.foundCommand)
				{
					message.channel.send("No command '"+ args[0] + "' found for device: " + command);
				}
				else if(!results.notStop)
				{
					message.channel.send(sayings.stopmsg[sayings.stopmsg.length * Math.random() | 0]);
				}
				else {
					message.channel.send(sayings.changemsg[sayings.changemsg.length * Math.random() | 0]);
				}
				break;
			}
		}
	}
});

commandFactory.registerNewCommand("listdevices",function(message){
	var LoadedDevices = this[message.channel.guild.id].LoadedDevices;
	let deviceList = "";
	for(var i = 0; i < LoadedDevices.length; i++)
	{
		deviceList = deviceList + LoadedDevices[i].deviceName + (i !== LoadedDevices.length -1?",":"");
	}
	message.channel.send(deviceList);
},{
	thisObj:guilds,
	helptext: "Used to list devices in use for this room.\r\n!listdevices"
});

commandFactory.registerNewCommand("help",function(message,guilds,device){
	var LoadedDevices = guilds[message.channel.guild.id].LoadedDevices;
	var helptxt = "";
	if(device)
	{
		if(this.previousCommands[device] && this.previousCommands[device].helptext)
		{
			message.channel.send(this.previousCommands[device].helptext);
		}

		for(var i = 0; i < LoadedDevices.length; i++)
		{
			if(device == LoadedDevices[i].deviceName)
			{
				helptxt = "the device " + LoadedDevices[i].deviceName
					+ " has the following commands: " + LoadedDevices[i].allowedCommands.join(",")
				 + "\r\n!" + LoadedDevices[i].deviceName + " <command> <duration(if applicable)>";
				message.channel.send(helptxt);
				break;
			}
		}
	}
	else {
		helptxt = "The commands for the channel are: "
		for(command in this.previousCommands)
		{
				helptxt = helptxt + command + ",";
		}
		helptxt = helptxt.slice(0,-1);
		helptxt = helptxt + "\r\nand has the following devices: "
		for(var i = 0; i < LoadedDevices.length; i++)
		{
			helptxt = helptxt + LoadedDevices[i].deviceName + ",";
		}
		helptxt = helptxt.slice(0,-1);
		helptxt = helptxt + "\r\n!help <CommandName>\r\nto find out more about the command."
		message.channel.send(helptxt);
	}
},{
	thisObj:commandFactory,
	params:[guilds],
	helptext: "WTF! is this some sort of anomoly?!?!"
});

commandFactory.registerNewCommand("adddevice",function(message,guilds,deviceName,url,port,toyid){
	if(!deviceName)
	{
		message.channel.send("device name not supplied. !adddevice <deviceName> <url> <port> <toyid>");
		return;
	}
	if(!url)
	{
		message.channel.send("url not supplied. !adddevice <deviceName> <url> <port> <toyid>");
		return;
	}
	if(!port)
	{
		message.channel.send("port not supplied. !adddevice <deviceName> <url> <port> <toyid>");
		return;
	}
	if(!toyid)
	{
		message.channel.send("toyid not supplied. !adddevice <deviceName> <url> <port> <toyid>");
		return;
	}
	deviceName = deviceName.toLowerCase();
	if(commandFactory.previousCommands[deviceName])
	{
		message.channel.send("Device name interferes with command.");
	}
	for(guildID in guilds)
	{
		if(guilds[guildID].ownerid === message.author.id)
		{
			var deviceExists = false
			for(var i = 0; i <guilds[guildID].LoadedDevices.length; i++)
			{
				if(guilds[guildID].LoadedDevices[i].deviceName === deviceName)
				{
					message.channel.send("Device already exists!");
					deviceExists = true;
					break;
				}
			}
			if(!deviceExists)
			{
				var deviceCommands = ""
				for(var i = 0; i < commands.length; i++)
				{
					deviceCommands = deviceCommands + commands[i].commandName + ",";
				}
				deviceCommands = deviceCommands.slice(0,-1);
				var newDevice = new Device(fetch,{
					deviceName: deviceName,
					toyid: toyid,
					url: url,
					httpPort: port,
					commands: deviceCommands
				},commands,config.defaultDuration);
				guilds[guildID].LoadedDevices.push(newDevice);
				message.channel.send("Device added.");
			}
		}
	}
},
{
	params:[guilds],
	helptext: "Used to add device to list of devices.\r\n!adddevice <deviceName> <url> <port> <toyid>"
});

commandFactory.registerNewCommand("removedevice",function(message,guilds,deviceName){
	if(!deviceName)
	{
		message.channel.send("deviceName not supplied. !removedevice <deviceName>");
	}
	for(guildID in guilds)
	{
		if(guilds[guildID].ownerid === message.author.id)
		{
			var deviceExists = false
			for(var i = 0; i <guilds[guildID].LoadedDevices.length; i++)
			{
				if(guilds[guildID].LoadedDevices[i].deviceName === deviceName)
				{
					delete guilds[guildID].LoadedDevices.splice(i,1);
					deviceExists = true;
					break;
				}
			}
		}
	}
},
{
	params:[guilds],
	helptext: "Used to remove device.\r\n!removedevice <deviceName>"
});

commandFactory.registerNewCommand("adddevicecmd",function(message,guilds,deviceName,commands){
	if(!deviceName)
	{
		message.channel.send("deviceName not supplied. !adddevicecmd <deviceName> <commands(comma delimeted)>");
	}
	if(!commands)
	{
		message.channel.send("commands not supplied. !adddevicecmd <deviceName> <commands(comma delimeted)>");
	}
	commands = commands.toLowerCase();
	for(guildID in guilds)
	{
		if(guilds[guildID].ownerid === message.author.id)
		{
			var deviceExists = false
			for(var i = 0; i <guilds[guildID].LoadedDevices.length; i++)
			{
				if(guilds[guildID].LoadedDevices[i].deviceName === deviceName)
				{
					guilds[guildID].LoadedDevices[i].allowedCommands = guilds[guildID].LoadedDevices[i]
						.allowedCommands.concat(
							commands.split(",").filter(c => guilds[guildID].LoadedDevices[i].allowedCommands.indexOf(c) < 0))
					deviceExists = true;
					break;
				}
			}
		}
	}
},
{
	params:[guilds],
	helptext: "Used to add commands to a device.\r\n!adddevicecmd <deviceName> <CommandList(comma separated)>"
});

commandFactory.registerNewCommand("removedevicecmd",function(message,guilds,deviceName,commands){
	if(!deviceName)
	{
		message.channel.send("deviceName not supplied. !adddevicecmd <deviceName> <commands(comma delimeted)>");
	}
	if(!commands)
	{
		message.channel.send("commands not supplied. !adddevicecmd <deviceName> <commands(comma delimeted)>");
	}
	commands = commands.toLowerCase();
	for(guildID in guilds)
	{
		if(guilds[guildID].ownerid === message.author.id)
		{
			var deviceExists = false
			for(var i = 0; i <guilds[guildID].LoadedDevices.length; i++)
			{
				if(guilds[guildID].LoadedDevices[i].deviceName === deviceName)
				{
					var arrycmds = commands.split(",");
					console.log(arrycmds);
					guilds[guildID].LoadedDevices[i].allowedCommands = guilds[guildID].LoadedDevices[i]
						.allowedCommands.filter(c => arrycmds.indexOf(c) < 0)
					deviceExists = true;
					break;
				}
			}
		}
	}
},
{
	params:[guilds],
	helptext: "Used to remove commands from a device.\r\n!removedevicecmd <deviceName> <CommandList(comma separated)>"
});

commandFactory.registerNewCommand("setdevice",function(message,guilds,deviceName,isPublic)
{
	if(!deviceName)
	{
		message.channel.send("deviceName required. !setdevice <deviceName> <isPublic(true/false)>");
		return;
	}
	if(typeof(isPublic) === "string")
	{
		isPublic = isPublic.toLowerCase();
		if(!(isPublic === "true" || isPublic === "false"))
		{
			message.channel.send("isPublic needs to be true or false. !setdevice <deviceName> <isPublic(true/false)>");
			return;
		}
	}
	else {
		message.channel.send("isPublic required. !setdevice <deviceName> <isPublic(true/false)>");
		return;
	}
	if(message.author.id !== message.channel.guild.ownerID)
	{
		message.channel.send("setdevice requires you to be the owner of this channel.");
		return
	}
	deviceName = deviceName.toLowerCase();
	var curGuild = guilds[message.channel.guild.id];
	var deviceFound = false;

	for(var i = 0; i < curGuild.LoadedDevices.length; i++)
	{
		if(curGuild.LoadedDevices[i].deviceName === deviceName)
		{
			console.log(curGuild);
			curGuild.LoadedDevices[i].isPublic = (isPublic === "true");
			message.channel.send("device set to " + ((isPublic === "true")?"public":"private"));
			deviceFound = true;
			break;
		}
	}
	if(!deviceFound)
	{
		message.channel.send("device not found.");
	}
},{
	params:[guilds],
	helptext: "sets devices state to public/private.\r\n!setdevice <deviceName> <isPublic(true/false)>"
});

commandFactory.registerNewCommand("adddeviceuser",function(message,guilds,deviceName)
{
	if(!deviceName)
	{
		message.channel.send("deviceName required. !adddeviceuser <deviceName> @Mentions");
		return;
	}
	if(message.author.id !== message.channel.guild.ownerID)
	{
		message.channel.send("adddeviceuser requires you to be the owner of this channel.");
		return
	}
	deviceName = deviceName.toLowerCase();
	var curGuild = guilds[message.channel.guild.id];
	var deviceFound = false;
	for(var i = 0; i < curGuild.LoadedDevices.length; i++)
	{
		if(curGuild.LoadedDevices[i].deviceName === deviceName)
		{
			if(message.mentions.everyone)
			{
				curGuild.LoadedDevices[i].isPublic = true;
			}

			message.mentions.members.each(function(m){
				if(curGuild.LoadedDevices[i].authorizedUsers.indexOf(m.id) < 0)
				{
					curGuild.LoadedDevices[i].authorizedUsers.push(m.id);
				}
			});

			deviceFound = true;
			break;
		}
	}
	if(!deviceFound)
	{
		message.channel.send("device not found.");
	}
},{
	params:[guilds],
	helptext: "adds users to device for private control.\r\n!AdddeviceUser <DeviceName> <tag any number of users>"
});

commandFactory.registerNewCommand("removedeviceuser",function(message,guilds,deviceName)
{
	if(!deviceName)
	{
		message.channel.send("deviceName required. !removedeviceuser <deviceName> @Mentions");
		return;
	}
	if(message.author.id !== message.channel.guild.ownerID)
	{
		message.channel.send("removedeviceuser requires you to be the owner of this channel.");
		return
	}
	deviceName = deviceName.toLowerCase();
	var curGuild = guilds[message.channel.guild.id];
	var deviceFound = false;
	for(var i = 0; i < curGuild.LoadedDevices.length; i++)
	{
		if(curGuild.LoadedDevices[i].deviceName === deviceName)
		{
			if(message.mentions.everyone)
			{
				curGuild.LoadedDevices[i].isPublic = false;
				curGuild.LoadedDevices[i].authorizedUsers = [];
			}
			else {
				message.mentions.members.each(function(m){
					var userIndex = curGuild.LoadedDevices[i].authorizedUsers.indexOf(m.id);
					if(userIndex >= 0)
					{
						curGuild.LoadedDevices[i].authorizedUsers.splice(userIndex,1);
					}
				});
			}
			deviceFound = true;
			break;
		}
	}
	if(!deviceFound)
	{
		message.channel.send("device not found.");
	}
},{
	params:[guilds],
	helptext: "remove user from device permissions.\r\n!removedeviceuser <deviceName> <tag any number of users>"
});

client.login(config.token);
