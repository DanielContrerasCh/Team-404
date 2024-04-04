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
exports.getDataSource = void 0;
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
function getDataSource() {
    return __awaiter(this, void 0, void 0, function* () {
        const appDataSource = new typeorm_1.DataSource({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "zebranalytics",
            entities: [
                path_1.default.join(__dirname, "../models/**.js")
            ],
            synchronize: true
        });
        try {
            yield appDataSource.initialize();
            console.log("DB initialized");
            return appDataSource;
        }
        catch (err) {
            console.error("DB initialization failed");
            console.error(err);
        }
    });
}
exports.getDataSource = getDataSource;