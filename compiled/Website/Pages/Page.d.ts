export default class Page {
    base_url: string;
    subdomain: string;
    router: any;
    constructor(base_url: string);
    constructor(base_url: string, subdomain: string);
}
