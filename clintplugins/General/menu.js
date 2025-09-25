const fs = require('fs');
const path = require('path');
const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');
const { getSettings } = require('../../Database/config');

module.exports = {
  name: 'menu',
  aliases: ['help', 'commands', 'list'],
  description: 'Displays the Toxic-MD command menu with interactive buttons',
  run: async (context) => {
    const { client, m, mode, pict, botname, text, prefix } = context;

    if (text) {
      await client.sendMessage(
        m.chat,
        {
          text: `◈━━━━━━━━━━━━━━━━◈\n│❒ Yo ${m.pushName}, what's with the extra bullshit? Just say *${prefix}menu*, moron. 🖕\n┗━━━━━━━━━━━━━━━┛`,
        },
        { quoted: m, ad: true }
      );
      return;
    }

    const settings = await getSettings();
    const effectivePrefix = settings.prefix || '.'; // Dynamic prefix from database

    // Fancy font converter
    const toFancyFont = (text, isUpperCase = false) => {
      const fonts = {
        A: '𝘼', B: '𝘽', C: '𝘾', D: '𝘿', E: '𝙀', F: '𝙁', G: '𝙂', H: '𝙃', I: '𝙄', J: '𝙅', K: '𝙆', L: '𝙇', M: '𝙈',
        N: '𝙉', O: '𝙊', P: '𝙋', Q: '𝙌', R: '𝙍', S: '𝙎', T: '𝙏', U: '𝙐', V: '𝙑', W: '𝙒', X: '𝙓', Y: '𝙔', Z: '𝙕',
        a: '𝙖', b: '𝙗', c: '𝙘', d: '𝙙', e: '𝙚', f: '𝙛', g: '𝙜', h: '𝙝', i: '𝙞', j: '𝙟', k: '𝙠', l: '𝙡', m: '𝙢',
        n: '𝙣', o: '𝙤', p: '𝙥', q: '𝙦', r: '𝙧', s: '𝙨', t: '𝙩', u: '𝙪', v: '𝙫', w: '𝙬', x: '𝙭', y: '𝙮', z: '𝙯',
      };
      return (isUpperCase ? text.toUpperCase() : text.toLowerCase())
        .split('')
        .map((char) => fonts[char] || char)
        .join('');
    };

    // Menu text with Toxic-MD flair
    const menuText = `_______________________\n\n` +
      `🤖 *Bσƚ*: Njabulo Jb (bow down)\n` +
      `🔣 *Pɾҽϝιx*: ${effectivePrefix} (learn it, dumbass)\n` +
      `🌐 *Mσԃҽ*: ${mode} (deal with it)\n` +
      `\n________________________\n\n` +
      `*Select an option Below, Loser.* 😈`;

    // Interactive message with buttons using dynamic prefix
    const msg = generateWAMessageFromContent(
      m.chat,
      {
        interactiveMessage: {
          header: {
            documentMessage: {
              url: 'https://mmg.whatsapp.net/v/t62.7119-24/539012045_745537058346694_1512031191239726227_n.enc?ccb=11-4&oh=01_Q5Aa2QGGiJj--6eHxoTTTTzuWtBgCrkcXBz9hN_y2s_Z1lrABA&oe=68D7901C&_nc_sid=5e03e0&mms3=true',
              mimetype: 'image/png',
              fileSha256: '+gmvvCB6ckJSuuG3ZOzHsTBgRAukejv1nnfwGSSSS/4=',
              fileLength: '1435',
              pageCount: 0,
              mediaKey: 'MWO6fI223TY8T0i9onNcwNBBPldWfwp1j1FPKCiJFzw=',
              fileName: 'Njabulo-Jb',
              fileEncSha256: 'ZS8v9tio2un1yWVOOG3lwBxiP+mNgaKPY9+wl5pEoi8=',
              directPath: '/v/t62.7119-24/539012045_745537058346694_1512031191239726227_n.enc?ccb=11-4&oh=01_Q5Aa2QGGiJj--6eHxoTTTTzuWtBgCrkcXBz9hN_y2s_Z1lrABA&oe=68D7901C&_nc_sid=5e03e0',
              mediaKeyTimestamp: '1756370084',
              jpegThumbnail: pict,
            },
            hasMediaAttachment: true,
          },
          body: { text: menuText },
          footer: { text: `Pσɯҽɾҽԃ Ⴆყ NנɐႦυℓσ נႦ` },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                  display_text: 'GitHub Repo',
                  url: 'https://njabulo-repo.vercel.app',
                  merchant_url: 'https://njabulo-repo.vercel.app',
                }),
              },
              {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: 'VIEW OPTIONS',
                  sections: [
                    {
                    title: '📥ɢᴇɴᴇʀᴀʟ ᴄᴏᴍᴍᴅᴀs',
                      highlight_label: '🍥ɢᴇɴᴇʀᴀʟ',
                      rows: [
        { title: 'ᴀᴅᴠɪᴄᴇ', description: 'Get advice', id: `${effectivePrefix}advice` },
        { title: 'ᴀʟɪᴠᴇ', description: 'Check if bot is alive', id: `${effectivePrefix}alive` },
        { title: 'ʙᴏᴛ', description: 'Bot info', id: `${effectivePrefix}bot` },
        { title: 'ʙᴜᴛᴛᴏɴ', description: 'Button info', id: `${effectivePrefix}button` },
        { title: 'ᴄʀᴇᴅɪᴛs', description: 'Bot credits', id: `${effectivePrefix}credits` },
        { title: 'ᴅᴇʟ', description: 'Delete message', id: `${effectivePrefix}del` },
        { title: 'ᴅᴇᴠ', description: "Send developer's contact", id: `${effectivePrefix}dev` },
        { title: 'ғᴜʟʟᴍᴇɴᴜ', description: 'Show all commands', id: `${effectivePrefix}fullmenu` },
        { title: 'ɢᴀʏᴄʜᴇᴄᴋ', description: 'Gaycheck', id: `${effectivePrefix}gaycheck` },
        { title: 'ᴍᴇɴᴜ', description: 'Show menu', id: `${effectivePrefix}menu` },
        { title: 'ᴘᴀɪʀ', description: 'Pair info', id: `${effectivePrefix}pair` },
        { title: 'ᴘɪɴɢ', description: 'Check bot speed', id: `${effectivePrefix}ping` },
        { title: 'ᴘʀᴏғɪʟᴇ', description: 'View profile', id: `${effectivePrefix}profile` },
        { title: 'ᴘʀᴏғɪʟᴇɢᴄ', description: 'View profile GC', id: `${effectivePrefix}profilegc` },
        { title: 'ʀᴀɴᴅᴏᴍ-ᴀɴɪᴍᴇ', description: 'Get random anime', id: `${effectivePrefix}random-anime` },
        { title: 'ʀᴇᴛʀɪᴇᴠᴇ', description: 'Retrieve info', id: `${effectivePrefix}retrieve` },
        { title: 'sᴄʀɪᴘᴛ', description: 'Get script', id: `${effectivePrefix}script` },
        { title: 'ᴛᴇᴄʜɴᴇᴡs', description: 'Get tech news', id: `${effectivePrefix}technews` },
        { title: 'ᴛᴇᴍᴘᴘɪɴʙᴏx', description: 'Temp pinbox', id: `${effectivePrefix}temppinbox` },
        { title: 'ᴛᴇᴍᴘᴍᴀɪʟ', description: 'Temp mail', id: `${effectivePrefix}tempmail` },
        { title: 'ᴛᴇsᴛ', description: 'Test command', id: `${effectivePrefix}test` },
        { title: 'ᴜᴘᴛɪᴍᴇ', description: 'Check uptime', id: `${effectivePrefix}uptime` },
        { title: 'ᴠᴄғ', description: 'VCF info', id: `${effectivePrefix}vcf` },
        { title: 'ᴡᴇᴀᴛʜᴇʀ', description: 'Get weather', id: `${effectivePrefix}weather` },
                    ],
                    },
                    {
                     title: '⚙️sᴇᴛᴛɪɴɢs ᴄᴏᴍᴍᴅᴀs',
                      highlight_label: '🍥sᴇᴛᴛɪɴɢs',
                            rows: [
        { title: 'ᴀᴅᴅsᴜᴅᴏ', description: 'Add sudo', id: `${effectivePrefix}addsudo` },
        { title: 'ᴀɴᴛɪᴄᴀʟʟ', description: 'Anti call', id: `${effectivePrefix}anticall` },
        { title: 'ᴀɴᴛɪᴅᴇʟᴇᴛᴇ', description: 'Anti delete', id: `${effectivePrefix}antidelete` },
        { title: 'ᴀɴᴛɪᴅᴇᴍᴏᴛᴇ', description: 'Anti demote', id: `${effectivePrefix}antidemote` },
        { title: 'ᴀɴᴛɪғᴏʀᴇɪɢɴ', description: 'Anti foreign', id: `${effectivePrefix}antiforeign` },
        { title: 'ᴀɴᴛɪʟɪɴᴋ', description: 'Anti link', id: `${effectivePrefix}antilink` },
        { title: 'ᴀɴᴛɪᴘʀᴏᴍᴏᴛᴇ', description: 'Anti promote', id: `${effectivePrefix}antipromote` },
        { title: 'ᴀɴᴛɪᴛᴀɢ', description: 'Anti tag', id: `${effectivePrefix}antitag` },
        { title: 'ᴀᴜᴛᴏʙɪᴏ', description: 'Auto bio', id: `${effectivePrefix}autobio` },
        { title: 'ᴀᴜᴛᴏʟɪᴋᴇ', description: 'Auto like', id: `${effectivePrefix}autolike` },
        { title: 'ᴀᴜᴛᴏʀᴇᴀᴅ', description: 'Auto read', id: `${effectivePrefix}autoread` },
        { title: 'ᴀᴜᴛᴏᴠɪᴇᴡ', description: 'Auto view', id: `${effectivePrefix}autoview` },
        { title: 'ʙᴀɴ', description: 'Ban', id: `${effectivePrefix}ban` },
        { title: 'ʙᴀɴʟɪsᴛ', description: 'Ban list', id: `${effectivePrefix}banlist` },
        { title: 'ᴄʜᴀᴛʙᴏᴛᴘᴍ', description: 'Chatbot PM', id: `${effectivePrefix}chatbotpm` },
        { title: 'ᴄʜᴇᴄᴋsᴜᴅᴏ', description: 'Check sudo', id: `${effectivePrefix}checksudo` },
        { title: 'ᴅᴇʟsᴜᴅᴏ', description: 'Delete sudo', id: `${effectivePrefix}delsudo` },
        { title: 'ᴇᴠᴇɴᴛs', description: 'Events', id: `${effectivePrefix}events` },
        { title: 'ɢᴄᴘʀᴇsᴇɴᴄᴇ', description: 'GC presence', id: `${effectivePrefix}gcpresence` },
        { title: 'ɢᴄsᴇᴛᴛɪɴɢs', description: 'GC settings', id: `${effectivePrefix}gcsettings` },
        { title: 'ᴍᴏᴅᴇ', description: 'Mode', id: `${effectivePrefix}mode` },
        { title: 'ᴘʀᴇғɪx', description: 'Prefix', id: `${effectivePrefix}prefix` },
        { title: 'ᴘʀᴇsᴇɴᴄᴇ', description: 'Presence', id: `${effectivePrefix}presence` },
        { title: 'ʀᴇᴀᴄᴛɪᴏɴ', description: 'Reaction', id: `${effectivePrefix}reaction` },
        { title: 'sᴇᴛᴛɪɴɢs', description: 'Settings', id: `${effectivePrefix}settings` },
        { title: 'sᴛɪᴄᴋᴇʀᴡᴍ', description: 'Sticker WM', id: `${effectivePrefix}stickerwm` },
        { title: 'ᴜɴʙᴀɴ', description: 'Unban', id: `${effectivePrefix}unban` },
                    ],
                    },
                    {
                    title: '👤ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴅᴀs',
                      highlight_label: '🍥ᴏᴡɴᴇʀ',
                            rows: [
        { title: 'ᴀᴅᴅʙᴜᴛᴛᴏɴ', description: 'Add button', id: `${effectivePrefix}addbutton` },
        { title: 'ʙʟᴏᴄᴋ', description: 'Block', id: `${effectivePrefix}block` },
        { title: 'ʙᴏᴛɢᴄ', description: 'Bot GC', id: `${effectivePrefix}botgc` },
        { title: 'ʙʀᴏᴀᴅᴄᴀsᴛ', description: 'Broadcast', id: `${effectivePrefix}broadcast` },
        { title: 'ᴇᴠᴀʟ', description: 'Eval', id: `${effectivePrefix}eval` },
        { title: 'ғᴜʟʟᴘᴘ', description: 'Full PP', id: `${effectivePrefix}fullpp` },
        { title: 'ɢᴇᴛᴄᴍᴅ', description: 'Get command', id: `${effectivePrefix}getcmd` },
        { title: 'ᴊᴏɪɴɢᴄ', description: 'Join GC', id: `${effectivePrefix}joingc` },
        { title: 'ᴋɪʟʟ', description: 'Kill', id: `${effectivePrefix}kill` },
        { title: 'ᴋɪʟʟ2', description: 'Kill 2', id: `${effectivePrefix}kill2` },
        { title: 'ʟᴇᴀᴠᴇɢᴄ', description: 'Leave GC', id: `${effectivePrefix}leavegc` },
        { title: 'ᴏᴀᴅᴍɪɴ', description: 'O admin', id: `${effectivePrefix}oadmin` },
        { title: 'ᴘᴏᴡɴᴇʀ', description: 'P owner', id: `${effectivePrefix}powner` },
        { title: 'ᴘʀᴇғɪx', description: 'Prefix', id: `${effectivePrefix}prefix` },
        { title: 'sᴀᴠᴇ', description: 'Save', id: `${effectivePrefix}save` },
        { title: 'sʜᴇʟʟ', description: 'Shell', id: `${effectivePrefix}shell` },
        { title: 'ᴛᴀɢ', description: 'Tag', id: `${effectivePrefix}tag` },
        { title: 'ᴜɴʙʟᴏᴄᴋ', description: 'Unblock', id: `${effectivePrefix}unblock` },
                    ],
                    },
                    {
                    title: '🛸ʜᴇʀᴏᴋᴜ ᴄᴏᴍᴍᴅᴀs',
                      highlight_label: '🍥ʜᴇʀᴏᴋᴜ',
                            rows: [
        { title: 'ᴀʟʟᴠᴀʀ', description: 'All var', id: `${effectivePrefix}allvar` },
        { title: 'ɢᴇᴛᴠᴀʀ', description: 'Get var', id: `${effectivePrefix}getvar` },
        { title: 'sᴇᴛᴠᴀʀ', description: 'Set var', id: `${effectivePrefix}setvar` },
        { title: 'ᴜᴘᴅᴀᴛᴇ', description: 'Update', id: `${effectivePrefix}update` },
                    ],
                    },
                    {
                     title: '🪐ᴘʀɪᴠᴀᴄʏ ᴄᴏᴍᴍᴅᴀs',
                      highlight_label: '🍥ᴘʀɪᴠᴀᴄʏ',
                            rows: [
        { title: 'ɢʀᴏᴜᴘᴀᴅᴅ', description: 'Group add', id: `${effectivePrefix}groupadd` },
        { title: 'ʟᴀsᴛsᴇᴇɴ', description: 'Last seen', id: `${effectivePrefix}lastseen` },
        { title: 'ᴍʏᴘᴘ', description: 'My PP', id: `${effectivePrefix}mypp` },
        { title: 'ᴍʏsᴛᴀᴛᴜs', description: 'My status', id: `${effectivePrefix}mystatus` },
        { title: 'ᴏɴʟɪɴᴇ', description: 'Online', id: `${effectivePrefix}online` },
        { title: 'ᴘʀɪᴠᴀᴄʏ', description: 'Privacy', id: `${effectivePrefix}privacy` },
                    ],
                    },
                    {
                     title: '👥ɢʀᴏᴜᴘs',
                      highlight_label: '🍥ɢʀᴏᴜᴘs',
                      rows: [
        { title: 'ᴀᴅᴅ', description: 'Add', id: `${effectivePrefix}add` },
        { title: 'ᴀᴘᴘʀᴏᴠᴇ-ᴀʟʟ', description: 'Approve all', id: `${effectivePrefix}approve-all` },
        { title: 'ᴄʟᴏsᴇ', description: 'Close', id: `${effectivePrefix}close` },
        { title: 'ᴅᴇʟᴇᴛᴇ', description: 'Delete', id: `${effectivePrefix}delete` },
        { title: 'ᴅᴇᴍᴏᴛᴇ', description: 'Demote', id: `${effectivePrefix}demote` },
        { title: 'ғᴏʀᴇɪɢɴᴇʀs', description: 'Foreigners', id: `${effectivePrefix}foreigners` },
        { title: 'ɢʀᴏᴜᴘᴍᴇᴛᴀ', description: 'Group meta', id: `${effectivePrefix}groupmeta` },
        { title: 'ʜɪᴅᴇᴛᴀɢ', description: 'Hide tag', id: `${effectivePrefix}hidetag` },
        { title: 'ʟɪɴᴋ', description: 'Link', id: `${effectivePrefix}link` },
        { title: 'ᴏᴘᴇɴ', description: 'Open', id: `${effectivePrefix}open` },
        { title: 'ᴘʀᴏᴍᴏᴛᴇ', description: 'Promote', id: `${effectivePrefix}promote` },
        { title: 'ʀᴇᴊᴇᴄᴛ-ᴀʟʟ', description: 'Reject all', id: `${effectivePrefix}reject-all` },
        { title: 'ʀᴇᴍᴏᴠᴇ', description: 'Remove', id: `${effectivePrefix}remove` },
        { title: 'ʀᴇǫᴜᴇsᴛs', description: 'Requests', id: `${effectivePrefix}requests` },
        { title: 'ʀᴇᴠᴏᴋᴇ', description: 'Revoke', id: `${effectivePrefix}revoke` },
        { title: 'ᴛᴀɢᴀʟʟ', description: 'Tag all', id: `${effectivePrefix}tagall` },
                    ],
                    },
                    {
                     title: '🤖ᴀɪ ᴄᴏᴍᴍᴅᴀs',
                      highlight_label: '🍥ᴀɪ',
                      rows: [
        { title: 'ᴀɪᴄᴏᴅᴇ', description: 'AI code', id: `${effectivePrefix}aicode` },
        { title: 'ᴀɪsᴇᴀʀᴄʜ', description: 'AI search', id: `${effectivePrefix}aisearch` },
        { title: 'ᴄʜᴀᴛ', description: 'Chat', id: `${effectivePrefix}chat` },
        { title: 'ᴄᴏᴅᴇɢᴇɴ', description: 'Code gen', id: `${effectivePrefix}codegen` },
        { title: 'ᴅᴀʀᴋɢᴘᴛ', description: 'Dark GPT', id: `${effectivePrefix}darkgpt` },
        { title: 'ɢᴇᴍɪɴɪ', description: 'Gemini', id: `${effectivePrefix}gemini` },
        { title: 'ɢᴘᴛ', description: 'GPT', id: `${effectivePrefix}gpt` },
        { title: 'ɢᴘᴛ2', description: 'GPT 2', id: `${effectivePrefix}gpt2` },
        { title: 'ɢᴘᴛ3', description: 'GPT 3', id: `${effectivePrefix}gpt3` },
        { title: 'ɢᴘᴛ4', description: 'GPT 4', id: `${effectivePrefix}gpt4` },
        { title: 'ɢʀᴏǫ', description: 'Groq', id: `${effectivePrefix}groq` },
        { title: 'ɪᴍᴀɢɪɴᴇ', description: 'Imagine', id: `${effectivePrefix}imagine` },
        { title: 'ʀᴇᴍɪɴ', description: 'Remin', id: `${effectivePrefix}remin` },
        { title: 'ᴛʀᴀɴsᴄʀɪʙᴇ', description: 'Transcribe', id: `${effectivePrefix}transcribe` },
        { title: 'ᴠɪsɪᴏɴ', description: 'Vision', id: `${effectivePrefix}vision` },
        { title: 'ᴠɪsɪᴏɴ2', description: 'Vision 2', id: `${effectivePrefix}vision2` },
                     ],
                    },
                    {
                    title: '⏳ᴍᴇᴅɪᴀ ᴄᴏᴍᴍᴅᴀs',
                      highlight_label: '🍥ᴍᴇᴅɪᴀ',
                      rows: [
        { title: 'ᴀʟʟᴅʟ', description: 'All DL', id: `${effectivePrefix}alldl` },
        { title: 'ᴀᴘᴋ', description: 'APK', id: `${effectivePrefix}apk` },
        { title: 'ғʙᴅʟ', description: 'FB DL', id: `${effectivePrefix}fbdl` },
        { title: 'ɢɪᴛᴄʟᴏɴᴇ', description: 'Git clone', id: `${effectivePrefix}gitclone` },
        { title: 'ɪɢᴅʟ', description: 'IG DL', id: `${effectivePrefix}igdl` },
        { title: 'ᴍᴇᴅɪᴀғɪʀᴇ', description: 'Mediafire', id: `${effectivePrefix}mediafire` },
        { title: 'ᴘʟᴀʏ', description: 'Play', id: `${effectivePrefix}play` },
        { title: 'sʜᴀᴢᴀᴍ', description: 'Shazam', id: `${effectivePrefix}shazam` },
        { title: 'sᴘᴏᴛɪғʏ', description: 'Spotify', id: `${effectivePrefix}spotify` },
        { title: 'ᴛɪᴋᴀᴜᴅɪᴏ', description: 'Tik audio', id: `${effectivePrefix}tikaudio` },
        { title: 'ᴛɪᴋᴅʟ', description: 'Tik DL', id: `${effectivePrefix}tikdl` },
        { title: 'ᴛᴡᴛᴅʟ', description: 'Twt DL', id: `${effectivePrefix}twtdl` },
        { title: 'ᴜᴘʟᴏᴀᴅ', description: 'Upload', id: `${effectivePrefix}upload` },
        { title: 'ᴠɪᴅᴇᴏ', description: 'Video', id: `${effectivePrefix}video` },
        { title: 'ʏᴛ', description: 'YT', id: `${effectivePrefix}yt` },
        { title: 'ʏᴛᴍᴘ3', description: 'YT MP3', id: `${effectivePrefix}ytmp3` },
                      ],
                    },
                    {
                      title: '📇ᴇᴅɪᴛɪɴɢ ᴄᴏᴍᴍᴅᴀs',
                      highlight_label: '🍥ᴇᴅɪᴛɪɴɢ',
                      rows: [
        { title: 'ᴇᴍɪx', description: 'Emix', id: `${effectivePrefix}emix` },
        { title: 'ʜᴅ', description: 'HD', id: `${effectivePrefix}hd` },
        { title: 'ʜɪᴛʟᴇʀ', description: 'Hitler', id: `${effectivePrefix}hitler` },
        { title: 'ʟᴏɢᴏɢᴇɴ', description: 'Logogen', id: `${effectivePrefix}logogen` },
        { title: 'ɴᴇɢʀᴏ', description: 'Negro', id: `${effectivePrefix}negro` },
        { title: 'ʀᴇᴍᴏᴠᴇʙɢ', description: 'Remove BG', id: `${effectivePrefix}removebg` },
        { title: 'ʀɪᴘ', description: 'RIP', id: `${effectivePrefix}rip` },
        { title: 'sʜɪᴛ', description: 'Shit', id: `${effectivePrefix}shit` },
        { title: 'sᴛɪᴄᴋᴇʀ', description: 'Sticker', id: `${effectivePrefix}sticker` },
        { title: 'ᴛᴀᴋᴇ', description: 'Take', id: `${effectivePrefix}take` },
        { title: 'ᴛᴏɪᴍ', description: 'Toim', id: `${effectivePrefix}toim` },
        { title: 'ᴛʀᴀsʜ', description: 'Trash', id: `${effectivePrefix}trash` },
        { title: 'ᴛʀɪɢɢᴇʀ', description: 'Trigger', id: `${effectivePrefix}trigger` },
        { title: 'ᴛᴛs', description: 'TTS', id: `${effectivePrefix}tts` },
        { title: 'ᴡᴀɴᴛᴇᴅ', description: 'Wanted', id: `${effectivePrefix}wanted` },
        { title: 'ᴡᴀsᴛᴇᴅ', description: 'Wasted', id: `${effectivePrefix}wasted` },
                      ],
                    },
                    {
                      title: '🎨ʟᴏɢᴏ ᴄᴏᴍᴍᴅᴀs',
                      highlight_label: '🍥ʟᴏɢᴏ',
                      rows: [
        { title: 'ᴀᴅᴠᴀɴᴄᴇᴅɢʟᴏᴡ', description: 'Advanced Glow', id: `${effectivePrefix}advancedglow` },
        { title: 'ʙʟᴀᴄᴋᴘɪɴᴋ', description: 'Blackpink', id: `${effectivePrefix}blackpink` },
        { title: 'ᴇғғᴇᴄᴛᴄʟᴏᴜᴅ', description: 'Effect Cloud', id: `${effectivePrefix}effectcloud` },
        { title: 'ɢᴀʟᴀxʏsᴛʏʟᴇ', description: 'Galaxy Style', id: `${effectivePrefix}galaxystyle` },
        { title: 'ɢʟɪᴛᴄʜᴛᴇxᴛ', description: 'Glitch Text', id: `${effectivePrefix}glitchtext` },
        { title: 'ɢʟᴏssʏssɪʟᴠᴇʀ', description: 'Glossy Silver', id: `${effectivePrefix}glossysilver` },
        { title: 'ʟɪɢʜᴛᴇғғᴇᴄᴛ', description: 'Light Effect', id: `${effectivePrefix}lighteffect` },
        { title: 'sᴀɴᴅsᴜᴍᴍᴇʀ', description: 'Sand Summer', id: `${effectivePrefix}sandsummer` },
        { title: 'ᴜɴᴅᴇʀᴡᴀᴛᴇʀ', description: 'Underwater', id: `${effectivePrefix}underwater` },
        { title: 'ᴡʀɪᴛᴇᴛᴇxᴛ', description: 'Write Text', id: `${effectivePrefix}writetext` },
                    ],
                    },
                    {
                      title: '📡ᴜᴛɪʟs ᴄᴏᴍᴍᴅᴀs',
                      highlight_label: '🍥ᴜᴛɪʟs',
                      rows: [
        { title: 'ʙᴜɴᴅʟᴇsʟɪɢᴀ', description: 'Bundle Liga', id: `${effectivePrefix}bundlesliga` },
        { title: 'ᴄᴀᴛғᴀᴄᴛ', description: 'Catfact', id: `${effectivePrefix}catfact` },
        { title: 'ᴇᴘʟ', description: 'EPL', id: `${effectivePrefix}epl` },
        { title: 'ғᴀᴄᴛ', description: 'Fact', id: `${effectivePrefix}fact` },
        { title: 'ɢɪᴛʜᴜʙ', description: 'GitHub', id: `${effectivePrefix}github` },
        { title: 'ɪɴsᴘᴇᴄᴛᴡᴇʙ', description: 'Inspect Web', id: `${effectivePrefix}inspectweb` },
        { title: 'ʟᴀʟɪɢᴀ', description: 'La Liga', id: `${effectivePrefix}laliga` },
        { title: 'ʟᴇᴀɢᴜᴇ1', description: 'League 1', id: `${effectivePrefix}league1` },
        { title: 'ᴍᴀᴛᴄʜᴇs', description: 'Matches', id: `${effectivePrefix}matches` },
        { title: 'sᴄʀᴇᴇɴsʜᴏᴛ', description: 'Screenshot', id: `${effectivePrefix}screenshot` },
        { title: 'sᴇʀɪᴇ-ᴀ', description: 'Serie A', id: `${effectivePrefix}serie-a` },
        { title: 'ᴛɪɴʏᴜʀʟ', description: 'Tiny URL', id: `${effectivePrefix}tinyurl` },
        { title: 'ᴡᴀ-ᴄʜᴀɴɴᴇʟ', description: 'WA Channel', id: `${effectivePrefix}wa-channel` },
                     ],
                    },
                  ],
                }),
              },
            ],
            messageParamsJson: JSON.stringify({
              limited_time_offer: {
                text: 'Njabulo-Jb',
                url: 'https://njabulo-repo.vercel.app',
                copy_code: 'NjabuloJb',
                expiration_time: Date.now() * 1000,
              },
              bottom_sheet: {
                in_thread_buttons_limit: 2,
                divider_indices: [1, 2],
                list_title: 'Select Command',
                button_title: 'Njabulo-Jb',
              },
            }),
          },
          contextInfo: {
            externalAdReply: {
              title: "Njabulo Jb",
              body: `Yo, ${m.pushName}! Ready to fuck shit up?`,
              mediaType: 1,
              thumbnail: pict,
              mediaUrl: '',
              sourceUrl: 'https://github.com/NjabuloJ/Njabulo-Jb',
              showAdAttribution: false,
              renderLargerThumbnail: true,
            },
          },
        },
      },
      { quoted: m }
    );

    await client.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    // Audio message logic
    const possibleAudioPaths = [
      path.join(__dirname, 'xh_clinton', 'menu.mp3'),
      path.join(process.cwd(), 'xh_clinton', 'menu.mp3'),
      path.join(__dirname, '..', 'xh_clinton', 'menu.mp3'),
    ];

    let audioPath = null;
    for (const possiblePath of possibleAudioPaths) {
      if (fs.existsSync(possiblePath)) {
        audioPath = possiblePath;
        break;
      }
    }

    if (audioPath) {
      await client.sendMessage(
        m.chat,
          {
          audio: { url: audioPath },
          ptt: true,
          mimetype: 'audio/mpeg',
          fileName: 'menu.mp3',
        },
        { quoted: m }
      );
    }
  },
};
