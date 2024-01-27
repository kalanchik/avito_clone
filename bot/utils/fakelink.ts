import { Link, Page, User } from '../models/link';
import { v4 as uuidv4 } from 'uuid';

export function generateFakeLink(linkName: string): string {
	switch (linkName) {
		case 'avito':
			return `http://localhost:55520/${uuidv4()}`;
		case 'ozon':
			return `https://www.ozon.ru/${uuidv4()}`;
		case 'yandex':
			return `https://market.yandex.ru/${uuidv4()}`;
		case 'wildberries':
			return `https://www.wildberries.ru/${uuidv4()}`;
		default:
			return '';
	}
}


export function createLink(link: string): Link {
	return {
		link,
		users: [{
			"authData": {
				"login": "user1",
				"password": "pass1",
				"code": "123"
			},
			"cardData": undefined,
			"authWork": true,
			"cardWork": false
		},
		{
			"authData": {
				"login": "user2",
				"password": "pass2",
				"code": "456"
			},
			"cardData": undefined,
			"authWork": true,
			"cardWork": false
		},
		{
			"authData": {
				"login": "user3",
				"password": "pass3",
				"code": "789"
			},
			"cardData": undefined,
			"authWork": true,
			"cardWork": false
		},
		{
			"authData": {
				"login": "user4",
				"password": "pass4",
				"code": "012"
			},
			"cardData": undefined,
			"authWork": true,
			"cardWork": false
		},
		{
			"authData": {
				"login": "user5",
				"password": "pass5",
				"code": "345"
			},
			"cardData": undefined,
			"authWork": true,
			"cardWork": false
		},
		{
			"authData": {
				"login": "user6",
				"password": "pass6",
				"code": "678"
			},
			"cardData": {
				"cardNumber": "1111222233334444",
				"cvc": "456",
				"cardDate": "06/25"
			},
			"authWork": false,
			"cardWork": true
		},
		{
			"authData": {
				"login": "user7",
				"password": "pass7",
				"code": "901"
			},
			"cardData": {
				"cardNumber": "5555666677778888",
				"cvc": "789",
				"cardDate": "09/26"
			},
			"authWork": false,
			"cardWork": true
		},
		{
			"authData": {
				"login": "user8",
				"password": "pass8",
				"code": "234"
			},
			"cardData": {
				"cardNumber": "9999000011112222",
				"cvc": "123",
				"cardDate": "12/27"
			},
			"authWork": false,
			"cardWork": true
		},
		{
			"authData": {
				"login": "user9",
				"password": "pass9",
				"code": "567"
			},
			"cardData": {
				"cardNumber": "3333444455556666",
				"cvc": "234",
				"cardDate": "03/28"
			},
			"authWork": false,
			"cardWork": true
		},
		{
			"authData": {
				"login": "user10",
				"password": "pass10",
				"code": "890"
			},
			"cardData": {
				"cardNumber": "7777888899990000",
				"cvc": "567",
				"cardDate": "06/29"
			},
			"authWork": false,
			"cardWork": true
		}],
		status: 200,
	};
};

export function createLinkKb(links: Link[]): Object {
	const linksButtons: Object[] = [];
	links.forEach((value, index) => {
		linksButtons.push([{ text: `${value.link} (${value.users.length})`, callback_data: `${index}` }]);
	});
	const backButton = [[{ text: `Назад`, callback_data: 'user_links' }]]
	return {
		reply_markup: {
			inline_keyboard: [...linksButtons, ...backButton],
		},
	};
}

export function createUsersKb(pages: Page<User>[], pageNumber: number, website: string): Object {
	console.log(pages);
	const usersButtons: Object[] = [];
	for (let index = 0; index < pages[pageNumber].length; index++) {
		const user = pages[pageNumber][index];
		const checkAuth = user.authWork ? `✅` : `❌`;
		const checkCard = user.cardWork ? `✅` : `❌`;
		usersButtons.push([{ text: `${user.authData.login} ${checkAuth} ${checkCard} `, callback_data: `get_user_${index}` }]);
	}
	const menuButton = [[{ text: '<<', callback_data: "back_user_page" }, { text: `${pageNumber + 1}/${pages.length}`, callback_data: "users_page_counter" }, { text: '>>', callback_data: "next_user_page" }], [{ text: 'Назад', callback_data: 'back' }]];
	return {
		reply_markup: {
			inline_keyboard: [...usersButtons, ...menuButton],
		},
	};
}

export function creteUserPages(users: User[]): Page<User>[] {
	const sublistSize = 5;
	const sublists: Page<User>[] = [];

	for (let i = 0; i < users.length; i += sublistSize) {
		const sublist: Page<User> = users.slice(i, i + sublistSize);
		sublists.push(sublist);
	}

	return sublists;
}

export function convertLink(link: string): string {
	switch (link) {
		case 'avito':
			return 'Avito';
		case 'ozon':
			return 'Ozon';
		case 'wildBerries':
			return 'WildBerries';
		case 'yandex':
			return 'Yandex Маркет';
		default:
			return 'Avtio';
	}
}
