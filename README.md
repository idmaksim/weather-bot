# 🌦 Weather Bot for Telegram

A Telegram bot that provides real-time weather information based on your location. Built with Node.js, TypeScript and grammY.js framework.

Try it now: [@atmos_alert_bot](https://t.me/atmos_alert_bot)

## ✨ Features

- 📍 Get weather data by sharing your location
- 🌡 Current temperature and "feels like" temperature
- 💨 Wind speed and gusts
- 💧 Humidity levels
- 👀 Visibility information
- ☁️ Cloud coverage percentage
- 🌅 Sunrise and sunset times
- 🌍 Location-based weather updates
- 🇷🇺 Russian language support

## 🛠 Tech Stack

- Node.js
- TypeScript
- grammY.js (Telegram Bot Framework)
- OpenWeatherMap API
- Docker
- Winston (Logging)
- TypeDI (Dependency Injection)

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm
- Telegram Bot Token (from [@BotFather](https://t.me/BotFather))
- OpenWeatherMap API Key ([Get it here](https://openweathermap.org/api))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/idmaksim/weather-bot.git
cd weather-bot
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file in the root directory:

```bash
BOT_TOKEN={your_telegram_bot_token}
OPENWEATHER_API_KEY={your_openweathermap_api_key}
```

### Running the Bot

#### Development mode:

```bash
npm run dev
```

#### Production mode:

```bash
npm run build
npm start
```

### 🐳 Docker Deployment

1. Run containers with Docker Compose:

```bash
docker compose up --build -d
```

## 📝 Environment Variables

| Variable            | Description                 |
| ------------------- | --------------------------- |
| BOT_TOKEN           | Your Telegram Bot Token     |
| OPENWEATHER_API_KEY | Your OpenWeatherMap API Key |

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check the [issues page](https://github.com/idmaksim/weather-bot/issues).

## 👨‍💻 Author

Created with ❤️ by [@idmaksim](https://github.com/idmaksim)

## 🙏 Acknowledgments

- [grammY Documentation](https://grammy.dev)
- [OpenWeatherMap API](https://openweathermap.org/api)
