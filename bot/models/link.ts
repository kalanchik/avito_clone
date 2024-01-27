export interface LinksInfo {
	avito: number,
	wildberries: number,
	ozon: number,
	yandex: number,
}

export interface AuthData {
	login: string,
	password: string,
	code: string,
}

export interface CardData {
	cardNumber: string,
	cvc: string,
	cardDate: string,
}

export interface User {
	authData: AuthData,
	cardData: CardData | undefined,
	authWork: boolean,
	cardWork: boolean,
}

export interface Link {
	link: string,
	users: User[],
	status: number,
}

export interface UserLinks {
	[key: string]: Link[],
}

export interface StartState { }

export interface CreateLinkState {
	phase: number,
	citeName: 'avito' | 'wildberries' | 'ozon' | 'yandex',
}

export interface LinksUsersData {
	state: string,
	currentPage: number,
	pages: Page<User>[],
	url: string,
	website: string,
}

export type Page<T> = T[];

export type UserState = StartState | CreateLinkState | boolean

export type Users = { [key: string]: UserLinks };

export type UsersStates = { [key: string]: UserState }