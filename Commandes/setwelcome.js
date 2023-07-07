const Discord = require("discord.js");
const { EmbedBuilder, TextInputStyle } = require("discord.js");

module.exports = {
  name: 'setwelcome',
  description: "Vous permez d'envoyer un message privé.",
  utilisation: "/setwelcome",
  permission: Discord.PermissionFlagsBits.ManageGuild,
  dm: false,
  category: "administration",

  async run(bot, message) {
    const db = bot.db;

    db.query(`SELECT * FROM server WHERE guildID = '${message.guild.id}'`, async (err, req) => {
      if (req.length < 1) {
        message.reply({ content: "Navré mais vous n'avez pas de base de donnée", ephemeral: true });
      } else {
        let Modal = new Discord.ModalBuilder()
          .setCustomId('report')
          .setTitle('Créé ton embed');

        let question1 = new Discord.TextInputBuilder()
          .setCustomId('titre')
          .setLabel('Quel titre voulez-vous mettre ?')
          .setRequired(false)
          .setPlaceholder('Ecrit ici... (facultatif)')
          .setStyle(TextInputStyle.Short);

        let question2 = new Discord.TextInputBuilder()
          .setCustomId('description')
          .setLabel("Quelle description voulez-vous mettre ?")
          .setRequired(true)
          .setPlaceholder('Ecrit ici...')
          .setStyle(TextInputStyle.Paragraph);


        let question3 = new Discord.TextInputBuilder()
          .setCustomId('footer')
          .setLabel('Quelle footer voulez-vous mettre ?')
          .setRequired(false)
          .setPlaceholder('Ecrit ici... (facultatif)')
          .setStyle(TextInputStyle.Short);

        let question4 = new Discord.TextInputBuilder()
          .setCustomId('timestamp')
          .setLabel('Voulez-vous mettre le timestamp ?')
          .setRequired(false)
          .setPlaceholder('oui/non (facultatif)')
          .setStyle(TextInputStyle.Short);

        let question5 = new Discord.TextInputBuilder()
          .setCustomId('image')
          .setLabel('Voulez-vous mettre une image ?')
          .setRequired(false)
          .setPlaceholder('sous forme de lien')
          .setStyle(TextInputStyle.Paragraph);

        let ActionRow1 = new Discord.ActionRowBuilder().addComponents(question1);
        let ActionRow2 = new Discord.ActionRowBuilder().addComponents(question2);
        let ActionRow3 = new Discord.ActionRowBuilder().addComponents(question3);
        let ActionRow4 = new Discord.ActionRowBuilder().addComponents(question4);
        let ActionRow5 = new Discord.ActionRowBuilder().addComponents(question5);

        Modal.addComponents(ActionRow1, ActionRow2, ActionRow3, ActionRow4, ActionRow5);

        await message.showModal(Modal);

        try {

          let reponse = await message.awaitModalSubmit({ time: 300000 });

          const titre = reponse.fields.getTextInputValue('titre');
          const description = reponse.fields.getTextInputValue('description');
          const footer = reponse.fields.getTextInputValue('footer');
          const timestamp = reponse.fields.getTextInputValue('timestamp');
          const image = reponse.fields.getTextInputValue('image');

          const embed = new EmbedBuilder()
            .setColor('#9d39df')
            .setDescription(`✅ Votre embed à été enregistré avec succès !`);

          if (!footer) footer = ' ';
          if (!titre) titre = ' ';
          if (!description) description = ' ';
          if (!image) image = 'https://blog.pandacraft.com/wp-content/uploads/2021/02/airbus-min-300x154.png';

          let EmbedBuilder1 = new EmbedBuilder()
            .setTitle(`${titre}`)
            .setDescription(`${description}`)
            .setFooter({ text: `${footer}` })
            .setImage(`${image}`);


          if (reponse.fields.getTextInputValue('timestamp') === 'oui') EmbedBuilder1.setTimestamp();
          if (!reponse.fields.getTextInputValue('timestamp') === 'oui') return;

          db.query(`SELECT * FROM welcome WHERE guildID = '${message.guild.id}'`, async (err, req) => {
            db.query(`UPDATE welcome SET titre = '${titre}' WHERE guildID = '${message.guild.id}'`);
            db.query(`UPDATE welcome SET description = '${description}' WHERE guildID = '${message.guild.id}'`);
            db.query(`UPDATE welcome SET footer = '${footer}' WHERE guildID = '${message.guild.id}'`);
            db.query(`UPDATE welcome SET timestamp = '${timestamp}' WHERE guildID = '${message.guild.id}'`);
            db.query(`UPDATE welcome SET image = '${image}' WHERE guildID = '${message.guild.id}'`);
          });

          await reponse.reply({ embeds: [embed], ephemeral: true });
        } catch (err) {
          console.log(err);
        }
      }
    })
  }
}