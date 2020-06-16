"use strict";
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
        while (_) try {
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
var storage_1 = require("@google-cloud/storage");
var pubsub_1 = require("@google-cloud/pubsub");
var GcfCommon = /** @class */ (function () {
    function GcfCommon() {
    }
    GcfCommon.publish = function (event, context, data) {
        return __awaiter(this, void 0, void 0, function () {
            var topic;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTopic(event, context)];
                    case 1:
                        topic = _a.sent();
                        console.log('publish:', topic.name, data);
                        return [4 /*yield*/, topic.publishJSON(data)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GcfCommon.getTopic = function (event, context) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var pubSub, topicName, storage, file, meta, tpc;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        pubSub = new pubsub_1.PubSub();
                        if (!(((_a = context === null || context === void 0 ? void 0 : context.resource) === null || _a === void 0 ? void 0 : _a.type) === 'storage#object')) return [3 /*break*/, 2];
                        storage = new storage_1.Storage();
                        file = storage.bucket(event.bucket).file(event.name);
                        return [4 /*yield*/, file.getMetadata()];
                    case 1:
                        meta = (_c.sent())[0];
                        topicName = (_b = meta === null || meta === void 0 ? void 0 : meta.metadata) === null || _b === void 0 ? void 0 : _b.topic;
                        console.log('topic:', topicName);
                        _c.label = 2;
                    case 2:
                        tpc = pubSub.topic(topicName);
                        return [4 /*yield*/, tpc.setMetadata({ labels: { date: topicName.split('__')[1] } })];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, tpc];
                }
            });
        });
    };
    GcfCommon.delay = function (s) {
        if (s === void 0) { s = 540; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            reject(new Error(s + " seconds timeout exceeded"));
                        }, s * 1000);
                    })];
            });
        });
    };
    return GcfCommon;
}());
exports.GcfCommon = GcfCommon;
