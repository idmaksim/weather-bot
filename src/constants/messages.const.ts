export const BOT_MESSAGES = {
  WELCOME:
    "👋 *Привет, %s!*\n🗺 Нажмите на кнопку ниже, чтобы отправить свою геопозицию",
  SEND_LOCATION: "📍 Пожалуйста, отправьте свою геопозицию",
  WEATHER_ERROR: "⚠️ *Извините, не удалось получить информацию о погоде* ❌",
  WEATHER_TEMPLATE: `
🌍 *Погода в г. %s*

🌡 Температура: \`%s°C\` (ощущается как \`%s°C\`)
💨 Ветер: \`%s м/с\` (порывы до \`%s м/с\`)
💧 Влажность: \`%s%%\`
👀 Видимость: \`%s км\`
☁️ Облачность: \`%s%%\`
🌤 %s

🌅 Восход: \`%s\`
🌇 Закат: \`%s\`
`,
} as const;

export const KEYBOARD_BUTTONS = {
  SEND_LOCATION: "📍 Отправить геопозицию 🗺",
} as const;