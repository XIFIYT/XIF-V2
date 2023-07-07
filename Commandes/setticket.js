const Discord = require('discord.js')

module.exports = {

    name: "setticket",
    description: "definir la categori pour les tickets",
    utilisation: "/setticket",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "moderations",
    options: [
        {
            type: "channel",
            name: "id",
            description: "id de la category ",
            required: true,
            autocomplete: false,
        },
    ],
    async run(bot, interaction) {

        const db = bot.db;
        const ID = interaction.options.getChannel("id")
        if (ID.type !== 4) await interaction.reply({ content: `Merci de mettre une categorie !`, ephemeral: true });
        db.query(`SELECT * FROM serveur WHERE guild = '${interaction.guild.id}' AND ticketCategory = '${ID.id}'`, async (err, req) => {
            if (req.length < 1) {
                db.query(`UPDATE serveur SET ticketCategory = '${ID.id}'`)
                await interaction.reply({ content: "Vous avez bien mis les tickets !", ephemeral: true });
            } else {
                await interaction.reply({ content: "Vous avez déjà des tickets !", ephemeral: true })
            }
        })
    }
}  
