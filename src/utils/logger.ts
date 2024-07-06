import colors from 'colors'
export default class Logger {
    static log = (obj: unknown) => {
        console.log(Logger.date(), "|", "[LOG]", "|", obj);
    }
    static error = (obj: unknown) => {
        console.error(Logger.date(), "|", colors.red('[ERROR]'), "|", colors.red(obj as string));
    }

    static warn = (obj: unknown) => {
        console.warn(Logger.date(), "|", colors.yellow('[WARN]'), "|", colors.yellow(obj as string));
    }

    static date = () => new Date().toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, '');
}