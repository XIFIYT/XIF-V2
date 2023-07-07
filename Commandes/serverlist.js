const Discord = require("discord.js");
const { numStr } = require('../Fonctions/numStr')

module.exports = {
  name: "serverlist",
  description: "donne la liste des servers",
  utilisation: "/serveurlist",
  permission: "Aucune",
  dm: false,
  category: "informations",

  async run(bot, message, args) {
    let n = 0;
    const guilds = message.client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(10);

    const guildInfo = await Promise.all(guilds.map(async (guild, index) => {
      const owner = await message.client.users.fetch(guild.ownerId); // Récupère le membre propriétaire à partir de son ID
      return `**${index + 1}) __${guild.name}__ :**
Owner : ${owner.username}
\`\`\`${numStr(guild.memberCount)} Membres
ID: ${guild.id}\`\`\``;
    }));

    const embed = new Discord.EmbedBuilder()
      .setDescription(`${guildInfo}`)
      .setFooter({text: `${message.client.user.username}`, iconURL: message.client.user.displayAvatarURL()});

    await message.reply({ embeds: [embed], ephemeral: true });
  }
}
