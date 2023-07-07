const Discord = require("discord.js")
const { REST } = require("discord.js")
const { Routes } = require("discord.js")
module.exports = async bot => {

    let commands = [];

    bot.commands.forEach(async command => {

        let slashCommand = new Discord.SlashCommandBuilder()
            .setName(command.name)
            .setDescription(command.description)
            .setDMPermission(command.dm)
            .setDefaultMemberPermissions(command.permission === "Aucune" ? null : command.permission)

        if (command.options?.length >= 1) {

            for (let i = 0; i < command.options.length; i++) {
                if (command.options[i].type === "string") slashCommand[`add${command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`](options => options.setName(command.options[i].name).setDescription(command.options[i].description).setAutocomplete(Boolean(command.options[i].autocomplete)).setRequired(command.options[i].required))
                else slashCommand[`add${command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`](options => options.setName(command.options[i].name).setDescription(command.options[i].description).setRequired(command.options[i].required))
            }
        }
         
        commands.push(slashCommand)
    })

    const rest = new REST({ version: "10" }).setToken(bot.token)

    await rest.put(Routes.applicationCommands("1107672220983111690"), { body: commands })
    console.log(`| slash commands| Les slash commandes sont bien charge`)
}   
