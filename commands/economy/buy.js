const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class BuyCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'buy',
            group: 'economy',
            memberName: 'buy',
            description: 'A Command To Buy Items From The Shop!',
            examples: ["buy role|item|profile|premium [Index]"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            const diamond = this.client.emojis.cache.get("706515264451117109");

            const tada = this.client.emojis.cache.get("706822382089666570");

            let shopDB = new sqlite.Database("./database/shop.db", err => {
                if (err) console.error(err);
            });

            let db = new sqlite.Database("./database/userdb1.db", err => {
                if (err) console.error(err);
            });

            let pShop = new sqlite.Database("./database/pshop.db", err => {
                if (err) console.error(err);
            });

            let itemShop = new sqlite.Database("./database/itemshop.db", err => {
                if (err) console.error(err);
            });

            const trans = new sqlite.Database("./database/transactions.db", err => {
                if (err) console.error(err);
            });

            let updb = new sqlite.Database("./database/profiles.db", err => console.log(err));

            let pdb = new sqlite.Database("./database/proshop.db", err => console.log(err));

            let inv = new sqlite.Database("./database/inv.db", err => console.log(err));

            let toBuy = args[0];

            let toBuyList = ["role", "item", "premium", "profile"];

            let sender = message.author.id;

            let senderData = {};

            let d = {};

            let inven = {};

            const index = args[1];

            if (!toBuyList.includes(toBuy) || !args[0] || !index) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`This Command Is Used Like This \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}buy role|item|profile|premium [index]\`!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
            db.each("SELECT * FROM userdb", (err, row) => {
                if (row.userId == sender) {
                    senderData["userid"] = row.userId;
                    senderData["bal"] = row.bal;
                    senderData["premium"] = row.premium;
                    senderData["pnsfw"] = row.pnsfw;
                }
            }, () => {
                if (Object.keys(senderData).length != 0) {
                    if (args[0] === "role") {
                        shopDB.get(`SELECT * FROM roleshop WHERE guildid = '${message.guild.id}' AND id = '${index}'`, (err, rows) => {
                            if (rows === undefined) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Invalid Index!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                            if (message.member.roles.cache.find(r => r.name === rows.role)) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Already Have That Role!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                            if (senderData.bal < rows.price) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Don't Have That Much Money In Your Hand!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                            const role1 = message.guild.roles.cache.find(r => r.name === rows.role);
                            if (!role1) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Role Not Found!\nPlease Ask The Owner To Add The Role Again!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                            db.all(`UPDATE userdb SET bal = bal - '${rows.price}' WHERE userId = '${message.author.id}'`)
                            trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Bought Role ${rows.role}!", '-${rows.price}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                            message.member.roles.add(role1)
                            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Transaction Successful! ${tada}`).addField("**Role Bought:**", `**${rows.role}**`).addField("**Cost**", `**${rows.price}${diamond}**`).setThumbnail(this.client.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
                        });
                    } else if (args[0] === "item") {
                        if (index === "1") {
                            itemShop.get(`SELECT * FROM itemshop WHERE id = 1`, (err, rows) => {
                                console.log(rows);
                                if (rows === undefined) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Invalid Index!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                                if (senderData.bal < rows.price) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Don't Have That Much Money In Your Hand!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                                db.all(`UPDATE userdb SET bal = bal - '${rows.price}' WHERE userId = '${message.author.id}'`)
                                const gotAmount = Math.floor(Math.random() * 6000);
                                db.all(`UPDATE userdb SET bal = bal + '${gotAmount}' WHERE userId = '${message.author.id}'`)
                                trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Bought Item ${rows.item}!", '-${rows.price}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                                trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Received From Chest Of Money!", '+${gotAmount}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                                message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Transaction Successful! ${tada}`).addField("**Item Bought:**", `**${rows.item}**`).addField("**Cost**", `**${rows.price}${diamond}**`).setThumbnail(this.client.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp()).then(
                                    message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Congratulations! You Got ${gotAmount}${diamond} From The Chest Of Money!`).setThumbnail(this.client.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp()));

                            });
                        } else if (index === "2") {
                            itemShop.get(`SELECT * FROM itemshop WHERE id = 2`, (err, rows) => {
                                if (rows === undefined) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Invalid Index!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                                if (senderData.premium === "yes") return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Already Have Premium Membership!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                                if (senderData.bal < rows.price) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Don't Have That Much Money In Your Hand!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                                db.all(`UPDATE userdb SET bal = bal - '${rows.price}' WHERE userId = '${message.author.id}'`)
                                db.all(`UPDATE userdb SET premium = "yes" WHERE userId = '${message.author.id}'`)
                                trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Bought Item ${rows.item}!", '-${rows.price}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                                message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Transaction Successful! ${tada}`).addField("**Item Bought:**", `**${rows.item}**`).addField("**Cost**", `**${rows.price}${diamond}**`).setThumbnail(this.client.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp()).then(
                                message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Congratulations! ${tada}`).setDescription(`**You Successfully Bought Premium Membership And Got The Following Advantages -**\n\n\`\`\`- Access To Google Search Command!\n- 700 Diamonds As Daily Reward!\n- Access To Premium Shop!\`\`\`\n **\n Enjoy!!**`).setThumbnail(this.client.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("YELLOW").setTimestamp()));
                            });
                        } else {
                            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Invalid Index!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                        }
                    } else if (args[0] === "premium") {
                        if (senderData.premium === "yes") {
                            if (index === "1") {
                                pShop.get(`SELECT * FROM pshop WHERE id = 1`, (err, rws) => {
                                    if (rws === undefined) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Invalid Index!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                                    if (senderData.pnsfw === "yes") return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Already Have Premium NSFW Access!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                                    if (senderData.bal < rws.price) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Don't Have That Much Money In Your Hand!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                                    db.all(`UPDATE userdb SET bal = bal - '${rws.price}' WHERE userId = '${message.author.id}'`)
                                    db.all(`UPDATE userdb SET pnsfw = "yes" WHERE userId = '${message.author.id}'`)
                                    trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Bought Item ${rws.item}!", '-${rws.price}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                                    message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Transaction Successful! ${tada}`).addField("**Item Bought:**", `**${rws.item}**`).addField("**Cost**", `**${rws.price}${diamond}**`).setThumbnail(this.client.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp()).then(
                                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Congratulations! ${tada}`).setDescription("**You Successfully Bought Premium NSFW And Got Access To Following Commands!**\n\n\`\`\`- rhentai\n- cum\n- neko\`\`\`\n **All Commands Will Send GIFs For Sure!\n Enjoy!!**").setThumbnail(this.client.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp()));
                                });
                            } else if (index === "2") {
                                inv.get(`SELECT * FROM inv WHERE userid = '${message.author.id}' AND item = "Notepad"`, (err, rs) => {
                                    if (rs === undefined) {
                                        inven["userid"] = undefined
                                        inven["item"] = undefined
                                    } else {
                                        inven["userid"] = rs.userid;
                                        inven["item"] = rs.item;
                                    }
                                });
                                pShop.get(`SELECT * FROM pshop WHERE id = 2`, (err, rws) => {
                                    if (rws === undefined) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Invalid Index!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                                    if (inven.userid === undefined) {
                                        if (senderData.bal < rws.price) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Don't Have That Much Money In Your Hand!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                                        db.all(`UPDATE userdb SET bal = bal - '${rws.price}' WHERE userId = '${message.author.id}'`)
                                        inv.all(`INSERT INTO inv(userid, item) VALUES('${message.author.id}', "Notepad")`)
                                        trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Bought Item ${rws.item}!", '-${rws.price}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                                        message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Transaction Successful! ${tada}`).addField("**Item Bought:**", `**${rws.item}**`).addField("**Cost**", `**${rws.price}${diamond}**`).setThumbnail(this.client.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
                                    } else {
                                        return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Already Bought Notepad!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                                    }
                                });

                            } else {
                                message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Invalid Index!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                            }
                        } else {
                            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`You Need To Buy Premium Membership To Use This Command!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                        }
                    } else if (args[0] === "profile") {
                        pdb.each(`SELECT * FROM profile`, (err, row) => {
                            if (row.pid == index) {
                                d["name"] = row.name;
                                d["link"] = row.link;
                                d["pid"] = row.pid;
                                d["price"] = row.price;
                            }
                        }, () => {
                            if (Object.keys(d).length != 0) {
                                updb.each(`SELECT * FROM profile WHERE userid = '${message.author.id}'`, (err, uprow) => {
                                    d["uprow"] = uprow.name;
                                }, () => {
                                    if (d.name == d.uprow) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Already Bought That Profile Card!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                                    if (d.price > senderData.bal) return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Don't Have That Much Money In Your Hand!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp())
                                    updb.all(`INSERT INTO profile(userid, name, link, pid) VALUES('${message.author.id}', '${d.name}', '${d.link}', '${d.pid}')`);
                                    db.all(`UPDATE userdb SET bal = bal - '${d.price}' WHERE userId = '${message.author.id}'`)
                                    trans.all(`INSERT INTO trans(reason, money, date, userid) VALUES("Bought Profile - ${d.name} Profile!", '-${d.price}', '${new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}', '${message.author.id}')`)
                                    message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`${tada} Transaction Successful! ${tada}`).addField("**Profile Bought:**", `**${d.name} Profile Card**`).addField("**Cost**", `**${d.price}${diamond}**`).setThumbnail(this.client.user.displayAvatarURL()).setFooter(message.guild.me.displayName).setColor("GREEN").setTimestamp());
                                });
                            } else {
                                return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle(`Invalid Index!`).setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                            }
                        });
                    }
                }
                else {
                    message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("You Are Not Registered!").setFooter(message.guild.me.displayName).setTimestamp().setColor(0xff0000));
                }
            });
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

