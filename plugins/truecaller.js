/* Copyright (C) 2022 Sourav KL11.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Raganork MD - Sourav KL11
*/
const {Module} = require('../main');
const s = require('../config');
const wk = s.MODE == 'public' ? false : true
Module({pattern: 'true ?(.*)', desc: 'Searches for number in truecaller!',use: 'search',fromMe: wk}, async (msg, query) => {
let user =  query[1];
if (!user) return await msg.sendReply('_Need number, .true 91xxxxxxxxxx_');
if (user.includes(" ")) return await msg.sendReply("_No space allowed in between numbers!_")
if (!user) return await msg.reply("_Need number/reply/mention_");
const trueCaller = async (num) => {try { var res = await find(num,'',msg.client.user.id) } catch { var res = false }; return res;}
for (let i = 0; i < 6; i++){
    var _result = await trueCaller(user.replace( /^\D| +/g, ''))
    if (i === 5 || _result === false) {
        return await msg.sendReply("_Error, try again!_")
    } else return await msg.sendReply(_result)
}
});
Module({pattern: 'getjids ?(.*)', desc: 'Get all groups\' jids',use: 'utility',fromMe: true}, async (msg, query) => {
    var groups = Object.keys(await msg.client.groupFetchAllParticipating())
    if (!groups.length) return await msg.sendReply("_No group chats!_");
    var _msg = "";
    for (let e of groups){
        try {
    var g_name = (await msg.client.groupMetadata(e)).subject
    } catch {var g_name = 'Can\'t load name (rate-overlimit)'}
    _msg+= `_Group:_ ${g_name} \n_JID:_ ${e}\n\n`
    }
    await msg.sendMessage(_msg)
});
