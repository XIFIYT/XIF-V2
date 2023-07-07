const Discord = require("discord.js")

module.exports = {

    
    
    name: "xfengine",
    description: "en savoir plus sur XF ENGINE ",
    utilisation: "/xfengine",
    permission: "Aucune",
    dm: true,
    category: "informations",
    ownerOnly: false,
    options: [],
    async run(bot, message) {


    let EmbedXF = new Discord.EmbedBuilder()
        .setTitle("XF ENGINE")
        .setDescription(`
      -> Information sur XF ENGINE
      > **Createur de XF ENGINE**: <@1092138769139912796>
      > **Serveur Support**:  regarde tes mp
      > **Le but de XF ENGINE**: \`\`\`XF ENGINE est une organisation de developer qui a pour but de developer les meilleur bot de discord (oui on en ai encore loin je sais)\`\`\`
      > **Bot deja creer** : \`\`\`XIF V2, XIF, XF GEN, XF IA, XIFI MUSIC\`\`\`
      > **Bot support** : \`\`\`les bot support sont au prix de 3 a 5 euro sinon les bot support existant il y a XIFI CM SUPPORT, GR4 SUPPORT, SOCIETYBOT\`\`\`
      > **Hebergeur utiliser par XF ENGINE**: \`CloudHive\`
      > **Credit** : XF ENGINE | XFInc tous droit reserve
      `)
      .setColor("#00FFFF") 
      .setImage("https://cdn.discordapp.com/attachments/1092091901747929229/1119689291572986017/Copie_de_up_1.jpg") 
      .setFooter({ text: "By XIFI" })
      
  
      await message.reply({ embeds: [EmbedXF] })
      await message.user.send({ content : "Serveur XF ENGINE : https://discord.gg/3BURHf4q"  })
    }

}