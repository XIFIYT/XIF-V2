const Discord = require("discord.js")

module.exports = {

    name: "key",
    description: "généré une clée",
    utilisation: "/key",
    permission: "Aucune",
    dm: false,
    category: "informations",
    ownerOnly: false,
    options: [
        {
            type: "string",
            name: 'key',
            description: `Rentrez la clé !`,
            required: true,
            autocomplete: false,
        }
    ],

    async run(bot, message, args, interaction) {
        const db = bot.db;
        const key = args.getString('key');
        
       
        db.query(`SELECT * FROM cle WHERE userID = '${message.user.id}'`, async (err, req) => {
            if (err) {
                console.log(err);
            }
            if (req.length < 1) {
                return message.reply({ content: "Vous n'avez aucune clé !", ephemeral: true })
            }

            if (req[0].cle !== `${key}`) {
                return message.reply({ content: "La clé que vous avez envoyer, n'est pas valide !", ephemeral: true })
            }
            if (req[0].utilise === 'oui') {
                await message.reply({ content: "Vous ne pouvez pas utilisé cette clé, elle a déjà été utilisé :", ephemeral: true })
            } else {
                const embed = new Discord.EmbedBuilder()
                    .setTitle('Votre clé à été utilisé !')
                    .setDescription(`
                > Clé utilisé : \`${key}\`
                > Rôle demander dans la clé : \`${req[0].role}\`
                `)
                    .setColor("#00FFFF")
                db.query(`UPDATE cle SET utilise = 'oui' WHERE userID = '${message.user.id}'`)
                const embedKey2 = new Discord.EmbedBuilder()
                    .setTitle("✅ Clé utilisé avec succes ✅ ")
                    .setDescription(`
                **Information**: cle active avec succes les details vous ont ete envoyer en message prive`)
                    .setColor("#00FFFF")
                    .setFooter({ text: "By XIFI" })
                await message.reply({ embeds: [embedKey2] })
                await message.user.send({ embeds: [embed] })

            }
        })
    }
}