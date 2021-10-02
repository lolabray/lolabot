const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('lushhigh').setDescription('Play with the LUSH on HIGH.'),
	new SlashCommandBuilder().setName('lushmed').setDescription('Play with the LUSH on MEDIUM.'),
	new SlashCommandBuilder().setName('lushlow').setDescription('Play with the LUSH on LOW.'),
	new SlashCommandBuilder().setName('lushpulse').setDescription('Play with the LUSH on PULSE.'),
	new SlashCommandBuilder().setName('lushcircle').setDescription('Play with the LUSH on CIRCLE.'),
	new SlashCommandBuilder().setName('lushgrind').setDescription('Play with the LUSH on GRIND.'),
	new SlashCommandBuilder().setName('lushstop').setDescription('Stop the LUSH.'),
	new SlashCommandBuilder().setName('hushhigh').setDescription('Play with the HUSH on HIGH.'),
	new SlashCommandBuilder().setName('hushmed').setDescription('Play with the HUSH on MEDIUM.'),
	new SlashCommandBuilder().setName('hushlow').setDescription('Play with the HUSH on LOW.'),
	new SlashCommandBuilder().setName('hushpulse').setDescription('Play with the HUSH on PULSE.'),
	new SlashCommandBuilder().setName('hushcircle').setDescription('Play with the HUSH on CIRCLE.'),
	new SlashCommandBuilder().setName('hushgrind').setDescription('Play with the HUSH on GRIND.'),
	new SlashCommandBuilder().setName('hushstop').setDescription('Stop the HUSH.'),
	new SlashCommandBuilder().setName('domihigh').setDescription('Play with the DOMI on HIGH.'),
	new SlashCommandBuilder().setName('domimed').setDescription('Play with the DOMI on MEDIUM.'),
	new SlashCommandBuilder().setName('domilow').setDescription('Play with the DOMI on LOW.'),
	new SlashCommandBuilder().setName('domipulse').setDescription('Play with the DOMI on PULSE.'),
	new SlashCommandBuilder().setName('domicircle').setDescription('Play with the DOMI on CIRCLE.'),
	new SlashCommandBuilder().setName('domigrind').setDescription('Play with the DOMI on GRIND.'),
	new SlashCommandBuilder().setName('domistop').setDescription('Stop the DOMI.'),
	new SlashCommandBuilder().setName('norahigh').setDescription('Play with the NORA on HIGH.'),
	new SlashCommandBuilder().setName('noramed').setDescription('Play with the NORA on MEDIUM.'),
	new SlashCommandBuilder().setName('noralow').setDescription('Play with the NORA on LOW.'),
	new SlashCommandBuilder().setName('noraleft').setDescription('Play with the NORA on LEFT.'),
	new SlashCommandBuilder().setName('noraright').setDescription('Play with the NORA on RIGHT.'),
	new SlashCommandBuilder().setName('norastopturn').setDescription('Stop the NORA from TURNING.'),
	new SlashCommandBuilder().setName('norapulse').setDescription('Play with the NORA on PULSE.'),
	new SlashCommandBuilder().setName('noracircle').setDescription('Play with the NORA on CIRCLE.'),
	new SlashCommandBuilder().setName('noragrind').setDescription('Play with the NORA on GRIND.'),
	new SlashCommandBuilder().setName('norastop').setDescription('Stop the NORA from VIBRATING.'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered slash commands.'))
	.catch(console.error);