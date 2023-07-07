const Discord = require("discord.js")

const intents = new Discord.IntentsBitField(3243773)
const bot = new Discord.Client({ intents })
const config = require("./config")
const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
const loadSlashcommands = require("./Loaders/loadSlashcommands")
const loadDatabase = require("./Loaders/loadDatabase")

const colors = require("colors")
console.log(colors.cyan(`

██╗  ██╗██╗███████╗    ██╗   ██╗██████╗ 
╚██╗██╔╝██║██╔════╝    ██║   ██║╚════██╗
 ╚███╔╝ ██║█████╗      ██║   ██║ █████╔╝
 ██╔██╗ ██║██╔══╝      ╚██╗ ██╔╝██╔═══╝ 
██╔╝ ██╗██║██║          ╚████╔╝ ███████╗
╚═╝  ╚═╝╚═╝╚═╝           ╚═══╝  ╚══════╝`)) 
bot.commands = new Discord.Collection()
bot.function = {
    createId: require("./Fonctions/createId"),
    searchSpam: require("./Fonctions/searchSpam")
}



bot.gptChannels = [];
bot.login(config.token)
loadCommands(bot)
loadEvents(bot)
loadSlashcommands(bot)
loadDatabase(bot)

