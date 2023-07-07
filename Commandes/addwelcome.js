const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: 'addwelcome',
  description: "Vous permez d'envoyer un message privé.",
  utilisation: "/addwelcome",
  permission: Discord.PermissionFlagsBits.ManageGuild,
  dm: false,
  category: "administration",

  async run(bot, message) {
    const db = bot.db;
    const embedID = new EmbedBuilder()
    .setDescription(`MERCI D'ENVOYER L'ID DU SALON PAR MESSAGE CI DESSOUS ⬇️`)
    db.query(`SELECT * FROM serveur WHERE guild = '${message.guild.id}'`, async (err, req) => {
      if (req.length < 1) {
        message.reply({ content: "Je suis navré mais vous n'avez pas enregistré le serveur en bdd", ephemeral: true });
      } else {
        message.reply({ embeds: [embedID], ephemeral: true }).then(() => {
          const filter = m => m.author.id === message.user.id;
          const collector = message.channel.createMessageCollector({ filter, max: 1 });

          collector.on('collect', (m) => {

            let channel = m.content;
            setTimeout(() => {
              bot.channels.fetch(m.channelId).then(channel => {
                channel.messages.delete(m.id);
              });
            }, 2000);

            db.query(`SELECT * FROM server WHERE guild = '${message.guild.id}'`, async (err, req) => {

              db.query(`UPDATE server SET welcomeChannel = '${channel}' WHERE guildID = '${message.guild.id}'`);
            });

            db.query(`SELECT * FROM welcome WHERE guildID = '${message.guild.id}'`, async (err, req) => {

              db.query(`INSERT INTO welcome (guildID, titre, description, footer, timestamp, image) VALUES (${message.guild.id}, "aucun",  "aucun", "aucun", "aucun", "aucun")`)

              message.reply({
                content: "Vous avez bien activé les message de bienvenue !",
                ephemeral: true
              });
            });
          });
        });
      };
    });
  }
};