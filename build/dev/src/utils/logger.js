"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
}
Logger.log = (obj) => {
    console.log(new Date().toUTCString(), "|", obj);
};
Logger.error = (obj) => {
    console.error(new Date().toUTCString(), "|", obj);
};
exports.default = Logger;
//# sourceMappingURL=logger.js.map