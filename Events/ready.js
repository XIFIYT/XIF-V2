const Discord = require("discord.js")
const loadSlashcommands = require("../Loaders/loadSlashcommands")
const loadDatabase = require("../Loaders/loadDatabase")

module.exports = async bot => {

    await loadSlashcommands(bot)
    bot.db = await loadDatabase()

    bot.db.connect(function () {
        console.log("| Base de donne | Connected to database")
    })
    let allcommands = [];
    await bot.commands.forEach(command => allcommands.push({ commandName: command.name, commandUsage: command.utilisation, commandDescription: command.description }))

    console.log(`| BOT | ${bot.user.tag} is online !`)

}