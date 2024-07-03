export default class BaseController {
}
export declare class ControllerConfig {
    handlers: Map<string, ControllerHandlerConfig>;
    constructor(handlers: Map<string, ControllerHandlerConfig>);
}
export declare class ControllerHandlerConfig {
    method: HttpMethod;
    function: Function;
    constructor(data: {
        method: HttpMethod;
        function: Function;
    });
}
export declare enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
