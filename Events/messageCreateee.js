const Discord = require("discord.js")

module.exports = async (bot, message) => {

  let prefix = "+"

  let messageArray = message.content.split(" ")

  let commandeName = messageArray[0].slice(prefix.length)

  let args = messageArray.slice(1)

  if (!message.content.startsWith(prefix)) return;



  let command = require(`../Commandes/${commandeName}`)

  if (!command) return message.channel.send(`Commande inconnue`)

  command.run(bot, message, args)

}