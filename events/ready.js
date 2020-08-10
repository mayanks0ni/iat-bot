module.exports = async(bot, ready) => {
    console.log(`${bot.user.tag} Is Ready UwU!`)
    bot.user.setActivity(`${bot.commandPrefix}help`, { type: "LISTENING" });
};