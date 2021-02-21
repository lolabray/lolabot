const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const fetch = require('node-fetch');
const prefix = '!';

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === '!ping') {
		message.channel.send('Pong.');
	}
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if (command === 'hushlow') {
	const { file } = await fetch(config.hush_low).then(response => response.json());

	 message.channel.send('You make me so wet');
	}
	 
	  if (command === 'hushmed') {
	const { file } = await fetch(config.hush_med).then(response => response.json());

	 message.channel.send('Mmmmmmm');
     }
	   if (command === 'hushhigh') {
	const { file } = await fetch(config.hush_high).then(response => response.json());

	 message.channel.send('Harder, baby');
     }
	 
	  	     if (command === 'hushpulse') {
	const { file } = await fetch(config.hush_pulse).then(response => response.json());

	 message.channel.send('I wish you were fucking me');
	}
	 
	  if (command === 'hushcircle') {
	const { file } = await fetch(config.hush_circle).then(response => response.json());

	 message.channel.send('Give me more');
     }
	   if (command === 'hushgrind') {
	const { file } = await fetch(config.hush_grind).then(response => response.json());

	 message.channel.send('Fuck my tight ass');
     }
	 
	  if (command === 'hushstop') {
	const { file } = await fetch(config.hush_stop).then(response => response.json());

	 message.channel.send('Dont stop!');
	}
	 
	     if (command === 'domilow') {
	const { file } = await fetch(config.domi_low).then(response => response.json());

	 message.channel.send('I love when you play with me');
	}
	 
	  if (command === 'domimed') {
	const { file } = await fetch(config.domi_med).then(response => response.json());

	 message.channel.send('I want more');
     }
	   if (command === 'domihigh') {
	const { file } = await fetch(config.domi_high).then(response => response.json());

	 message.channel.send('Make me cum!');
     }
	 
	 	     if (command === 'domipulse') {
	const { file } = await fetch(config.domi_pulse).then(response => response.json());

	 message.channel.send('Send me over the edge');
	}
	 
	  if (command === 'domicircle') {
	const { file } = await fetch(config.domi_circle).then(response => response.json());

	 message.channel.send('It feels so good');
     }
	   if (command === 'domigrind') {
	const { file } = await fetch(config.domi_grind).then(response => response.json());

	 message.channel.send('Make me squirt!');
     }
	 
	  if (command === 'domistop') {
	const { file } = await fetch(config.domi_stop).then(response => response.json());

	 message.channel.send('I want more!');
	}
	 
	 	     if (command === 'noralow') {
	const { file } = await fetch(config.nora_low).then(response => response.json());

	 message.channel.send('Oh baby!');
	}
	 
	  if (command === 'noramed') {
	const { file } = await fetch(config.nora_med).then(response => response.json());

	 message.channel.send('Give it to me!');
     }
	   if (command === 'norahigh') {
	const { file } = await fetch(config.nora_high).then(response => response.json());

	 message.channel.send('Fuck me harder');
     }
	 
	 	     if (command === 'norapulse') {
	const { file } = await fetch(config.nora_pulse).then(response => response.json());

	 message.channel.send('Fill me up!');
	}
	 
	  if (command === 'noracircle') {
	const { file } = await fetch(config.nora_circle).then(response => response.json());

	 message.channel.send('Yeah mmmm, right there');
     }
	   if (command === 'noragrind') {
	const { file } = await fetch(config.nora_grind).then(response => response.json());

	 message.channel.send('Play with my pussy!');
     }
	 
	  if (command === 'noraright') {
	const { file } = await fetch(config.nora_right).then(response => response.json());

	 message.channel.send('Mmmmm hit that gspot');
     }
	   if (command === 'noraleft') {
	const { file } = await fetch(config.nora_left).then(response => response.json());

	 message.channel.send('Fuck me');
     }
	 
	  if (command === 'norastopvibe') {
	const { file } = await fetch(config.nora_stop_vibe).then(response => response.json());

	 message.channel.send('Mmmmmm keep going!');
	}
	
	 if (command === 'norastopturn') {
	const { file } = await fetch(config.nora_stop_turn).then(response => response.json());

	 message.channel.send('Im begging for more');
	}

	if (command === 'lushlow') {
	const { file } = await fetch(config.lush_low).then(response => response.json());

	 message.channel.send('Oh baby, that feels good');
	}
	 
	  if (command === 'lushmed') {
	const { file } = await fetch(config.lush_med).then(response => response.json());

	 message.channel.send('I love when you play with me');
     }
	   if (command === 'lushhigh') {
	const { file } = await fetch(config.lush_high).then(response => response.json());

	 message.channel.send('Spank me!');
     }
	 
	  	     if (command === 'lushpulse') {
	const { file } = await fetch(config.lush_pulse).then(response => response.json());

	 message.channel.send('Keep going harder.');
	}
	 
	  if (command === 'lushcircle') {
	const { file } = await fetch(config.lush_circle).then(response => response.json());

	 message.channel.send('This feels amazing.');
     }
	   if (command === 'lushgrind') {
	const { file } = await fetch(config.lush_grind).then(response => response.json());

	 message.channel.send('Right there!!');
     }
	 
	  if (command === 'lushstop') {
	const { file } = await fetch(config.lush_stop).then(response => response.json());

	 message.channel.send('Keep going!');
	}
});

client.login(config.token);
