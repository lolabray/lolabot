const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const { lush_high, lush_med, lush_low, lush_pulse, lush_grind, lush_circle, lush_stop } = require('./config.json');
const { hush_high, hush_med, hush_low, hush_pulse, hush_grind, hush_circle, hush_stop } = require('./config.json');
const { domi_high, domi_med, domi_low, domi_pulse, domi_grind, domi_circle, domi_stop } = require('./config.json');
const { nora_high, nora_med, nora_low, nora_left, nora_right, nora_stopturn, nora_pulse, nora_grind, nora_circle, nora_stop} = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const fetch = require('node-fetch');


client.once('ready', () => {
	console.log('LolaBot 3.0 - Ready to Play!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!'); // Test command
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	} else if (commandName === 'lushhigh') { //Start of LUSH commands
		await fetch(lush_high).then(response => response.json());
	    interaction.reply('Spank me!');
	} else if (commandName === 'lushmed') {
		await fetch(lush_med).then(response => response.json());
	    interaction.reply('I love when you play with me');
	} else if (commandName === 'lushlow') {
		await fetch(lush_low).then(response => response.json());
	    interaction.reply('Oh baby, that feels good');
	} else if (commandName === 'lushpulse') {
		await fetch(lush_pulse).then(response => response.json());
	    interaction.reply('Keep going harder.');
	} else if (commandName === 'lushcircle') {
		await fetch(lush_circle).then(response => response.json());
	    interaction.reply('This feels amazing.');
	} else if (commandName === 'lushgrind') {
		await fetch(lush_grind).then(response => response.json());
	    interaction.reply('Right there!!');
	} else if (commandName === 'lushstop') {
		await fetch(lush_stop).then(response => response.json());
	    interaction.reply('You stopped the LUSH.');
	} else if (commandName === 'hushhigh') { //Start of HUSH commands
		await fetch(hush_high).then(response => response.json());
	    interaction.reply('Harder, baby.');
	} else if (commandName === 'hushmed') {
		await fetch(hush_med).then(response => response.json());
	    interaction.reply('Mmmmmmm!');
	} else if (commandName === 'hushlow') {
		await fetch(hush_low).then(response => response.json());
	    interaction.reply('You make me so wet!');
	} else if (commandName === 'hushpulse') {
		await fetch(hush_pulse).then(response => response.json());
	    interaction.reply('I wish you were fucking me');
	} else if (commandName === 'hushcircle') {
		await fetch(hush_circle).then(response => response.json());
	    interaction.reply('Give me more');
	} else if (commandName === 'hushgrind') {
		await fetch(hush_grind).then(response => response.json());
	    interaction.reply('Fuck my tight ass');
	} else if (commandName === 'hushstop') {
		await fetch(hush_stop).then(response => response.json());
	    interaction.reply('You stopped the HUSH.');
	} else if (commandName === 'domihigh') { //Start of DOMI commands
		await fetch(domi_high).then(response => response.json());
	    interaction.reply('Make me cum!');
	} else if (commandName === 'domimed') {
		await fetch(domi_med).then(response => response.json());
	    interaction.reply('I want more');
	} else if (commandName === 'domilow') {
		await fetch(domi_low).then(response => response.json());
	    interaction.reply('I love when you play with me');
	} else if (commandName === 'domipulse') {
		await fetch(domi_pulse).then(response => response.json());
	    interaction.reply('Send me over the edge');
	} else if (commandName === 'domicircle') {
		await fetch(domi_circle).then(response => response.json());
	    interaction.reply('It feels so good');
	} else if (commandName === 'domigrind') {
		await fetch(domi_grind).then(response => response.json());
	    interaction.reply('Make me squirt!');
	} else if (commandName === 'domistop') {
		await fetch(domi_stop).then(response => response.json());
	    interaction.reply('You stopped the DOMI.');
	} else if (commandName === 'norahigh') { //Start of NORA commands
		await fetch(nora_high).then(response => response.json());
	    interaction.reply('Make me cum!');
	} else if (commandName === 'noramed') {
		await fetch(nora_med).then(response => response.json());
	    interaction.reply('I want more');
	} else if (commandName === 'noralow') {
		await fetch(nora_low).then(response => response.json());
	    interaction.reply('I love when you play with me');
	} else if (commandName === 'noraleft') {
		await fetch(nora_left).then(response => response.json());
	    interaction.reply('Make me cum!');
	} else if (commandName === 'noraright') {
		await fetch(nora_right).then(response => response.json());
	    interaction.reply('I want more');
	} else if (commandName === 'norastopturn') {
		await fetch(nora_stopturn).then(response => response.json());
	    interaction.reply('I love when you play with me');
	} else if (commandName === 'norapulse') {
		await fetch(nora_pulse).then(response => response.json());
	    interaction.reply('Send me over the edge');
	} else if (commandName === 'noracircle') {
		await fetch(nora_circle).then(response => response.json());
	    interaction.reply('It feels so good');
	} else if (commandName === 'noragrind') {
		await fetch(nora_grind).then(response => response.json());
	    interaction.reply('Make me squirt!');
	} else if (commandName === 'norastop') {
		await fetch(nora_stop).then(response => response.json());
	    interaction.reply('You stopped the DOMI.');
	}
});

client.login(token);
