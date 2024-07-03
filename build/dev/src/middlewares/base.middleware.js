"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseMiddleware {
    constructor() {
        this.baseMiddleware = (req, res, next) => {
            next();
        };
    }
}
exports.default = BaseMiddleware;
//# sourceMappingURL=base.middleware.js.map