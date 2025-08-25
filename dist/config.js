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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_service_1 = __importDefault(require("./services/database.service"));
class Config {
    constructor() {
        this.PORT = Number(process.env.PORT) || 3000;
        this.app = (0, express_1.default)();
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new Config();
        return this.instance;
    }
    listenAsync() {
        return new Promise((resolve, reject) => {
            try {
                this.app.listen(this.PORT, () => resolve(this.app));
            }
            catch (err) {
                reject(err);
            }
        });
    }
    runApp() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.listenAsync();
                console.log(`Working on http://localhost:${this.PORT}`);
                yield database_service_1.default.connect();
                console.log("Database is connected");
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
exports.default = Config.getInstance();
