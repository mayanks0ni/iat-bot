const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class ShopCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'shop',
            group: 'economy',
            memberName: 'shop',
            description: 'A Command To View The Shop!',
            examples: ["shop"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            const diamond = this.client.emojis.cache.get("706515264451117109");

            let shopDB = new sqlite.Database("./database/shop.db", err => {
                if (err) console.error(err);
            });

            let itemShop = new sqlite.Database("./database/itemshop.db", err => {
                if (err) console.error(err);
            });

            let preshop = new sqlite.Database("./database/pshop.db", err => {
                if (err) console.error(err);
            });

            let proShop = new sqlite.Database("./database/proshop.db", err => console.log(err));

            if (args[0]) {
                if (!this.client.isOwner(message.author.id)) return message.embed(new Discord.MessageEmbed().setTitle("This Is An Owner-Only Command!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
                const r = ["role"];
                if (!r.includes(args[0])) return message.embed(new Discord.MessageEmbed().setTitle("Invalid Arguement!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
                if (args[1]) {
                    const ar = ["add", "remove"];
                    if (!ar.includes(args[1])) return message.embed(new Discord.MessageEmbed().setTitle("Invalid Arguement!").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
                    if (args[1] === "add") {
                        const roleName = args.slice(3).join(" ");
                        const roleTofind = message.guild.roles.cache.find(r => r.name === roleName)
                        if (!roleTofind) return message.embed(new Discord.MessageEmbed().setTitle("Invalid Role Name!\n(Type The Roles Exact Same Name.)").setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
                        const price = args[2];
                        shopDB.all(`INSERT INTO roleshop(role, price, guildid) VALUES('${roleName}', '${price}', '${message.guild.id}')`);
                        message.embed(new Discord.MessageEmbed().setTitle("Role Added In The Shop!").setColor("GREEN").setFooter(message.guild.me.displayName).setTimestamp());
                    } else {
                        shopDB.all(`DELETE FROM roleshop WHERE guildid = '${message.guild.id}'`);
                        message.embed(new Discord.MessageEmbed().setTitle("All Roles Have Been Removed From The Role Shop!").setColor("GREEN").setFooter(message.guild.me.displayName).setTimestamp());
                    }
                }
            } else {
                const shop = new Discord.MessageEmbed()
                    .setAuthor("🛒 Shop 🛒")
                    .setTitle(`What Are You Going To Buy Today?`)
                    .addField("**🛍️ Item Shop**️", "**Information And Prices Of Items!**")
                    .addField("**⚔️ Role Shop**", "**Information And Price Of Roles!**")
                    .addField("**🎴 Profile Shop**", "**infromation And Price Of Profile Cards!**")
                    .addField("**💰 Premium Shop**", "**Information And Price Of Premium Items!**")
                    .setColor(0xff00c3)
                    .setFooter(message.guild.me.displayName)
                    .setTimestamp()

                const closed = new Discord.MessageEmbed()
                    .setDescription("**Shop Menu Has Been Closed!**")
                    .setFooter(message.guild.me.displayName)
                    .setTimestamp()
                    .setColor(0xff0000)

                const sShop = await message.embed(shop);
                await sShop.react("🛍️")
                await sShop.react("⚔️")
                await sShop.react("🎴")
                await sShop.react("💰")
                await sShop.react("❌")

                const filter = (reaction, user) => {
                    return ['🛍️', '⚔️', '🎴', '💰', '⏮', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                const collector = sShop.createReactionCollector(filter, { time: 60000 })

                collector.on("collect", async (reaction, user) => {

                    if (reaction.emoji.name === '⏮') {
                        await sShop.reactions.removeAll();
                        await sShop.edit(shop);
                        await sShop.react("🛍️")
                        await sShop.react("⚔️")
                        await sShop.react("🎴")
                        await sShop.react("💰")
                        await sShop.react("❌")
                    }
                    
                    if (reaction.emoji.name === '❌') {
                        await sShop.reactions.removeAll();
                        await sShop.edit(closed);
                    }
                    
                    if (reaction.emoji.name === '🛍️') {
                        itemShop.all(`SELECT * FROM itemshop`, async(err, rows) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            let shopItem;

                            if (rows === undefined) {
                                shopItem = message.embed(new Discord.MessageEmbed().setDescription("**There's Nothing In The Item Shop!**").setColor(0xff00c3).setFooter(message.guild.me.displayName).setTimestamp());
                            } else {
                                var a;
                                shopItem = new Discord.MessageEmbed()
                                    .setTitle("🛍️ Item Shop 🛍️")
                                    .setColor(0xff0053)
                                    .setFooter(message.guild.me.displayName)
                                    .setThumbnail(this.client.user.displayAvatarURL())
                                    .setTimestamp()
                                for (a = 0; a < rows.length; a++) {
                                    const rs = rows[a];
                                    shopItem.addField(`**\`#${a + 1}\`${rs.item}**`, `**Price: ${rs.price}${diamond}\n${rs.Description}\nTo Buy Send \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}buy item ${rs.id}\`**`)
                                }
                                await sShop.reactions.removeAll();
                                await sShop.edit(shopItem);
                                await sShop.react("⏮")
                                await sShop.react("❌")
                            }
                        });
                    }
                    if (reaction.emoji.name === '⚔️') {
                        shopDB.all(`SELECT * FROM roleshop WHERE guildid = '${message.guild.id}'`, async(err, rows) => {
                            if (err) {
                                console.error(err);
                                return;
                            }

                            let roleShop;

                            if (rows === undefined) {
                                roleShop = message.embed(new Discord.MessageEmbed().setDescription("**There's Nothing In The Role Shop!**").setColor(0xff00c3).setFooter(message.guild.me.displayName).setTimestamp());
                            } else {
                                var i;
                                roleShop = new Discord.MessageEmbed()
                                    .setTitle("⚔️ Role Shop ⚔️")
                                    .setThumbnail(this.client.user.displayAvatarURL())
                                    .setFooter(message.guild.me.displayName)
                                    .setColor(0xff00c3)
                                    .setTimestamp()
                                for (i = 0; i < rows.length; i++) {
                                    const rs = rows[i]
                                    roleShop.addField(`**${rs.role}**`, `**Price: ${rs.price}${diamond} \nTo Buy Send \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}buy role ${rs.id}\`**`)
                                }
                                await sShop.reactions.removeAll();
                                await sShop.edit(roleShop);
                                await sShop.react("⏮");
                                await sShop.react("❌");
                            }
                        });
                    }
                    if (reaction.emoji.name === '💰') {
                        preshop.all(`SELECT * FROM pshop`, async(err, rows) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            if (rows === undefined) return message.embed(new Discord.MessageEmbed().setTitle("There's Nothing In The Premium Shop!").setColor(0xff00c3).setFooter(message.guild.me.displayName).setTimestamp());
                            var i;
                            const pShop = new Discord.MessageEmbed()
                                .setTitle("💰 Premium Shop 💰")
                                .setThumbnail(this.client.user.displayAvatarURL())
                                .setFooter(message.guild.me.displayName)
                                .setColor(0xff00c3)
                                .setTimestamp()
                            for (i = 0; i < rows.length; i++) {
                                const rs = rows[i]
                                pShop.addField(`**${rs.item}**`, `**Price: ${rs.price}${diamond} \n${rs.description}\nTo Buy Send \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}buy premium ${rs.id}\`**`)
                            }
                            await sShop.reactions.removeAll();
                            await sShop.edit(pShop);
                            await sShop.react("⏮");
                            await sShop.react("❌");
                        })
                    }
                    if (reaction.emoji.name === "🎴") {
                        var i;
                        proShop.all(`SELECT * FROM profile`, async(err, rows) => {
                            const prshop = new Discord.MessageEmbed()
                                .setTitle("🎴 Profile Shop 🎴")
                                .setThumbnail(this.client.user.displayAvatarURL())
                                .setFooter(message.guild.me.displayName)
                                .setColor(0xff00c3)
                                .setTimestamp()
                            for (i = 0; i < rows.length; i++) {
                                const rs = rows[i]
                                prshop.addField(`**${rs.name} Profile**`, `**Price: ${rs.price}${diamond}\nTo Preview Send \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}previewprofile ${rs.pid}\`\nTo Buy Send \n\`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}buy profile ${rs.pid}\`**`)
                            }
                            await sShop.reactions.removeAll();
                            await sShop.edit(prshop);
                            await sShop.react("⏮");
                            await sShop.react("❌");
                        });
                    }
                });
            }
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

