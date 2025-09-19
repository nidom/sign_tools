// /*
// https://docs.nestjs.com/providers#services
// */

// import { Injectable } from '@nestjs/common';
// import { isEmpty } from 'class-validator';
// import { IsNumberString } from 'class-validator';
// import { RedisService } from 'src/general/redis';
// import { BOT } from '../general/bot';

// import { UtilsService } from 'src/actions/utils.service';
// import { CResult } from 'src/utils';
// import { LogService } from 'src/actions/log.service';

// // import { BotAgentAliService } from './bot_agent_ali.service';
// // import { BotAgentTXService } from './bot_agent_tx.service';
// // import { BotAgentAWSService } from './bot_agent_aws.service';
// // import { I18nService } from 'src/actions/i18n.service';

// const bot_token =  "8349995714:AAGHXd-zv5zAQO2OfhGVPiqbZvmMRrBm67A"
// @Injectable()
// export class BotAgentService {

//     async update(body, botEntity): Promise<any> {

//         // console.log(body)
//         let token = botEntity.token
//         const bot = BOT(token)
//         bot.on('message', async msg => {

//             let chat = msg.chat;
//             let text = msg.text;
//             //控制请求频率
//             // if (await this.utilsService.limit(`bot_${chat.id}`, 2)) {

//             //     return;
//             // }
//             if (text === '/start') {

//                 this.start(chat, bot);
//                 return
//             }
//             if (text === '/bind') {

//                 this.bindInfo(chat, bot);
//                 return
//             }

//             if (text === '购买阿里云账号' || text === '/buy_ali') {

//                 this.start_buy_aliyun(chat, bot);
//                 return
//             }

//             if (text === '购买腾讯云账号' || text === '/buy_tx') {

//                 this.start_buy_txyun(chat, bot);
//                 return
//             }
//             this.handleInput(chat, text, bot);
//         })

//         bot.on('webhook_error', (error) => {
//             console.log(error.code);  // => 'EPARSE'

//         });


//         bot.on('callback_query', async query => {

//             //控制请求频率

//             if (await this.utilsService.limit(`bot_${query.from.id}`, 2)) {

//                 return;
//             }
//             // const {message: {chat, message_id, text}= {}} = query
//             switch (query.data) {
//                 case 'bind_agent_data':
//                     this.bind_agent_data(query, bot)
//                     break
//                 case 'ali_1':
//                     this.ali_buy(query, bot, 1, botEntity)
//                     break
//                 case 'ali_2':
//                     this.ali_buy(query, bot, 2, botEntity)
//                     break
//                 case 'ali_3':
//                     this.ali_buy(query, bot, 3, botEntity)
//                     break

//                 case 'tx_1':
//                     this.buy_tx(query, bot, 1, botEntity)
//                     break
//                 case 'tx_2':
//                     this.buy_tx(query, bot, 2, botEntity)
//                     break
//                 case 'tx_3':
//                     this.buy_tx(query, bot, 3, botEntity)
//                     break

//                 case 'dis_bind':
//                     this.dis_bind(query, bot)
//                     break

//                 default:
//             }
//         })

//         bot.processUpdate(body);

//     }


//     //start
//     async start(chat, bot): Promise<any> {

//         let tg_id = chat.id;
//         let tg_username = chat.username;

//         await RedisService.share().del('needToBindAgent_' + chat.id)
//         let email = await this.botUtilsService.agentEmail(tg_id)
//         if (isEmpty(email)) {

//             email = ''
//         }

//         const string = admin_start_template(email)
//         let image = `https://cloud-dqn.pages.dev/bot_imgs/b_start.png`
//         await bot.sendPhoto(chat.id, image, {
//             caption: string,
//             "reply_markup": {
//                 "keyboard": [["购买阿里云账号", "购买腾讯云账号"]],
//                 resize_keyboard: true,


//             }
//         });


//         if (!isEmpty(email)) {

//             return
//         }

//         await this.show_bind_action(bot, chat.id)
//     }


//     async bindInfo(chat, bot): Promise<any> {

//         let tg_id = chat.id;
//         let tg_username = chat.username;

//         let email = await this.botUtilsService.agentEmail(tg_id)
//         if (isEmpty(email)) {

//             await this.show_bind_action(bot, tg_id)
//             return

//         }

//         let agent = await this.botUtilsService.agentInfo(email)

