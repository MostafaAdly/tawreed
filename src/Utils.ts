// ========================================================= [ Libraries ]
import colors from "colors";
import df from 'date-and-time';
import { v4 as uuid } from 'uuid'
// ========================================================= [ Global ]
export default class Global {
    private utils: any = {};

    public static id_suffix: string = "";

    public static productId_prefix = "PID" + this.id_suffix;
    public static userId_prefix = "UID" + this.id_suffix;
    public static entityId_prefix = "EID" + this.id_suffix;
    public static entityCategoryId_prefix = "ECID" + this.id_suffix;
    public static departmentId_prefix = "DID" + this.id_suffix;
    public static roleId_prefix = "RID" + this.id_suffix;
    public static personaId_prefix = "PSID" + this.id_suffix;
    public static commentId_prefix = "CID" + this.id_suffix;
    public static requestId_prefix = "RID" + this.id_suffix;
    public static paymentId_prefix = "PYID" + this.id_suffix;

    constructor(data: any) {
        data.utils = this.utils;
    }
    public initialize() {
        this.utils.print = (msg: any, name = "Global") =>
            console.log(
                `${name
                    ? this.countSpaces("", 3) +
                    colors.cyan("[" + name + "]") +
                    this.countSpaces(name, 10)
                    : ""
                }${df.format(new Date(), 'ddd hh:mm:ss A')} - ${msg}`
            );
        this.utils.line = (name: string) =>
            this.utils.print(
                `--------- ${colors.red(name)} ---------`,
                name
            );
        this.utils.error = (msg: string, name: any) =>
            this.utils.print(colors.red(msg), name);
        this.utils.createId = (removeSplits: boolean = false, repeat: number = 1) => {
            let id = "";
            for (let i = 0; i < repeat; i++) id += uuid().replace("-", removeSplits ? "" : "-")
            return id;
        }
    }
    private countSpaces(word = "", amount = 0) {
        let whiteSpaces = "";
        for (let i = 0; i < Math.abs(amount - word.length); i++)
            whiteSpaces += " ";
        return whiteSpaces;
    }
    public static createId = () => uuid().split("-")[0];
    public static createToken = () => uuid().replaceAll("-", "");
}
