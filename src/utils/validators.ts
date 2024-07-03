import minimist from 'minimist';
export default class Validators {
    private static commandArguments = minimist(process.argv.slice(2));
    static validateCommandArgument = (cmd: string, value: string | boolean) => {
        return this.commandArguments[cmd] == value;
    }
}