//         let inline_keyboard = [
//             [
//                 {
//                     text: '解除绑定',
//                     callback_data: 'dis_bind'
//                 }
//             ]];

//         let string = bind_info_template(email, agent.agent_balance, agent.ali_count, agent.tx_count)
//         let image = `https://cloud-dqn.pages.dev/bot_imgs/b_start.png`
//         await bot.sendPhoto(chat.id, image, {
//             caption: string,
//             reply_markup: { inline_keyboard }
//         });

//     }

//     //解除绑定
//     async dis_bind(query, bot): Promise<any> {

//         let email = await this.botUtilsService.agentEmail(query.from.id)
//         if (isEmpty(email)) {

//             await bot.sendMessage(query.from.id, '--您尚未绑定代理账户--');
//             return
//         }
//         await this.botUtilsService.disBindAgentEmail(query.from.id)
//         await bot.sendMessage(query.from.id, '✅解除绑定成功');

//     }

//     // 显示绑定代理账号按钮
//     async show_bind_action(bot, chat_id): Promise<any> {

//         let inline_keyboard = [
//             [
//                 {
//                     text: '👉点击绑定',
//                     callback_data: 'bind_agent_data'
//                 }
//             ]
//         ];
//         await bot.sendMessage(chat_id, '--您尚未绑定代理账户--', {
//             reply_markup: { inline_keyboard }
//         });
//     }

//     async bind_agent_data(query, bot): Promise<any> {

//         let email = await this.botUtilsService.agentEmail(query.from.id)
//         if (isEmpty(email)) {
//             bot.sendMessage(query.from.id, '请输入代理邮箱账号')
//             RedisService.share().set('needToBindAgent_' + query.from.id, '1')
//         } else {

//             bot.sendMessage(query.from.id, '已绑定:' + email)
//         }
//     }

//     async ali_buy(query, bot, count, botEntity): Promise<any> {

//         let email = await this.botUtilsService.agentEmail(query.from.id)
//         if (isEmpty(email)) {

//             await this.show_bind_action(bot, query.from.id)
//             return
//         }
//         const remain_count = await this.aliAccountRepoRepository.count({
//             where: {
  
//                 status: 'for_sale',
//                 type: 'TS'// 假设status 0表示未使用的账号
//             }
//         });
//         if (remain_count < count) {

//             bot.sendMessage(query.from.id, '❗️ 阿里云库存不足,下单失败')

//             // bot.sendMessage(-1002404316015, '❗️ 阿里云认证号库存不足')
//             return
//         }
//         let adminConfig = await this.utilsService.adminCofig()
//         let price = adminConfig.ali_ts_price
//         let amount = price * count
//         let newAmount = match_amount_generator(amount)
//         let orderID = order_id_generator()
//         let roleID = await this.botUtilsService.roleIDFromEmail(email)

//         let info = {

//             role_id: roleID,
//             amount: newAmount,
//             order_id: orderID,
//             c_code: 'ali',
//             count: count,
//             type: 'admin_account',
//             address: adminConfig.bot_usdt,
//             agent_email: email,
//             match_amount: newAmount,
//             tg_id: query.from.id,
//             bot_name: botEntity.bot_name,
//             platform:'bot'
//         }
//         // Save the new charge record
//         let result = await this.usdtOrderService.createBotAdminAccountOrder(info)
//         if (result.code < 0) {
//             return new CResult(-1, result.message, {});
//         }

//         let traceID = RedisKeyUSDTOrder(orderID)
//         await RedisService.share().set(traceID, info, 60 * 35)
//         const string = ali_ts_order_template(orderID, price, count, newAmount, adminConfig.bot_usdt, email)
//         await bot.sendPhoto(query.from.id, 'https://cloud-dqn.pages.dev/bot_imgs/ali_pay.png', {
//             caption: string,
//             parse_mode: 'HTML'

//         });

//         // await bot.sendMessage(query.from.id, adminConfig.usdt)
//         return

//     }

//     async buy_tx(query, bot, count, botEntity): Promise<any> {

//         let email = await this.botUtilsService.agentEmail(query.from.id)
//         if (isEmpty(email)) {

//             await this.show_bind_action(bot, query.from.id)
//             return
//         }
        
//     //   let remain = await this.botUtilsService.check_admin_account_repo('tx')

