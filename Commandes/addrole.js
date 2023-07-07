const Discord = require("discord.js")

module.exports = {

    name: "addrole",
    description: "ajouter un rôle à un utilisateur",
    utilisation: "/addrole",
    permission: Discord.PermissionFlagsBits.ManageRoles,
    dm: false,
    category: "moderations",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "information sur une personne",
            required: true,
            autocomplete: false
        },
        {
            type: "role",
            name: "role",
            description: "Role pour ajouter",
            required: true,
            autocomplete: false
        }
    ],

    async run(client, interaction) {
        const user = interaction.options.getMember('utilisateur') ?? interaction.user
        const role = interaction.options.getRole('role')

        if (user.roles.cache.has(role.id)) {
            return interaction.reply({ content: `Le membre ${user} a déjà le rôle "${role.name}".`, ephemeral: true });
        }

        user.roles.add(role)
        await interaction.reply({ content: `Vous venez d'ajouter ${role} à ${user}`, ephemeral: true })
    }
}