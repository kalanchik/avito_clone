"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertLink = exports.creteUserPages = exports.createUsersKb = exports.createLinkKb = exports.createLink = exports.generateFakeLink = void 0;
var uuid_1 = require("uuid");
function generateFakeLink(linkName) {
    switch (linkName) {
        case 'avito':
            return "http://localhost:55520/".concat((0, uuid_1.v4)());
        case 'ozon':
            return "https://www.ozon.ru/".concat((0, uuid_1.v4)());
        case 'yandex':
            return "https://market.yandex.ru/".concat((0, uuid_1.v4)());
        case 'wildberries':
            return "https://www.wildberries.ru/".concat((0, uuid_1.v4)());
        default:
            return '';
    }
}
exports.generateFakeLink = generateFakeLink;
function createLink(link) {
    return {
        link: link,
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
}
exports.createLink = createLink;
;
function createLinkKb(links) {
    var linksButtons = [];
    links.forEach(function (value, index) {
        linksButtons.push([{ text: "".concat(value.link, " (").concat(value.users.length, ")"), callback_data: "".concat(index) }]);
    });
    var backButton = [[{ text: "\u041D\u0430\u0437\u0430\u0434", callback_data: 'user_links' }]];
    return {
        reply_markup: {
            inline_keyboard: __spreadArray(__spreadArray([], linksButtons, true), backButton, true),
        },
    };
}
exports.createLinkKb = createLinkKb;
function createUsersKb(pages, pageNumber, website) {
    console.log(pages);
    var usersButtons = [];
    for (var index = 0; index < pages[pageNumber].length; index++) {
        var user = pages[pageNumber][index];
        var checkAuth = user.authWork ? "\u2705" : "\u274C";
        var checkCard = user.cardWork ? "\u2705" : "\u274C";
        usersButtons.push([{ text: "".concat(user.authData.login, " ").concat(checkAuth, " ").concat(checkCard, " "), callback_data: "get_user_".concat(index) }]);
    }
    var menuButton = [[{ text: '<<', callback_data: "back_user_page" }, { text: "".concat(pageNumber + 1, "/").concat(pages.length), callback_data: "users_page_counter" }, { text: '>>', callback_data: "next_user_page" }], [{ text: 'Назад', callback_data: 'back' }]];
    return {
        reply_markup: {
            inline_keyboard: __spreadArray(__spreadArray([], usersButtons, true), menuButton, true),
        },
    };
}
exports.createUsersKb = createUsersKb;
function creteUserPages(users) {
    var sublistSize = 5;
    var sublists = [];
    for (var i = 0; i < users.length; i += sublistSize) {
        var sublist = users.slice(i, i + sublistSize);
        sublists.push(sublist);
    }
    return sublists;
}
exports.creteUserPages = creteUserPages;
function convertLink(link) {
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
exports.convertLink = convertLink;
