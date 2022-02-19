const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

var avalaibleToys = [];
var domain, port;

// replace with fetch.
fetch("https://api.lovense.com/api/lan/getToys")
  .then(async (response) => {
    var lovenseConfig = await response.json();

    var keys = Object.keys(lovenseConfig);
    if (keys.length === 0) {
      console.error("No information found in LovenseConfig file");
      process.exit(1);
    } else if (keys.length > 1) {
      console.error(
        "Multiple connected users on same network, currently not setup to support this."
      );
      process.exit(1);
    }

    domain = keys[0];
    var lovenseDetails = lovenseConfig[domain];
    port = lovenseDetails.httpsPort;

    console.log("Lovense Details: ");
    console.log("Domain:        " + domain);
    console.log("Port (Secure): " + port);
    console.log("Device:        " + lovenseDetails.platform);
    console.log("Toys:");
    for (const [toyId, toyDetails] of Object.entries(lovenseDetails.toys)) {
      console.log(
        `${toyDetails.nickName}: (${toyDetails.id})  [Version: ${
          toyDetails.version
        }] [Battery: ${toyDetails.battery}]     ${
          toyDetails.status === 1 ? "Connected" : "Disconnected"
        }`
      );

      avalaibleToys.push({
        toy: toyDetails.name,
        nickName: toyDetails.nickName,
        id: toyDetails.id,
      });
    }

    client.once("ready", () => {
      console.log("LolaBot 3.0 - Ready to Play!");
    });

    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;

      const { commandName, options } = interaction;
      switch (commandName) {
        case "ping":
          await interaction.reply("Pong!"); // Test command
          break;

        case "server":
          await interaction.reply(
            `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
          );
          break;

        case "user":
          await interaction.reply(
            `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
          );
          break;

        case "battery":
          await interaction.deferReply();
          await fetch(lovenseUrl("Battery", { t: options.getString("toy") }))
            .then((value) => {
              // Return with the value.
              interaction.reply("Success");
            })
            .catch(() => {
              interaction.reply("Failed");
            });
          break;

        case "low":
        case "medium":
        case "high":
        case "stop":
          var toy = options.getString("toy");

          var params = {
            sec: 0,
            v:
              commandName === "high"
                ? 20
                : commandName === "medium"
                ? 10
                : commandName === "low"
                ? 1
                : 0, // Stop
          };
          if (toy !== "ALL") {
            params.t = toy;
          }
          await fetch(lovenseUrl("AVibrate", params));
          break;

        case "pulse":
        case "circle":
        case "grind":
          var toy = options.getString("toy");

          var params = {
            sec: 0,
            v:
              commandName === "pulse"
                ? 1
                : commandName === "circle"
                ? 2
                : commandName === "grind"
                ? 3
                : 0, // Something?
          };
          if (toy !== "ALL") {
            params.t = toy;
          }
          await fetch(lovenseUrl("Preset", params)).then((response) =>
            response.json()
          );
          interaction.reply("Keep going harder.");
          break;


		case 'rotateleft':
		case 'rotateright':
		case 'stoprotate':

			break;
        // case 'noraleft':
        // 	await fetch(nora_left).then(response => response.json());
        // 	interaction.reply('Make me cum!');

        // case 'noraright':
        // 	await fetch(nora_right).then(response => response.json());
        // 	interaction.reply('I want more');

        // case 'norastopturn':
        // 	await fetch(nora_stopturn).then(response => response.json());
        // 	interaction.reply('I love when you play with me');
      }
    });

    client.login(token);
  })
  .catch((error) => {
    console.error(
      "Failed to load teh Lovense API for Toy Information. This can be due to many reasons."
    );
    console.error("Please provide the following if you have any issues:");
    console.error(error);
    process.exit(1);
  });

function lovenseUrl(endpoint, values) {
  return (
    `https://${domain}:${port}/${endpoint}` +
    (Object.keys(values).length > 0 ? `?${getProp(values)}` : "")
  );
}

function getProp(myData) {
  var out = [];
  for (var key in myData) {
    if (myData.hasOwnProperty(key)) {
      out.push(key + "=" + encodeURIComponent(myData[key]));
    }
  }
  return out.join("&");
}
