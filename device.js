module.exports = class device
{
  constructor(fetch,obj,commands,defaultDuration)
  {
    this.fetch = fetch;
    this.deviceName = obj.deviceName.toLowerCase();
    this.toyid = obj.toyid;
    this.deviceurl = obj.url;
    this.httpPort = obj.httpPort;
    this.defaultDuration = defaultDuration;
    this.serverCommands = commands;
    this.allowedCommands = (obj.commands||"").trim().split(",");
    this.isPublic = true;
    this.authorizedUsers = [];
  }
  async fireCommand(message,commands)
  {
    var results = {notStop: true,error: false, foundCommand: false,message: ""};
    if(!this.isPublic)
    {
      var owner = message.channel.guild.ownerID;
      if(message.author.id !== owner && this.authorizedUsers.indexOf(message.author.id) < 0)
      {
        results.error = true;
        results.message = "User not authorized to use device!";
        return results;
      }
    }

    var runCMD = false, notStop = true;
    var url = this.deviceurl + ":" + this.httpPort +"/";
    var command = "",duration = this.defaultDuration;
    if(commands.length > 0)
    {
      command = commands[0].toLowerCase();
      if(command === "stop")
      {
        results.notStop = false;
      }
      if(!this.allowedCommands.includes(command))
      {
        results.foundCommand = false;
        return results;
      }
      if(commands.length > 1)
      {
         duration = commands[1];
      }
      for(var i = 0; i < this.serverCommands.length; i++)
      {
        if(this.serverCommands[i].commandName === command)
        {
          results.foundCommand = true;
          url = url + this.serverCommands[i].commandurl.replace("{duration}",duration).replace("{toyid}",this.toyid);
          runCMD = true;
          break;
        }
      }
    }


    if(runCMD)
    {
      console.log(url);
      const { file } = await this.fetch(url).then(response => response.json());

    }
    return results;
  }
}
