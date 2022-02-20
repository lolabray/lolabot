const {
  SlashCommandBuilder,
  SlashCommandStringOption,
} = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token, config_domain, config_port } = require("./config.json");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Reduce commands to:
// High / Medium / Low
// Preset 1 (pulse), 2 (circle), 3 (grind)
// Stop
var toyValues = [];
var toyValuesPlusAll = [];

fetch("https://api.lovense.com/api/lan/getToys").then(async (response) => {
  var lovenseConfig = await response.json();

  var keys = Object.keys(lovenseConfig);
  if (keys.length === 0) {
    if (config_domain !== "" && config_port !== "") {
      directConfig();
      return;
    }
    else {
      console.error("No information found in Lovense Config");
      console.error(
        "Please check you are running the Lovesense CONNECT (not remote) App on your Phone or Desktop PC."
      );
      console.error(
        "Please also check that you can see information returned from: https://api.lovense.com/api/lan/getToys website."
      );
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
    var domain = keys[0];
    var lovenseDetails = lovenseConfig[domain];

    console.log("Lovense Details: ");
    console.log("Domain:        " + lovenseDetails.domain);
    console.log("Port (Secure): " + lovenseDetails.httpsPort);
    console.log("Device:        " + lovenseDetails.platform);
    console.log("Toys:");
    for (const [_id, toyDetails] of Object.entries(lovenseDetails.toys)) {
      var nickname =
        toyDetails.nickName !== ""
          ? `${toyDetails.nickName} - (${toyDetails.name})`
          : toyDetails.name;

      console.log(
        `${nickname}: (${toyDetails.id})  ` +
          `[Version: ${toyDetails.version}] [Battery: ${toyDetails.battery}] - ` +
          `${toyDetails.status === 1 ? "Connected" : "Disconnected"}`
      );

      toyValues.push({
        name: nickname,
        safeName: toyDetails.name,
        value: toyDetails.id,
      });
    }

    registerCommands(toyValues);
  }

});

function fixObject(array) {
  return array.map((e) => [e.name, e.value]);
}

function directConfig() {
  fetch(`https://${config_domain}:${config_port}/GetToys`)
    .then(async (data) => {
      var response = await data.json();

      if (response.code === "200") {

        console.log("Lovense Details: ");
        console.log("Domain:        " + config_domain);
        console.log("Port (Secure): " + config_port);
        console.log("Device:        " + (config_domain.indexOf('127-0-0-1') !== -1 ? "pc" : "mobile (unknown)"));
        console.log("Toys:");
        for (const [_id, toyDetails] of Object.entries(response.data)) {
          var nickname =
            toyDetails.nickName !== ""
              ? `${toyDetails.nickName} - (${toyDetails.name})`
              : toyDetails.name;

          console.log(
            `  ${nickname}: (${toyDetails.id})  ` +
              `[Version: ${toyDetails.version}] [Battery: ${toyDetails.battery}] - ` +
              `${toyDetails.status === 1 ? "Connected" : "Disconnected"}`
          );

          toyValues.push({
            name: nickname,
            safeName: toyDetails.name,
            value: toyDetails.id,
          });
        }

        registerCommands(toyValues);
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

function registerCommands(toyValues) {
  toyValuesPlusAll = Object.create(toyValues);
  toyValuesPlusAll.push({
    name: "All",
    value: "ALL",
    safeName: "ALL",
  });

  // =====================================================
  // Basics, Commands which will always be visible.

  const commands = [
    new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Replies with pong!"),

    new SlashCommandBuilder()
      .setName("server")
      .setDescription("Replies with server info!"),

    new SlashCommandBuilder()
      .setName("user")
      .setDescription("Replies with user info!"),

    new SlashCommandBuilder()
      .setName("battery")
      .setDescription("See battery of given Toy")
      .addStringOption((option) =>
        option
          .setName("toy")
          .setRequired(true)
          .setDescription("Pick a Toy")
          .setChoices(fixObject(toyValues))
      ),

    new SlashCommandBuilder()
      .setName("high")
      .setDescription("Set a toy to HIGH POWER!")
      .addStringOption((option) =>
        option
          .setName("toy")
          .setRequired(true)
          .setDescription("Pick a Toy")
          .setChoices(fixObject(toyValuesPlusAll))
      ),

    new SlashCommandBuilder()
      .setName("medium")
      .setDescription("Set a toy to Medium Power!")
      .addStringOption((option) =>
        option
          .setName("toy")
          .setRequired(true)
          .setDescription("Pick a Toy")
          .setChoices(fixObject(toyValuesPlusAll))
      ),

    new SlashCommandBuilder()
      .setName("low")
      .setDescription("Set a toy to low power!")
      .addStringOption((option) =>
        option
          .setName("toy")
          .setRequired(true)
          .setDescription("Pick a Toy")
          .setChoices(fixObject(toyValuesPlusAll))
      ),

    new SlashCommandBuilder()
      .setName("stop")
      .setDescription("Stop a toy. ;-;")
      .addStringOption((option) =>
        option
          .setName("toy")
          .setRequired(true)
          .setDescription("Pick a Toy")
          .setChoices(fixObject(toyValuesPlusAll))
      ),
  ];

  // =====================================================
  // Presets, Only avaliable on specific toys.

  var presetToys = toyValuesPlusAll.filter((a) => {
    return ["lush", "hush", "ambi", "edge", "domi", "osci", "all"].indexOf(
      a.safeName.toLowerCase()
    ) !== -1;
  });
  if (presetToys.length > 0) {
    commands.push(
      new SlashCommandBuilder()
        .setName("pulse")
        .setDescription("Pulse a Toy (Preset 1)")
        .addStringOption((option) =>
          option
            .setName("toy")
            .setRequired(true)
            .setDescription("Pick a Toy")
            .setChoices(fixObject(presetToys))
        ),

      new SlashCommandBuilder()
        .setName("grind")
        .setDescription("Grind a Toy (Preset 2)")
        .addStringOption((option) =>
          option
            .setName("toy")
            .setRequired(true)
            .setDescription("Pick a Toy")
            .setChoices(fixObject(presetToys))
        ),

      new SlashCommandBuilder()
        .setName("circle")
        .setDescription("Circle a Toy (Preset 3)")
        .addStringOption((option) =>
          option
            .setName("toy")
            .setRequired(true)
            .setDescription("Pick a Toy")
            .setChoices(fixObject(presetToys))
        )
    );
  }

  var noraToys = toyValuesPlusAll.filter((a) => {
    return ["nora"].indexOf(a.safeName.toLowerCase()) !== -1;
  });
  if (noraToys.length > 0) {
    commands.push(
      new SlashCommandBuilder()
        .setName("rotateleft")
        .setDescription("Rotate Left")
        .addStringOption((option) =>
          option
            .setName("toy")
            .setRequired(true)
            .setDescription("Pick a Toy")
            .setChoices(fixObject(noraToys))
        ),

      new SlashCommandBuilder()
        .setName("rotateright")
        .setDescription("Rotate Right")
        .addStringOption((option) =>
          option
            .setName("toy")
            .setRequired(true)
            .setDescription("Pick a Toy")
            .setChoices(fixObject(noraToys))
        ),

      new SlashCommandBuilder()
        .setName("stoprotate")
        .setDescription("Stop Rotate")
        .addStringOption((option) =>
          option
            .setName("toy")
            .setRequired(true)
            .setDescription("Pick a Toy")
            .setChoices(fixObject(noraToys))
        )
    );
  }

  // To do, Add Edge & Max Commands :)
  // Don't really understand it as a re-work.

  commands.map((command) => command.toJSON());

  const rest = new REST({ version: "9" }).setToken(token);

  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log("Successfully registered slash commands."))
    .catch(
      console.error
      // add suggestion link for users to have right perms: https://discord.com/oauth2/authorize?client_id=416550368236011520&permissions=8&scope=bot%20applications.commands
    );
}

// new SlashCommandBuilder().setName('lushhigh')	.setDescription('Play with the LUSH on HIGH.'),
// new SlashCommandBuilder().setName('lushmed')	.setDescription('Play with the LUSH on MEDIUM.'),
// new SlashCommandBuilder().setName('lushlow')	.setDescription('Play with the LUSH on LOW.'),
// new SlashCommandBuilder().setName('lushpulse')	.setDescription('Play with the LUSH on PULSE.'),
// new SlashCommandBuilder().setName('lushcircle')	.setDescription('Play with the LUSH on CIRCLE.'),
// new SlashCommandBuilder().setName('lushgrind')	.setDescription('Play with the LUSH on GRIND.'),
// new SlashCommandBuilder().setName('lushstop')	.setDescription('Stop the LUSH.'),
// new SlashCommandBuilder().setName('hushhigh')	.setDescription('Play with the HUSH on HIGH.'),
// new SlashCommandBuilder().setName('hushmed')	.setDescription('Play with the HUSH on MEDIUM.'),
// new SlashCommandBuilder().setName('hushlow')	.setDescription('Play with the HUSH on LOW.'),
// new SlashCommandBuilder().setName('hushpulse')	.setDescription('Play with the HUSH on PULSE.'),
// new SlashCommandBuilder().setName('hushcircle')	.setDescription('Play with the HUSH on CIRCLE.'),
// new SlashCommandBuilder().setName('hushgrind')	.setDescription('Play with the HUSH on GRIND.'),
// new SlashCommandBuilder().setName('hushstop')	.setDescription('Stop the HUSH.'),
// new SlashCommandBuilder().setName('domihigh')	.setDescription('Play with the DOMI on HIGH.'),
// new SlashCommandBuilder().setName('domimed')	.setDescription('Play with the DOMI on MEDIUM.'),
// new SlashCommandBuilder().setName('domilow')	.setDescription('Play with the DOMI on LOW.'),
// new SlashCommandBuilder().setName('domipulse')	.setDescription('Play with the DOMI on PULSE.'),
// new SlashCommandBuilder().setName('domicircle')	.setDescription('Play with the DOMI on CIRCLE.'),
// new SlashCommandBuilder().setName('domigrind')	.setDescription('Play with the DOMI on GRIND.'),
// new SlashCommandBuilder().setName('domistop')	.setDescription('Stop the DOMI.'),
// new SlashCommandBuilder().setName('norahigh')	.setDescription('Play with the NORA on HIGH.'),
// new SlashCommandBuilder().setName('noramed')	.setDescription('Play with the NORA on MEDIUM.'),
// new SlashCommandBuilder().setName('noralow')	.setDescription('Play with the NORA on LOW.'),
// new SlashCommandBuilder().setName('noraleft')	.setDescription('Play with the NORA on LEFT.'),
// new SlashCommandBuilder().setName('noraright')	.setDescription('Play with the NORA on RIGHT.'),
// new SlashCommandBuilder().setName('norastopturn').setDescription('Stop the NORA from TURNING.'),
// new SlashCommandBuilder().setName('norapulse')	.setDescription('Play with the NORA on PULSE.'),
// new SlashCommandBuilder().setName('noracircle')	.setDescription('Play with the NORA on CIRCLE.'),
// new SlashCommandBuilder().setName('noragrind')	.setDescription('Play with the NORA on GRIND.'),
// new SlashCommandBuilder().setName('norastop')	.setDescription('Stop the NORA from VIBRATING.'),
