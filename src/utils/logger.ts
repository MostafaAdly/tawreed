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

    static LogOutput = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            Logger.log({ call: `Calling ${propertyKey} with arguments:`, args });

            const result = originalMethod.apply(this, args);

            Logger.log({ call: `Result from ${propertyKey}:`, result });
            return result;
        };

        return descriptor;
    }
}