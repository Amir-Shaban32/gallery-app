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
const express_1 = require("express");
const photo_model_1 = require("../models/photo.model");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => cb(null, path_1.default.join(__dirname, "../assets/uploads")),
    filename: (req, file, cb) => cb(null, Date.now() + path_1.default.extname(file.originalname))
});
const upload = (0, multer_1.default)({ storage });
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photos = yield photo_model_1.Photo.find();
        /** @TODO Render Existing Photos in index.ejs */
        res.render('index', { photos });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
router.post('/', upload.single('image'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const path = `assets/uploads/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}`;
        const newImage = new photo_model_1.Photo({ path });
        yield newImage.save();
        res.redirect('/');
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
exports.default = router;
