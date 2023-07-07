const Discord = require('discord.js');


module.exports = {

    name: "warn",
    description: "warn une personne",
    utilisation: "/warn",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "moderations",
    options: [
        {
            type: `user`,
            name: `membre`,
            description: `l'utilisateur warn`,
            required: true,
            autocomplete: false,
        }, {
            type: `string`,
            name: `raison`,
            description: `raison du warn`,
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args, db) {

        const member = args.getMember("membre");
        const reason = args.getString("raison") ?? "Aucune raison fournie";

        if (message.user.id === member.id) return message.reply("tu ne peut pas te warn");
        if ((await message.guild.fetchOwner()).id === member.id) return message.reply("tu ne peut pas warn le proprietaire");
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("tu ne pas warn ");
        if ((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("tu ne peut pas warn ");

        try { await member.send(`${message.user.tag} vous a warn sur le serveur ${message.guild.name} pour la raison: \`${reason}\` ! `) } catch (err) { }

        await message.reply(`le warn a été envoyé à ${member.user.tag} pour la raison: \`${reason}\` avec succes !`);

        const ID = await bot.function.createId("WARN")

        db.query(`INSERT INTO warns (guild, user, author, warn, reason, date) VALUES ('${message.guild.id}', '${member.id}', '${message.user.id}', '${ID}', '${reason}', '${Date.now()}')`)
    }
} 