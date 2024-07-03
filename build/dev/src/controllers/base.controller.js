"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpMethod = exports.ControllerHandlerConfig = exports.ControllerConfig = void 0;
class BaseController {
}
exports.default = BaseController;
class ControllerConfig {
    constructor(handlers) {
        this.handlers = new Map();
        this.handlers = handlers;
    }
}
exports.ControllerConfig = ControllerConfig;
class ControllerHandlerConfig {
    constructor(data) {
        this.method = HttpMethod.GET;
        this.function = (_, res) => { res.status(404).send('Not Found'); };
        Object.assign(this, data);
    }
}
exports.ControllerHandlerConfig = ControllerHandlerConfig;
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
})(HttpMethod || (exports.HttpMethod = HttpMethod = {}));
//# sourceMappingURL=base.controller.js.map