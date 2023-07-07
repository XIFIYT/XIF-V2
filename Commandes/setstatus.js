const Discord = require('discord.js');


module.exports = {

    name: "setstatus",
    description: "definir le status du bot",
    utilisation: "/status",
    permission: Discord.PermissionFlagsBits.Administrator,
    dm: false,
    category: "developper",
    ownerOnly: true,
    options: [
        {
            type: "string",
            name: "activite",
            description: "Activite du bot",
            required: true,
            autocomplete: true,
        }, {
            type: "string",
            name: "status",
            description: "status du bot",
            required: true,
            autocomplete: false,
        }, {
           
                type: "string",
                name: "lien",
                description: "URL du stream",
                required: false,
                autocomplete: false,
          
        }
    ],

    async run(bot, message, args) {
     
       let activity = args.getString("activite")
       if(activity !== "listening" && activity !== "playing" && activity !== "competing" && activity !== "watching") return message.reply("Veuillez spécifier une activité valide")

       let status = args.getString("status")

       if(status === "Streaming" && !args.getString("lien") && args.getString("lien")) return message.reply("Veuillez spécifier une lien valide")

       await bot.user.setActivity(status, {type: Discord.ActivityType[activity.slice(0,1).toUpperCase() + activity.slice(1, activity.length)]})

       await message.reply("status changer avec succes")
    }
} 