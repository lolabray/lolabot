const { Client, Intents } = require("discord.js");
const { token, config_domain, config_port, defaultPower } = require("./config.json");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const returnMessages = [
  "Spank me!",
  "I love when you play with me",
  "Oh baby, that feels good",
  "Keep going harder.",
  "This feels amazing.",
  "Right there!!",
  "Harder, baby.",
  "Mmmmmmm!",
  "You make me so wet!",
  "I wish you were fucking me",
  "Send me over the edge",
  "Give me more",
  "Fuck my tight ass",
  "Make me cum!",
  "I want more",
  "It feels so good",
  "Make me squirt!",
];

var availableToys = [];
var domain, port, platform;

// replace with fetch.
fetch("https://api.lovense.com/api/lan/getToys")
  .then(async (response) => {
    var lovenseConfig = await response.json();

    var keys = Object.keys(lovenseConfig);
    if (keys.length === 0) {
      if (config_domain !== "" && config_port !== "") {
        directConfig();
      }
      else {
        console.error("No information found in Lovense Config");
        console.error(
          "Please check you are running the Lovense CONNECT (not remote) App on your Phone or Desktop PC."
        );
        console.error(
          "Please also check that you can see information returned from: https://api.lovense.com/api/lan/getToys website."
        );
        console.warn(
          "If this continues to fail again and again... You can go to the URL Above and use the \"domain\" and \"httpsPort\" (not httpPort) and place them into the config_domain and config_port in the config.json file."
        )
        console.error("");

        process.exit(1);
      }
    }
    else if (keys.length > 1) {
      console.error(
        "Multiple connected users on same network, currently not setup to support this."
      );
      process.exit(1);
    }

    else {
      domain = keys[0];
      var lovenseDetails = lovenseConfig[domain];
      port = lovenseDetails.httpsPort;
      platform = lovenseDetails.platform;

      console.log("Lovense Details: ");
      console.log("Domain:        " + domain);
      console.log("Port (Secure): " + port);
      console.log("Device:        " + platform);
      console.log("Toys:");
      for (const [toyId, toyDetails] of Object.entries(lovenseDetails.toys)) {
        var nickname =
          toyDetails.nickName !== ""
            ? `${toyDetails.nickName} - (${toyDetails.name})`
            : toyDetails.name;

        console.log(
          `${nickname}: (${toyDetails.id})  `+
          `[Version: ${toyDetails.version}] `+
          `[Battery: ${toyDetails.battery.toString().padStart(3, ' ')}]     `+
          `${toyDetails.status === 1 ? "Connected" : "Disconnected"}`
        );

        availableToys.push({
          toy: nickname,
          nickName: toyDetails.nickName,
          id: toyDetails.id,
        });
      }

      startBot();
    }
  })
  .catch((error) => {
    console.error(
      "Failed to load the Lovense API for Toy Information. This can be due to many reasons."
    );
    console.error("Please provide the following if you have any issues:");
    console.error(error);
    process.exit(1);
  });



function directConfig() {

  fetch(`https://${config_domain}:${config_port}/GetToys`)
  .then(async (data) => {
    var response = await data.json();

    if (response.code === "200") {
        domain    = config_domain;
        port      = config_port;
        platform  = config_domain.indexOf('127-0-0-1') !== -1 ? "pc" : "mobile (unknown)"

        console.log("Lovense Details: ");
        console.log("Domain:        " + domain);
        console.log("Port (Secure): " + port);
        console.log("Device:        " + platform);
        console.log("Toys:");
        for (const [toyId, toyDetails] of Object.entries(response.data)) {
          var nickname =
            toyDetails.nickName !== ""
              ? `${toyDetails.nickName} - (${toyDetails.name})`
              : toyDetails.name;

          console.log(
            `  ${nickname}: (${toyDetails.id})  `+
            `[Version: ${toyDetails.version}] `+
            `[Battery: ${toyDetails.battery.toString().padStart(3, ' ')}]     `+
            `${toyDetails.status === 1 ? "Connected" : "Disconnected"}`
          );

          availableToys.push({
            toy: nickname,
            nickName: toyDetails.nickName,
            id: toyDetails.id,
          });
        }

        startBot();

      }
      else {
        console.error(
          `Lovense API returned a Unexpected code of ${response.code}`
        );
        console.error(
          `Please provide the following details in the error report:`
        )
        console.error(response)
        process.exit(1);
      }
    })
}

