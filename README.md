# 🤖 IAT Bot (Discord Bot)

# (This project is no longer maintained since June 2022)
A powerful and modular Discord bot built using **Node.js** and **discord.js**. This bot comes packed with music playback, translation, image processing, utility commands, and more. It's structured with scalable command/event handling and includes integrations like Google Translate and YouTube.

## 📦 Features

- 🎵 Music playback from YouTube
- 🌐 Translation using Google Translate
- 🎉 Fun commands (memes, images, random content)
- ⚙️ Modular command and event structure
- 🧠 Persistent settings using SQLite
- 🖼️ Image manipulation with Canvas
- 💬 Urban Dictionary integration
- 📈 Uptime & performance tracking

## 🛠 Tech Stack

- **Node.js**
- **discord.js** (v12)
- **SQLite** (via `sqlite3`)
- **FFmpeg**
- **Canvas**
- **Axios**, **Cheerio** for web scraping
- **Google Translate API** (unofficial)
- **YouTube API** via `simple-youtube-api`

## 🚀 Getting Started

### Prerequisites

- Node.js (v12 or higher)
- FFmpeg installed and available in system PATH
- Discord bot token
- (Optional) YouTube API Key

### Installation

```bash
git clone https://github.com/your-username/iat-bot.git
cd iat-bot
npm install
````

### Configuration

Edit `config.json`:

```json
{
  "token": "YOUR_DISCORD_BOT_TOKEN",
  "prefix": "!",
  "ownerID": "YOUR_DISCORD_USER_ID",
  "apiKeys": {
    "youtube": "YOUR_YOUTUBE_API_KEY"
  }
}
```

### Running the Bot

```bash
node bot.js
```

## 📁 Project Structure

```
iat-bot/
├── assets/               # Images and other media
├── commands/             # Bot commands
├── events/               # Event listeners
├── functions/            # Utility functions
├── settings.sqlite3      # Persistent local data
├── config.json           # Configuration file
├── bot.js                # Bot entry point
└── package.json          # Dependencies and scripts
```

## ✅ Example Commands

* `!play <url>` – Play music from YouTube
* `!translate <text>` – Translate text to English
* `!urban <term>` – Look up a definition on Urban Dictionary
* `!meme` – Show a random meme

## 🧠 Credits

Created by **Mayank**
Special thanks to the developers behind [discord.js](https://discord.js.org/)

## 📜 License

This project is licensed under the [ISC License](LICENSE).
