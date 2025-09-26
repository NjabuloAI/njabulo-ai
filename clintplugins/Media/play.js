const fs = require("fs");
const path = require("path");
const yts = require("yt-search");
const axios = require("axios");

const tempDir = path.join(__dirname, "temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

const isValidYouTubeUrl = (url) => {
  return /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|shorts\/|embed\/)?[A-Za-z0-9_-]{11}(\?.*)?$/.test(url);
};

module.exports = async (context) => {
  const { client, m, text } = context;

  const formatStylishReply = (message) => {
    return `◈━━━━━━━━━━━━━━━━◈\n│❒ ${message}\n◈━━━━━━━━━━━━━━━━◈\n> Pσɯҽɾԃ Ⴆყ Tσxιƈ-ɱԃȥ`;
  };

  if (!text) {
    await client.sendMessage(
      m.chat,
      { text: formatStylishReply("Yo, drop a song name, fam! 🎵 Ex: .play Not Like Us") },
      { quoted: m }
    );
    return;
  }

  try {
    const searchQuery = `${text} official`;
    const searchResult = await yts(searchQuery);
    const video = searchResult.videos[0];
    if (!video) {
      await client.sendMessage(
        m.chat,
        { text: formatStylishReply("No tunes found, bruh! 😕 Try another search!") },
        { quoted: m }
      );
      return;
    }

    const videoInfo = `╭───────────────◆\n` +
                      `│⿻ *Title:* ${video.title}\n` +
                      `│⿻ *Duration:* ${video.duration.timestamp}\n` +
                      `│⿻ *Views:* ${video.views}\n` +
                      `│⿻ *Uploaded:* ${video.ago}\n` +
                      `│⿻ *Channel:* ${video.author.name}\n` +
                      `╰───────────────◆`;

    await client.sendMessage(
      m.chat,
      {
        interactiveMessage: {
          body: { text: videoInfo },
          footer: { text: 'Toxic-MD' },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                  display_text: 'Visit GitHub',
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
                expiration_time: Date.now() + 100000,
              },
              bottom_sheet: {
                in_thread_buttons_limit: 2,
                divider_indices: [1, 2],
                list_title: 'Select Command',
                button_title: 'Toxic-MD',
              },
            }),
          },
        },
      },
      { quoted: m }
    );

    // Use the new API endpoint
    const apiUrl = `https://api.privatezia.biz.id/api/downloader/ytmp3?url=${encodeURIComponent(video.url)}`;
    
    // Call the API
    const response = await axios.get(apiUrl);
    const apiData = response.data;

    // Check if the API call was successful
    if (!apiData.status || !apiData.result || !apiData.result.downloadUrl) {
      throw new Error("API failed to process the video");
    }

    const timestamp = Date.now();
    const fileName = `audio_${timestamp}.mp3`;
    const filePath = path.join(tempDir, fileName);

    // Download the audio file from the API's download URL
    const audioResponse = await axios({
      method: "get",
      url: apiData.result.downloadUrl,
      responseType: "stream",
      timeout: 600000,
    });

    const writer = fs.createWriteStream(filePath);
    audioResponse.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
      throw new Error("Download failed or file is empty");
    }

    await client.sendMessage(
      m.chat,
      {
        audio: { url: filePath },
        mimetype: "audio/mpeg",
        fileName: `${(apiData.result.title || video.title).substring(0, 100)}.mp3`,
        contextInfo: {
          externalAdReply: {
            title: `${botname}`,
            body: `Yo, ${m.pushName}! Ready to fuck shit up?`,
            mediaType: 1,
            thumbnail: pict,
            mediaUrl: 'https://github.com/xhclintohn/Toxic-MD',
            sourceUrl: 'https://github.com/xhclintohn/Toxic-MD',
            showAdAttribution: false,
            renderLargerThumbnail: true,
          },
          messageParamsJson: JSON.stringify({
            limited_time_offer: {
              text: 'Toxic-MD',
              url: 'https://github.com/xhclintohn/Toxic-MD',
              copy_code: 'TOXIC',
              expiration_time: Date.now() + 100000,
            },
            bottom_sheet: {
              in_thread_buttons_limit: 2,
              divider_indices: [1, 2],
              list_title: 'Select Command',
              button_title: 'Toxic-MD',
            },
          }),
        },
      },
      { quoted: m }
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    await client.sendMessage(
      m.chat,
      {
        interactiveMessage: {
          body: { text: formatStylishReply(`Yo, we hit a snag: ${error.message}. Pick another track! 😎`) },
          footer: { text: 'Toxic-MD' },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                  display_text: 'Search Again',
                  id: '.play',
                }),
              },
            ],
            messageParamsJson: JSON.stringify({
              limited_time_offer: {
                text: 'Toxic-MD',
                url: 'https://github.com/xhclintohn/Toxic-MD',
                copy_code: 'TOXIC',
                expiration_time: Date.now() + 100000,
              },
              bottom_sheet: {
                in_thread_buttons_limit: 2,
                divider_indices: [1, 2],
                list_title: 'Select Command',
                button_title: 'Toxic-MD',
              },
            }),
          },
        },
      },
      { quoted: m }
    );
  }
};