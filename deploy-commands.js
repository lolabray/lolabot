const {
  SlashCommandBuilder,
  SlashCommandStringOption,
} = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token, config_domain, config_port, toy_power } = require("./config.json");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));


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
          `[Version: ${toyDetails.version}] `+
          `[Battery: ${toyDetails.battery.toString().padStart(3, " ")}] - ` +
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
              `[Version: ${toyDetails.version}] `+
              `[Battery: ${toyDetails.battery.toString().padStart(3, " ")}] - ` +
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
          .setRequired(false)
          .setDescription("Pick a Toy")
          .setChoices(fixObject(toyValues))
      ),

    new SlashCommandBuilder()
      .setName("vibrate")
      .setDescription("Vibrate a Toy with a power")
      .addStringOption((option) =>
        option
          .setName("toy")
          .setRequired(true)
          .setDescription("Pick a Toy")
          .setChoices(fixObject(toyValuesPlusAll))
      )
      .addIntegerOption((option) =>
        option
          .setName("power")
          .setRequired(false)
          .setDescription("Select the power of the Toy")
          .setChoices(fixObject(toy_power))
      ),

    new SlashCommandBuilder()
      .setName("stopvibrate")
      .setDescription("Stop a toy Vibrating. ;-;")
      .addStringOption((option) =>
        option
          .setName("toy")
          .setRequired(true)
          .setDescription("Pick a Toy")
          .setChoices(fixObject(toyValuesPlusAll))
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
  // Presets, Only available on specific toys.

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

  // =====================================================
  // Vibrate specific location, Edge specific

  var edgeToys = toyValuesPlusAll.filter((a) => {
    return ["edge"].indexOf(a.safeName.toLowerCase()) !== -1;
  });
  if (edgeToys.length > 0) {
    commands.push(
      new SlashCommandBuilder()
        .setName("vibrateedge")
        .setDescription("Vibrate the Edge Toy (Top/Bottom)")
        .addStringOption((option) =>
          option
            .setName("toy")
            .setRequired(true)
            .setDescription("Pick a Toy")
            .setChoices(fixObject(edgeToys))
        )
        .addStringOption((option) =>
          option
            .setName("location")
            .setRequired(true)
            .setDescription("Top or Bottom [Use Vibrate for Both]")
            .setChoices([
              ["Top",     "top"],
              ["Bottom",  "bottom"]
            ])
        )
        .addIntegerOption((option) =>
          option
            .setName("power")
            .setRequired(false)
            .setDescription("Select the power of the Toy")
            .setChoices(fixObject(toy_power))
        ),

    );
  }

  // =====================================================
  // Rotate, Nora Specific

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
        )
        .addIntegerOption((option) =>
          option
            .setName("power")
            .setRequired(false)
            .setDescription("Select the power of the Toy")
            .setChoices(fixObject(toy_power))
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
        )
        .addIntegerOption((option) =>
          option
            .setName("power")
            .setRequired(false)
            .setDescription("Select the power of the Toy")
            .setChoices(fixObject(toy_power))
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

  // To do, Add Max Commands :) [It's a bit messy]

  commands.map((command) => command.toJSON());

  const rest = new REST({ version: "9" }).setToken(token);

  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log("Successfully registered slash commands."))
    .catch((e) => {
      console.error(e);
      console.log("Hey, the problem you maybe having here is to do with the Bot you have added not having the correct permissions to use Slash commands. You can fix this by using the following OAuth2 URL:");
      console.log("https://discord.com/oauth2/authorize?client_id="+ clientId +"&permissions=8&scope=bot%20applications.commands");
    });

  // rest
  //   .put(Routes.applicationCommands(clientId, { body: commands }))
  //   .then(() => console.log("Successfully registered GLOBAL slash commands."))
  //   .catch((e) => {
  //     console.log("One or more servers may have failed to correctly setup permissions for the bot.");
  //     console.log("https://discord.com/oauth2/authorize?client_id="+ clientId +"&permissions=8&scope=bot%20applications.commands");
  //   });
}