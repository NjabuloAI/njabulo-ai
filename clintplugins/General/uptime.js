module.exports = async (context) => {
  const { client, m, text, botname } = context;

  if (text) {
    return client.sendMessage(m.chat, {
      interactiveMessage: {
        body: { text: `◈━━━━━━━━━━━━━━━━◈\n│❒ What’s with the extra crap, ${m.pushName}? Just say !uptime, dumbass.` },
        footer: { text: `Powered by ${botname}` },
        nativeFlowMessage: {
          buttons: [
            {
              name: 'quick_reply',
              buttonParamsJson: JSON.stringify({
                display_text: 'Menu',
                id: 'menu',
              }),
            },
          ],
          messageParamsJson: JSON.stringify({
            limited_time_offer: {
              text: botname,
              url: 'https://github.com/xhclintohn/Toxic-MD',
              copy_code: 'TOXIC',
              expiration_time: Date.now() * 1000,
            },
            bottom_sheet: {
              in_thread_buttons_limit: 2,
              divider_indices: [1, 2],
              list_title: 'Select Command',
              button_title: botname,
            },
          }),
        },
        contextInfo: {
          externalAdReply: {
            title: `${botname}`,
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
  }

  try {
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

    const uptimeText = formatUptime(process.uptime());
    const replyText = `◈━━━━━━━━━━━━━━━━◈\n│❒ *${botname} Uptime, Bitches*\n\nI’ve been awake for *${uptimeText}*, running shit like a boss.\n\nPowered by *${botname}*`;

    await client.sendMessage(m.chat, {
      interactiveMessage: {
        body: { text: replyText },
        footer: { text: `Powered by ${botname}` },
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
            {
              name: 'quick_reply',
              buttonParamsJson: JSON.stringify({
                display_text: 'Ping',
                id: 'ping',
              }),
            },
          ],
          messageParamsJson: JSON.stringify({
            limited_time_offer: {
              text: botname,
              url: 'https://github.com/xhclintohn/Toxic-MD',
              copy_code: 'TOXIC',
              expiration_time: Date.now() * 1000,
            },
            bottom_sheet: {
              in_thread_buttons_limit: 2,
              divider_indices: [1, 2],
              list_title: 'Select Command',
              button_title: botname,
            },
          }),
        },
        contextInfo: {
          externalAdReply: {
            title: `${botname}`,
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
  } catch (error) {
    console.error('Error in uptime command:', error);
    await client.sendMessage(m.chat, {
      interactiveMessage: {
        body: { text: `◈━━━━━━━━━━━━━━━━◈\n│❒ Yo, something’s fucked up with the uptime check. Try again later, loser.` },
        footer: { text: `Powered by ${botname}` },
        nativeFlowMessage: {
          buttons: [
            {
              name: 'quick_reply',
              buttonParamsJson: JSON.stringify({
                display_text: 'Try Again',
                id: 'uptime',
              }),
            },
          ],
          messageParamsJson: JSON.stringify({
            limited_time_offer: {
              text: botname,
              url: 'https://github.com/xhclintohn/Toxic-MD',
              copy_code: 'TOXIC',
              expiration_time: Date.now() * 1000,
            },
            bottom_sheet: {
              in_thread_buttons_limit: 2,
              divider_indices: [1, 2],
              list_title: 'Select Command',
              button_title: botname,
            },
          }),
        },
        contextInfo: {
          externalAdReply: {
            title: `${botname}`,
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
  }
};