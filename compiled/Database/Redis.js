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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
class Redis {
    constructor(data) {
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, redis_1.createClient)()
                .on('error', err => console.log('Redis Client Error', err))
                .connect();
            yield client.set('key', 'value');
            const value = yield client.get('key');
            yield client.disconnect();
        });
        this.data = data;
    }
}
exports.default = Redis;
