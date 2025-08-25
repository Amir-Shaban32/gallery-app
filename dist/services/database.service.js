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
const mongoose_1 = __importDefault(require("mongoose"));
class DatabaseService {
    constructor() {
        this.DATABASE_URI = process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/gallery";
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new DatabaseService();
        return this.instance;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.db)
                return this.db;
            this.db = yield mongoose_1.default.connect(this.DATABASE_URI);
            return this.db;
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db)
                return;
            yield this.db.disconnect();
            this.db = undefined;
        });
    }
}
exports.default = DatabaseService.getInstance();
