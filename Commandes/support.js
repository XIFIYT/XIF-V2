const Discord = require("discord.js")

module.exports = {

    
    
    name: "support",
    description: "en savoir plus sur le support de XIF V2 ",
    utilisation: "/support",
    permission: "Aucune",
    dm: true,
    category: "informations",
    ownerOnly: false,
    options: [],
    async run(bot, message) {


    let EmbedSp = new Discord.EmbedBuilder()
        .setTitle("Support du bot")
        .setDescription(`
      -> Information Support du bot
      > **Createur du bot**: <@1092138769139912796>
      > **Serveur Support**:  https://discord.gg/3BURHf4q
      > **Histoire du bot**: XIF V2 est le grand frere de xif son predecesseur xif v2 a ete creer dans le but de rendre la vue plus facille au utilisateur
      > XIF V2 sera Upadate tout le temp pour qu'il perdure dans le temp il est disponible pour tous le monde 
      > les updates seront visible que dans le serveur supoort si dessus
      > **Credit** : XF ENGINE | XFInc tous droit reserve
      `)
      .setColor("#00FFFF") 
      .setImage("https://cdn.discordapp.com/attachments/1092091901747929229/1119689291572986017/Copie_de_up_1.jpg") 
      .setFooter({ text: "By XIFI" })
      
  
      await message.reply({ embeds: [EmbedSp] })
      await message.user.send({ content : "Serveur Support : https://discord.gg/3BURHf4q"  })
    }

}