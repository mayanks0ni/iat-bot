const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class HelpCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'help',
            aliases: ['h'],
            group: 'info',
            memberName: 'help',
            description: 'A Command To View The Help Message!',
            examples: [`help`, "help [command]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        if (args[0]) {
            let cmd = this.client.registry.findCommands(args[0])
            let a;
            let n;
            let o;
            if (cmd.length === 1) {
                if (cmd[0].aliases.length < 1) {
                    a = "None"
                } else {
                    a = cmd[0].aliases;
                }
                if (cmd[0].nsfw) {
                    n = "Yes"
                } else {
                    n = "No"
                }
                if (cmd[0].ownerOnly) {
                    o = "Yes"
                } else {
                    o = "No"
                }
                var cmdhelpembed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`📃 Help Commands 📃`, this.client.user.displayAvatarURL())
                    .addField("**• Command**", `**${cmd[0].name}**`)
                    .addField("**• Description**", `**${cmd[0].description}**`)
                    .addField("**• Permissions Needed**", `**${cmd[0].userPermissions || "None"}**`)
                    .addField("**• Example**", `**${cmd[0].examples || "None"}**`)
                    .addField("**• Aliases**", `**${a || "None"}**`)
                    .addField("**• Group**", `**${cmd[0].groupID}:${cmd[0].memberName}**`)
                    .addField("**• Owner Only**", `**${o}**`)
                    .addField("**• NSFW**", `**${n}**`)
                    .setThumbnail(this.client.user.displayAvatarURL())
                    .setFooter(message.guild.me.displayName)
                    .setTimestamp()
                message.embed(cmdhelpembed);
            } else {
                return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**No Such Command Found!**").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
            }
        } else {
            const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setTitle(`📃 Help Command`)
                .addField("**💰 Economy Commands**", "**Help And Description About Economy Commands!**")
                .addField("**🎮 Gambling Commands**", "**Help And Description About Gambling Commands!**")
                .addField("**🧰 Fun Commands**", "**Help And Description About Fun Commands!**")
                .addField('**🛠️ Moderation Commands**', '**Help And Description About Moderation Commands!**')
                .addField('**👑 Owner Only Commands**', '**Help And Description About Owner-Only Commands!**')
                .addField('**🔎 Information Commands**', '**Help And Description About Information Commands!**')
                .addField("**⚙ Utility Commands**", "**Help And Description About Utility Commands!**")
                .addField('**🎵 Music Commands**', '**Help And Description About Music Commands!**')
                .addField('**🔞 NSFW Commands**', '**Help And Description About NSFW Commands!**')
                .setThumbnail(this.client.user.displayAvatarURL())
                .setColor(message.guild.me.displayHexColor)
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
                .setThumbnail(this.client.user.displayAvatarURL())

            const moderation = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setTitle("🛠️ Moderation Commands 🛠️")
                .addField("**addemoji**", "**A Command To Create a New Emoji!**")
                .addField("**announce**", "**A Commamd To Make Announcements in a Particular Channel or In Which The Command Is Used!!**")
                .addField("**ban**", "**A Command To Ban The Mentioned User!**")
                .addField("**clear**", "**A Command To Purge The Specified Amount Of Messages!**")
                .addField("**dm**", "**A Command To DM The Mentioned User Through The Bot!**")
                .addField("**kick**", "**A Command To Kick The Mentioned User!**")
                .addField("**mentionrole**", "**A Command To Mention The Role Through The Bot!**")
                .addField("**mute**", "**A Command To Mute The Mentioned User!**")
                .addField("**pin**", "**A Command To Pin A Message By Specifying Its ID!**")
                .addField("**role**", "**A Command To Take/Give a Role!**")
                .addField("**rolecolor**", "**A Command To Change The Color Of The Specified Role!**")
                .addField("**unmute**", "**A Command To Unmute The Mentioned User!**")
                .addField("**warn**", "**A Command To Warn The Mentioned User!**")
                .addField("**warnclear**", "**A Command To Clear The Warnings Of The Mentioned User!**")
                .addField("**warnlog**", "**A Command To View The Warnlog The Mentioned User!**")
                .setColor(message.guild.me.displayHexColor)
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
                .setThumbnail(this.client.user.displayAvatarURL())

            const info = new Discord.MessageEmbed()
                .setTitle("🔎 Information Commands 🔎")
                .addField("**alarm**", "**A Command To Set An Alarm!**")
                .addField("**avatar**", "**A Command To View The Avatar Of Yourself Or The Mentioned User!**")
                .addField("**botinfo**", "**A Command To View The Information About The Bot!**")
                .addField("**covid**", "**A Command To View Worldwide COVID-19 Status!**")
                .addField("**help**", "**A Command Which Shows This Message!**")
                .addField('**invite**', '**A Command To Get The Invite Link To Invite The Bot To Your Server!**')
                .addField("**ping**", "**A Command To View The Latency Of The Bot!**")
                .addField('**serverinfo**', '**A Command To View The Server\'s Info!**')
                .addField("**suggest**", "**A Command To Make Suggestions Which Are Posted In A Specific Channel!**")
                .addField("**translate**", "**A Command To Translate The Provided Text Into Desired Language!**")
                .addField('**uptime**', '**Command To View the Uptime Of The Bot!**')
                .addField('**urban**', '**A Command To Get The Definition Of Word From Urban Dictionary!**')
                .addField('**userinfo**', '**A Command To View Info Of Yourself Or The Mentioned User!**')
                .addField("**xp**", "**A Command To View Your Or Others XP And Level!**")
                .addField("**xpleaderboard**", "**A Command To View The XP Leaderboard!**")
                .setColor(message.guild.me.displayHexColor)
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
                .setThumbnail(this.client.user.displayAvatarURL())

            let economy = new Discord.MessageEmbed()
                .setTitle('**💰 Economy Commands 💰**')
                .addField('**bal**', '**A Command To View Your Balance!**')
                .addField('**bank**', '**A Command To View Your Bank Balance!**')
                .addField('**buy**', '**A Command To Buy An Item from The Shop!**')
                .addField("**changeprofile**", "**A Command To Change Your Profile!**")
                .addField('**daily**', '**A Command To Claim Your Daily Reward!**')
                .addField('**deposit**', '**A Command To Deposit An Amount In Your Bank!**')
                .addField('**give**', '**A Command To Give An Amount To Someone!**')
                .addField("**leaderboard**", "**A Command To View The Economy Leaderboard!**")
                .addField("**previewprofile**", "**A Command To View Preview The Specified Profile!**")
                .addField("**profile**", "**A Command To View Your Profile!**")
                .addField('**shop**', '**A Command To View The Shop!**')
                .addField("**showprofile**", "**A Command To View Your Owned Profile Cards!**")
                .addField('**transactions**', '**A Command To View Your Transactions!**')
                .addField('**withdraw**', '**A Command To Withdraw An Amount From Your Bank!**')
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor)
                .setThumbnail(this.client.user.displayAvatarURL())

            let gamble = new Discord.MessageEmbed()
                .setTitle("**🎮 Gambling Commands 🎮**")
                .addField("**coinflip**", "**A Command To Gamble Money By Flipping Coins!**")
                .addField("**rolldice**", "**A Command To Gamble Money By Rolling Dice!**")
                .addField("**rps**", "**A Command To Gamble Money By playing Rock, Paper & Scissor!**")
                .addField("**slot**", "**A Command To Gamble Money By Playing Slots!**")
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor)
                .setThumbnail(this.client.user.displayAvatarURL())


            let fun = new Discord.MessageEmbed()
                .setTitle("🧰 Fun Commands 🧰")
                .addField('**captcha**', '**A Command To Get A Captcha Image Of Yourself With The Desired Text!**')
                .addField('**cmm**', '**A Command To Get A Change My Mind Image For The Provided Text!**')
                .addField('**fact**', '**A Command To View A Random Fact!**')
                .addField('**hug**', '**Hugs The Mentioned User!**')
                .addField('**kiss**', '**Kisses The Mentioned User!**')
                .addField('**pat**', '**Pats The Mentioned User!**')
                .addField('**rip**', '**A Command To Get The Rip Image Of The Mentioned User!**')
                .addField('**ship**', '**A Command To Get A Ship Image Of The Two Mentioned Users!**')
                .addField('**trash**', '**A Command To Get A Trash Waifu Image Of Yourself Or The Mentioned User!**')
                .addField('**trumptweet**', '**A Command To Get A Trump Tweet Image For The Provided Text!**')
                .addField('**tweet**', '**A Command To Tweet Through The Provided Username!**')
                .addField("**wallpaper**", "**A Command To Get A Random Wallpaper!**")
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor)
                .setThumbnail(this.client.user.displayAvatarURL())

            const utility = new Discord.MessageEmbed()
                .setTitle("⚙ Utility Commands ⚙")
                .addField("**calc**", "**A Command To Calculate The Given Expression!**")
                .addField("**emoji**", "**A Command To View The The Information Of The Emoji!**")
                .addField("**google**", "**A Command To Search Anything On Google!**")
                .addField("**inrole**", "**A Command To View The Name Of The Members In The Specified Role!**")
                .addField("**listrole**", "**A Command To List All The Roles Of The Server!**")
                .addField("**pokemon**", "**A Command To Get The Information Of The Specified Pokémon!**")
                .addField("**say**", "**A Command To Send The Message Through The Bot!**")
                .addField("**weather**", "**A Command To View The Weather Of The Specified Place!**")
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor)
                .setThumbnail(this.client.user.displayAvatarURL())

            let nsfw = new Discord.MessageEmbed()
                .setTitle('🔞 NSFW Commands 🔞')
                .addField('**4k**', '**Command For Viewing 4k Porn Images!**')
                .addField('**anal**', '**Command To View Anal Images/GIFs!**')
                //  .addField('**boobs**', '**Command To View Boobs Images/GIFs!**')
                .addField("**cum**", "**A Command To View Cum GIFs!**")
                //  .addField('**hanal**', '**Command To View Hentai Anal Images/GIFs!**')
                //  .addField('**hass**', '**Command To View Hentai Ass Images!**')
                //  .addField('**hentai**', '**Command For Viewing Hentai Images/GIFs!**')
                //.addField("**neko**", "**A Command TO View Neko NSFW GIFs!**")
                .addField('**porn**', '**Command For Viewing Porn GIFs!**')
                .addField('**pussy**', '**Command For Viewing Pussy Images/GIFs!**')
                //.addField("**rhentai**", "**A Command To View Random Hentai GIFs!**")
                .setColor(message.guild.me.displayHexColor)
                .setFooter(message.guild.me.displayName)
                .setThumbnail(this.client.user.displayAvatarURL())
                .setTimestamp()

            let music = new Discord.MessageEmbed()
                .setTitle('**🎵 Music Commands 🎵**')
                .addField('**disconnect**', '**A Command To Disconnect The Bot From The Voice Channel!**')
                .addField('**loop**', '**A Command To Loop The Current Song!**')
                .addField("**nowplaying**", "**A Command To View the Info The Currently Playing Song!**")
                .addField('**pause**', '**A Command To Pause The Current Playback!**')
                .addField('**play**', '**A Command To Play Songs!**')
                .addField('**queue**', '**A Command To View The Song Queue!**')
                .addField('**resume**', '**A Command To Resume The Playback!**')
                .addField('**skip**', '**A Command To Skip The Current Song!**')
                .addField('**volume**', '**A Command To Set The Volume Of The Song!**')
                .setColor(0xff47bf)
                .setFooter(message.guild.me.displayName)
                .setThumbnail(this.client.user.displayAvatarURL())
                .setTimestamp()

            const owner = new Discord.MessageEmbed()
                .setTitle("👑 Owner Commands 👑")
                .addField("**disable**", "**A Command To Disable An Enabled Command Or Group!**")
                .addField("**enable**", "**A Command To Enable An Disabled Command Or Group!**")
                .addField("**eval**", "**A Command To Execute The Given Javascript Code**")
                .addField("**giftall**", "**A Command To Gift All The Registered A User An Amount!**")
                .addField("**gift**", "**A Command To Gift A Certain User An Amount!**")
                .addField("**guilds**", "**A Command To View The Guilds The Bot Is In!**")
                .addField("**groups**", "**A Command To List All The Command Groups!**")
                .addField("**load**", "**A Command To Load An Unloaded Command!**")
                .addField("**reload**", "**A Command To Reload The Specified Command!**")
                .addField("**setstatus**", "**A Command To Set The Status Of The Bot!**")
                .addField("**shutdown**", "**A Command To Shutdown The Bot!**")
                .addField("**unload**", "**A Command To Unload The Specified Command!**")
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor)
                .setThumbnail(this.client.user.displayAvatarURL())

            const closed = new Discord.MessageEmbed()
                .setDescription("**Help Message Has Been Closed!**")
                .setFooter(message.guild.me.displayName)
                .setTimestamp()
                .setColor(0xff0000)

            const embed2 = await message.embed(embed)
            await embed2.react("💰")
            await embed2.react("🎮")
            await embed2.react("🧰")
            await embed2.react("🛠️")
            await embed2.react("👑")
            await embed2.react("🔎")
            await embed2.react("⚙")
            await embed2.react("🎵")
            await embed2.react("🔞")
            await embed2.react("❌")

            const filter = (reaction, user) => {
                return ['💰', '🎮', '🧰', '🛠️', '👑', '⚙', '🔎', '🔞', '🎵', '🏠', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            const collector = embed2.createReactionCollector(filter, { time: 120000 });
            collector.on("collect", async (reaction, user) => {
                if (reaction.emoji.name === "🛠️") {
                    await embed2.reactions.removeAll();
                    await embed2.edit(moderation);
                    await embed2.react("🏠");
                    await embed2.react("❌");
                }
                if (reaction.emoji.name === "🔎") {
                    await embed2.reactions.removeAll();
                    await embed2.edit(info);
                    await embed2.react("🏠");
                    await embed2.react("❌");
                }
                if (reaction.emoji.name === "👑") {
                    await embed2.reactions.removeAll();
                    await embed2.edit(owner);
                    await embed2.react("🏠");
                    await embed2.react("❌");
                }
                if (reaction.emoji.name === "⚙") {
                    await embed2.reactions.removeAll();
                    await embed2.edit(utility);
                    await embed2.react("🏠");
                    await embed2.react("❌");
                }
                if (reaction.emoji.name === "🎮") {
                    await embed2.reactions.removeAll();
                    await embed2.edit(gamble);
                    await embed2.react("🏠");
                    await embed2.react("❌");
                }
                if (reaction.emoji.name === "🔞") {
                    await embed2.reactions.removeAll();
                    await embed2.edit(nsfw);
                    await embed2.react("🏠");
                    await embed2.react("❌");
                }
                if (reaction.emoji.name === "💰") {
                    await embed2.reactions.removeAll();
                    await embed2.edit(economy);
                    await embed2.react("🏠");
                    await embed2.react("❌");
                }
                if (reaction.emoji.name === "🧰") {
                    await embed2.reactions.removeAll();
                    await embed2.edit(fun);
                    await embed2.react("🏠");
                    await embed2.react("❌");
                }
                if (reaction.emoji.name === "🎵") {
                    await embed2.reactions.removeAll();
                    await embed2.edit(music);
                    await embed2.react("🏠");
                    await embed2.react("❌");
                }
                if (reaction.emoji.name === "🏠") {
                    await embed2.reactions.removeAll();
                    await embed2.edit(embed);
                    await embed2.react("💰");
                    await embed2.react("🎮");
                    await embed2.react("🧰");
                    await embed2.react("🛠️");
                    await embed2.react("👑");
                    await embed2.react("🔎");
                    await embed2.react("⚙");
                    await embed2.react("🎵");
                    await embed2.react("🔞");
                    await embed2.react("❌");
                }
                if (reaction.emoji.name === "❌") {
                    await embed2.reactions.removeAll();
                    await embed2.edit(closed);
                }
            });

            collector.on("end", async collected => {
                await embed2.reactions.removeAll();
            });
        }
    }
};

