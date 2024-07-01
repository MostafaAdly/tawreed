export default class Logger {
    static log = (obj: any) => {
        console.log(new Date().toUTCString(), "|", obj);
    }
    static error = (obj: any) => {
        console.error(new Date().toUTCString(), "|", obj);
    }
}