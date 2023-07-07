const Discord = require('discord.js');


module.exports = {

     name: 'ping',
     description: `affiche la latence `,
     utilisation: "/ping",
     permission: "Aucune",
     dm: true,
     category: "informations",
     autocomplete: false,

    
     async run(bot, message) {

      await message.reply(`Ping : \`${bot.ws.ping}\``)
     }
    

}