function startBot() {
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
        // "Bot" is thinking...
        // We need to "edit" the reply afterwards
        await interaction.deferReply();

        var selectedToy = options.getString("toy", false);
        var params = {};

        await fetch(lovenseUrl("GetToys", params))
          .then(async (request) => {
            var toyInfo = await request.json();

            var outputMessage =
              "Toy Battery" +
              (Object.entries(toyInfo.data).length > 1 && selectedToy === null ? "s" : "") +
              ":";

            for (const [toyId, toyDetails] of Object.entries(toyInfo.data)) {
              // Only get the user selected Toys.
              if (selectedToy !== null && selectedToy !== toyId) {
                continue;
              }

              var nickname =
                toyDetails.nickName !== ""
                  ? `${toyDetails.nickName} - (${toyDetails.name})`
                  : toyDetails.name;

              outputMessage +=
                `\n> ${nickname}: \`${toyDetails.battery.toString().padStart(3, ' ')}\` | `+
                  `${toyDetails.status === 1 ? "Connected" : "Disconnected"}`;
            }

            interaction.editReply( outputMessage );
          })
          .catch((e) => {
            interaction.editReply("Failed to get Battery ;-;");
            console.log("Error has been encountered while trying to get Battery:", e);
          });
        break;


      case "vibrate":
        var toy = options.getString("toy");
        var power = options.getInteger("power", false);
        if (!power) { power = defaultPower; }

        var params = {
          sec: 0,
          v: power
        }
        if (toy !== 'ALL') {
          params.t = toy;
        }

        await fetch(lovenseUrl("AVibrate", params));
        interaction.reply(getRandomMessage());
        break;

      case "stopvibrate":
        var toy = options.getString("toy");

        var params = {
          sec: 0,
          v: 0
        }
        if (toy !== 'ALL') {
          params.t = toy;
        }

        await fetch(lovenseUrl("AVibrate", params));
        interaction.reply(
          `Stopping ${getToyName(toy)}`
        );
        break;

      // ==============================
      // PRESET SPECIFIC COMMANDS

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
        interaction.reply(getRandomMessage());
        break;

      // ==============================
      // EDGE SPECIFIC COMMANDS

      case "vibrateedge":
        var location = options.getString("location");
        var toy = options.getString("toy");

        var power = options.getInteger("power", false)
        if (!power) { power = defaultPower; }

        var params = {
          sec: 0,
          v: power
        }
        if (toy !== "ALL") {
          params.t = toy;
        }

        if (location === "top") {
          await fetch(lovenseUrl("AVibrate1", params)).then((response) => {
            response.json()
          });
        }
        else if (location === "bottom") {
          await fetch(lovenseUrl("AVibrate2", params)).then((response) => {
            response.json()
          });
        }

        interaction.reply(getRandomMessage());
        break;

      // ==============================
      // NORA SPECIFIC COMMANDS

      case "rotateleft":
        var toy = options.getString("toy");
        var power = options.getInteger("power", false)
        if (!power) { power = defaultPower; }

        var params = {
          v: power
        }
        if (toy !== "ALL") {
          params.t = toy;
        }
        await fetch(lovenseUrl("ARotateAntiClockwise", params)).then((response) =>
          response.json()
        );
        interaction.reply(getRandomMessage());
        break;

      case "rotateright":
        var toy = options.getString("toy");
        var power = options.getInteger("power", false)
        if (!power) { power = defaultPower; }

        var params = {
          v: power
        }
        if (toy !== "ALL") {
          params.t = toy;
        }
        await fetch(lovenseUrl("ARotateClockwise", params)).then((response) =>
          response.json()
        );
        interaction.reply(getRandomMessage());
        break;

      case "stoprotate":
        var toy = options.getString("toy");

        var params = {
          v: 0
        }
        if (toy !== "ALL") {
          params.t = toy;
        }
        await fetch(lovenseUrl("ARotateAntiClockwise", params)).then((response) =>
          response.json()
        );
        interaction.reply(
          `Stopping rotating on ${getToyName(options.getString("toy"))}`
        );
        break;


      // ==============================
      // LEGACY COMMANDS based upon the original re-make
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

        if (commandName === "stop") {
          interaction.reply(
            `Stopping ${getToyName(toy)}`
          );
        } else {
          interaction.reply(getRandomMessage());
        }
        break;
    }
  });

  client.login(token);
}


// ============================================================================
// Helper Functions

function lovenseUrl(endpoint, values) {
  if (endpoint.indexOf("A") === 0 && platform == "pc") {
    endpoint = endpoint.substring(1); // Removes the A for PC specific.
  }

  return (
    `https://${domain}:${port}/${endpoint}` +
    (Object.keys(values).length > 0 ? `?${getProp(values)}` : "")
  );

  function getProp(myData) {
    var out = [];
    for (var key in myData) {
      if (myData.hasOwnProperty(key)) {
        out.push(key + "=" + encodeURIComponent(myData[key]));
      }
    }
    return out.join("&");
  }
}

/**
 * Get a Toy's Name from it's ID. Helpful when getting stuff from Discord's response. (Returns "All Toys" on "ALL" ID)
 * @param {String} id ID of a Toy
 * @returns Toy's Name
 */
function getToyName(id) {
  if (id === "ALL") {
    return "All Toys";
  }

  var toy = availableToys.filter((toy) => toy.id === id);
  return toy.length === 1
    ? toy[0].nickName !== "" && toy[0].nickName !== undefined
      ? toy[0].nickName
      : toy[0].toy
    : null;
}

function getRandomMessage() {
  return returnMessages[Math.floor(Math.random() * returnMessages.length)];
}
