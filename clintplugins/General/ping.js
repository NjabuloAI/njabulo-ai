const { getSettings } = require('../../Database/config');
const axios = require('axios');

module.exports = {
  name: 'ping',
  aliases: ['p'],
  description: 'Checks the bot\'s response time, uptime, and status with a sassy vibe',
  run: async (context) => {
    const { client, m, toxicspeed } = context;

    try {
      // Validate m.sender
      if (!m.sender || typeof m.sender !== 'string' || !m.sender.includes('@s.whatsapp.net')) {
        console.error(`Invalid m.sender: ${JSON.stringify(m.sender)}`);
        return m.reply(`◎━━━━━━━━━━━━━━━━◎\n│❒ Can't read your number, genius! Try again.\nCheck https://github.com/xhclintohn/Toxic-MD\n◎━━━━━━━━━━━━━━━━◎`);
      }

      // Validate toxicspeed
      if (typeof toxicspeed !== 'number' || isNaN(toxicspeed)) {
        console.error(`Invalid toxicspeed: ${toxicspeed}`);
        return m.reply(`◎━━━━━━━━━━━━━━━━◎\n│❒ Ping's broken, @${m.sender.split('@')[0]}! Speed data's fucked.\nCheck https://github.com/xhclintohn/Toxic-MD\n◎━━━━━━━━━━━━━━━━◎`, { mentions: [m.sender] });
      }

      // Retrieve settings to get the current prefix
      const settings = await getSettings();
      if (!settings) {
        return m.reply(`◎━━━━━━━━━━━━━━━━◎\n│❒ Error: Couldn't load settings, you dumb fuck.\nCheck https://github.com/xhclintohn/Toxic-MD\n◎━━━━━━━━━━━━━━━━◎`);
      }

      const toFancyFont = (text, isUpperCase = false) => {
        const fonts = {
          'A': '', 'B': '', 'C': '', 'D': '', 'E': '', 'F': '', 'G': '', 'H': '', 'I': '', 'J': '', 'K': '', 'L': '', 'M': '',
          'N': '', 'O': '', 'P': '', 'Q': '', 'R': '', 'S': '', 'T': '', 'U': '', 'V': '', 'W': '', 'X': '', 'Y': '', 'Z': '',
          'a': '', 'b': '', 'c': '', 'd': '', 'e': '', 'f': '', 'g': '', 'h': '', 'i': '', 'j': '', 'k': '', 'l': '', 'm': '',
          'n': '', 'o': '', 'p': '', 'q': '', 'r': '', 's': '', 't': '', 'u': '', 'v': '', 'w': '', 'x': '', 'y': '', 'z': ''
        };
        return (isUpperCase ? text.toUpperCase() : text.toLowerCase())
          .split('')
          .map(char => fonts[char] || char)
          .join('');
      };

      // Uptime
      const formatUptime = (seconds) => {
        const days = Math.floor(seconds / (3600 * 24));
        const hours = Math.floor((seconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        const daysDisplay = days > 0 ? `${days} ${days === 1 ? 'day' : 'days'}, ` : '';
        const hoursDisplay = hours > 0 ? `${hours} ${hours === 1 ? 'hour' : 'hours'}, ` : '';
        const minutesDisplay = minutes > 0 ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}, ` : '';
        const secsDisplay = secs > 0 ? `${secs} ${secs === 1 ? 'second' : 'seconds'}` : '';

        return (daysDisplay + hoursDisplay + minutesDisplay + secsDisplay).replace(/,\s*$/, '');
      };

      const userNumber = m.sender.split('@')[0];
      const pingTime = toxicspeed.toFixed(4);
      const uptimeText = formatUptime(process.uptime());
      const botName = 'Toxic-MD';
      const replyText = `
◎━━━━━━━━━━━━━━━━◎
│❒ *Pong, @${m.pushName}!* 🏓

│ ⏱️ *Response Time*: ${pingTime}ms

│ 🤖 *Bot Name*: ${toFancyFont(botName)}

│ ⏰ *Uptime*: ${uptimeText}

│ 🟢 *Status*: Active

I'm running like a damn beast! 😈

> Pσɯҽɾҽԃ Ⴆყ Toxic-MD
◎━━━━━━━━━━━━━━━━◎
      `;

      await client.sendMessage(m.chat, {
        interactiveMessage: {
          header: {
          },
          body: { text: replyText },
          footer: { text: `Pσɯҽɾҽԃ Ⴆყ Toxic-MD` },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                  display_text: 'GitHub Repo',
                  url: 'https://github.com/xhclintohn/Toxic-MD',
                  merchant_url: 'https://github.com/xhclintohn/Toxic-MD',
                }),
              },
            ],
            messageParamsJson: JSON.stringify({
              limited_time_offer: {
                text: 'Toxic-MD',
                url: 'https://github.com/xhclintohn/Toxic-MD',
                copy_code: 'TOXIC',
                expiration_time: Date.now() * 1000,
              },
              bottom_sheet: {
                in_thread_buttons_limit: 2,
                divider_indices: [1, 2],
                list_title: 'Select Command',
                button_title: 'Toxic-MD',
              },
            }),
          },
          contextInfo: {
            externalAdReply: {
              title: `${toFancyFont(botName)}`,
              body: `Yo, ${m.pushName}! Don't waste my time.`,
              mediaType: 1,
              thumbnail: context.pict,
              sourceUrl: `https://github.com/xhclintohn/Toxic-MD`,
              showAdAttribution: false,
              renderLargerThumbnail: true,
            },
          },
        },
      }, { quoted: m });

      // Send the audio as a voice note after the ping message
      const audioUrl = 'https://files.catbox.moe/4ufunx.mp3';
      await client.sendMessage(m.chat, {
        audio: { url: audioUrl },
        mimetype: 'audio/mp4',
        ptt: true
      }, { quoted: m });

    } catch (error) {
      console.error(`Ping command fucked up: ${error.stack}`);
      await client.sendMessage(m.chat, {
        text: `◎━━━━━━━━━━━━━━━━◎\n│❒ Ping's fucked, @${m.sender.split('@')[0]}! Try again, you slacker.\nCheck https://github.com/xhclintohn/Toxic-MD\n◎━━━━━━━━━━━━━━━━◎`,
        mentions: [m.sender]
      }, { quoted: m });
    }
  }
};