"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Helpers {
}
_a = Helpers;
Helpers.findFileInDir = (dirPath, fileName) => {
    const filesAndDirs = fs_1.default.readdirSync(dirPath);
    for (const fileOrDir of filesAndDirs) {
        const fullPath = path_1.default.join(dirPath, fileOrDir);
        const stat = fs_1.default.statSync(fullPath);
        if (stat.isDirectory()) {
            const result = _a.findFileInDir(fullPath, fileName);
            if (result)
                return result;
        }
        else if (stat.isFile() && fileOrDir === fileName) {
            return fullPath;
        }
    }
    return null;
};
exports.default = Helpers;
//# sourceMappingURL=helpers.js.map