//         const remain_count = await this.txAccountRepoRepository.count({
//             where: {
  
//                 status: 'for_sale',
//                 type: 'TS'// 假设status 0表示未使用的账号
//             }
//         });




//         if (remain_count < count) {

//             bot.sendMessage(query.from.id, '❗️ 腾讯云库存不足,下单失败')
//             // //发送预警消息
//             // bot.sendMessage(-1002404316015, '❗️ 腾讯实名号库存不足')
//             return
//         }
        
//         let adminConfig = await this.utilsService.adminCofig()
//         let price = adminConfig.tx_ts_price
//         let amount = price * count
//         let newAmount = match_amount_generator(amount)
//         let orderID = order_id_generator()
//         let roleID = await this.botUtilsService.roleIDFromEmail(email)

//         let info = {

//             order_id: orderID,
//             role_id: roleID,
//             amount: newAmount,
//             match_amount: newAmount,
//             c_code: 'tx',
//             count: count,
//             type: 'admin_account',
//             platform:'bot',
//             agent_email: email,
//             address: adminConfig.bot_usdt,
//             bot_name: botEntity.bot_name,
//             tg_id: query.from.id
//         }

//         // Save the new charge record
//         let result = await this.usdtOrderService.createBotAdminAccountOrder(info)
//         if (result.code < 0) {
//             return new CResult(-1, result.message, {});
//         }

//         let traceID = RedisKeyUSDTOrder(orderID)
//         await RedisService.share().set(traceID, info, 60 * 35)
//         const string = tx_ts_order_template(orderID, price, count, newAmount, adminConfig.bot_usdt, email)
//         await bot.sendPhoto(query.from.id, 'https://cloud-dqn.pages.dev/bot_imgs/tx_pay.png', {
//             caption: string,
//             parse_mode: 'HTML'
//         });
//           // await bot.sendMessage(query.from.id, adminConfig.usdt)
//     }

//     async handleInput(chat, text, bot): Promise<any> {


//         let needToBindAgent = await RedisService.share().get('needToBindAgent_' + chat.id)
//         if (!needToBindAgent) {

//             return
//         }
//         // console.log(chat.text)
//         if (!isEmail(text)) {

//             bot.sendMessage(chat.id, '账号格式不正确,请输入正确的邮箱账号')
//             return
//         }

//         //处理绑定逻辑
//         let result = await this.botUtilsService.bindAgentEmail(chat.id, text, chat.username)
//         if (result.code == 0) {
//             bot.sendMessage(chat.id, '绑定成功!')
//             await RedisService.share().del('needToBindAgent_' + chat.id)
//         } else {
//             bot.sendMessage(chat.id, result.message)
//         }

//     }

//     async start_buy_aliyun(chat, bot): Promise<any> {

//         let email = await this.botUtilsService.agentEmail(chat.id)
//         if (isEmpty(email)) {

//             await this.show_bind_action(bot, chat.id)
//             return
//         }
//         let inline_keyboard = [
//             [
//                 {
//                     text: '1',
//                     callback_data: 'ali_1'
//                 },
//                 {
//                     text: '2',
//                     callback_data: 'ali_2'
//                 },
//                 {
//                     text: '3',
//                     callback_data: 'ali_3'
//                 }
//             ]

//         ];

//         await bot.sendPhoto(chat.id, 'https://cloud-dqn.pages.dev/bot_imgs/ali.png', {
//             caption: '请选择购买数量',
//             "reply_markup": { inline_keyboard }
//         })

//     }

//     async start_buy_txyun(chat, bot): Promise<any> {

//         let email = await this.botUtilsService.agentEmail(chat.id)
//         if (isEmpty(email)) {

//             await this.show_bind_action(bot, chat.id)
//             return
//         }
//         let inline_keyboard = [
//             [
//                 {
//                     text: '1',
//                     callback_data: 'tx_1'
//                 },
//                 {
//                     text: '2',
//                     callback_data: 'tx_2'
//                 },
//                 {
//                     text: '3',
//                     callback_data: 'tx_3'
//                 }
//             ]

//         ];

//         await bot.sendPhoto(chat.id, 'https://cloud-dqn.pages.dev/bot_imgs/tx.png', {
//             caption: '请选择购买数量',
//             "reply_markup": { inline_keyboard }
//         })

//     }







// }
