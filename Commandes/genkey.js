const Discord = require("discord.js")
const key = require('../Fonctions/genkey');

module.exports = {

    name: "genkey",
    description: "généré une clée",
    utilisation: "/genkey",
    permission: "Aucune",
    dm: false,
    category: "developper",
    ownerOnly: true,
    options: [
        {
            type: "role",
            name: 'role',
            description: `Rôle à choisir`,
            required: true,
            autocomplete: false,
        } 
    ],
     
    async run(bot, message, args) {
        const db = bot.db;
        const ID = await key("KEY");
        const role = args.getRole('role')
        db.query(`SELECT * FROM cle`, async (err, req) => {

            db.query(`INSERT INTO cle (userID, cle, utilise, role) VALUES ('${message.user.id}', '${ID}', 'non', '${role.id}')`)

            const keyInfo = `ID de la clé : ${ID}\nRole demandé : ${role.id}`;
            let EmbedKey = new Discord.EmbedBuilder()
                .setTitle("✅ Clé généré ✅")
                .setDescription(`\`\`\`${keyInfo}\`\`\``)
                .setColor('#00FFFF')
                .setFooter({ text: "By XIFI" })
            await message.reply({ embeds: [EmbedKey] })
        
        })
    }
}