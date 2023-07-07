const Discord = require(`discord.js`)
const {EmbedBuilder} = require('discord.js')

module.exports = {
    name: 'setlogs',
    description: "Vous permez de mettre en place les logs du serveur.",
    utilisation: "/setlogs [add/remove]",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    dm: false,
    category: "moderations",
    options: [
        {
            type: "string",
            name: "état",
            description: "État des Logs Add/Remove",
            required: true,
            autocomplete: false,
        }
    ],

    async run(bot, message, args){

        const db = bot.db;

        const embedlogsadd = new EmbedBuilder()
        .setDescription(`VOUS AVEZ BIEN ACTIVÉ LES LOGS POUR LE SERVEUR `)

    const embedlogsremove = new EmbedBuilder()
        .setDescription(`VOUS AVEZ BIEN RETIRÉ LES LOGS POUR LE SERVEUR`)

    const embedsMessages = new EmbedBuilder()
        .setDescription(`ICI IL Y AURAS LES LOGS DES MESSAGES ⬇️`)

    const embedsChannels = new EmbedBuilder()
        .setDescription(`ICI IL Y AURAS LES LOGS DES CHANNELS ⬇️`)

    const embedsRoles = new EmbedBuilder()
        .setDescription(`ICI IL Y AURAS LES LOGS DES ROLES ⬇️`)

        db.query(`SELECT * FROM server WHERE guildID = '${message.guild.id}'`, async (err, req) => {

            let etat = args.getString("état")
            if(etat !== "add" && etat !== "remove") return message.reply("Merci d'indiquer si vous souhaiter Add ou alors Remove")

            if(etat === "remove") {
                db.query(`SELECT * FROM logs WHERE guildID = '${message.guild.id}'`, async (err, req) => {
                    let messageID = req[0].messageID
                    let roleID = req[0].roleID
                    let categoryID = req[0].categoryID
    
                    const messagedelete = message.guild.channels.cache.get(messageID);
                    const roledelete = message.guild.channels.cache.get(roleID);
                    const category = message.guild.channels.cache.get(categoryID);
    
                    messagedelete.delete()
                    roledelete.delete()
                    category.delete()
    
    
                    message.reply({ embeds: [embedlogsremove], ephemeral: true })
    
                    db.query(`DELETE FROM logs WHERE guildID =  '${message.guild.id}'`)
                })

            } else {
    
                db.query(`SELECT * FROM server WHERE guildID = '${message.guild.id}'`, async (err, req) => {

                    if (req.length < 1) {
                        message.reply({ content: "Je suis navré, il n'y a pas de base de données", ephemeral: true })
                    } else {
                        const guild = message.guild;
    
                        await guild.channels.create({
                            type: 4,
                            name: `🔰・LOGS`,
                            permissionOverwrites: [
                                {
                                    id: guild.roles.everyone,
                                    deny: [Discord.PermissionFlagsBits.Connect,
                                    Discord.PermissionFlagsBits.ViewChannel]
                                },
                            ],
                        }).then(NewCategory => {
                            db.query(`SELECT * FROM logs WHERE guildID = '${message.guild.id}'`, async (err, req) => {
                                db.query(`INSERT INTO logs (guildID, categoryID, messageID, roleID) VALUES (${message.guild.id}, "${NewCategory.id}", "aucun", "aucun")`)
                                message.reply({ embeds: [embedlogsadd], ephemeral: true })
                            })
    
                            guild.channels.create({
                                type: 0,
                                name: `MESSAGES`,
                                parent: NewCategory
                            }).then(channel => {
                                db.query(`SELECT * FROM logs WHERE guildID = '${message.guild.id}'`, async (err, req) => {
                                    db.query(`UPDATE logs SET messageID = '${channel.id}' WHERE guildID = '${message.guild.id}'`)
                                    channel.send({ embeds: [embedsMessages] })
                                })
                            })
    
                            guild.channels.create({
                                type: 0,
                                name: `ROLES`,
                                parent: NewCategory
                            }).then(channel => {
                                db.query(`SELECT * FROM logs WHERE guildID = '${message.guild.id}'`, async (err, req) => {
                                    db.query(`UPDATE logs SET roleID = '${channel.id}' WHERE guildID = '${message.guild.id}'`)
                                    channel.send({ embeds: [embedsRoles] })
                                })
                            })
                        })
                    }
                })
            }
        })
    }
}