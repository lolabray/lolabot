module.exports = class {
  constructor()
  {
    this.previousCommands =  {};
  }
  registerNewCommand(commandName,func,options)
  {
    var results = {isRegistered: false, reason: ""};
    options = options || {};
    commandName = commandName.toLowerCase();
    if(this.previousCommands[commandName])
    {

      results.reason = "Command name already taken" + commandName;
      console.log(results.reason);
      return results;
    }
    if(typeof(func) !== "function")
    {
      results.reason = "function not a function";
      console.log(results.reason);
      return results;
    }

    this.previousCommands[commandName] = {
      commandName: commandName,
      commandFunc: func,
      additionalParams: options.params,
      thisObj: options.thisObj,
      helptext: options.helptext
    };

  }
  fireCommand(commandName,message,args)
  {
    if(!this.previousCommands[commandName])
    {
      return false;
    }
    else
    {
      var cmdToRun = this.previousCommands[commandName];
      var newArgs = [];
      newArgs.push(message);
      newArgs = newArgs.concat(cmdToRun.additionalParams,args);
      cmdToRun.commandFunc.apply(cmdToRun.thisObj,newArgs);
    }
  }
};
