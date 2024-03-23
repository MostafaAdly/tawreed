"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
class GUI {
    constructor(data) {
        this._app = electron_1.app;
        this.data = data;
        this.data.gui = this;
    }
    createGUI() {
        if (electron_1.app == null)
            return;
        this.window = new electron_1.BrowserWindow({
            width: 1900,
            height: 1060,
            title: `Tawreed - ${process.env.VERSION}`,
            resizable: true,
            icon: "Frontend/Customer/Home/imgs/logo.png",
        });
        // this.window.loadFile(path.join(__dirname, "../../Frontend/test.html"));
        this.window.loadURL(`http://localhost:${process.env.SERVER_PORT}`);
        this.window.setMenu(null);
        // ================== (window | BrowserWindow) LISTENERs
        this.window.on('minimize', (event) => {
            event.preventDefault();
            this._app.hide();
        });
    }
    initialize() {
        if (electron_1.app == null)
            return;
        if (require("electron-squirrel-startup"))
            this._app.quit();
        this._app.whenReady().then(() => this.createGUI());
        this._app.commandLine.appendSwitch('ignore-certificate-errors');
    }
    listen() {
        if (electron_1.app == null)
            return;
        // ================== (app | app) LISTENERs
        this._app.on('ready', () => {
            this.buildTray();
        });
        this._app.on('window-all-closed', () => {
            if (process.platform !== 'darwin')
                this.closeGUI();
        });
        this._app.on('activate', () => {
            if (electron_1.BrowserWindow.getAllWindows().length === 0)
                this.createGUI();
        });
    }
    buildTray() {
        if (electron_1.app == null)
            return;
        const tray = new electron_1.Tray(path_1.default.join(__dirname, '../../Frontend/Customer/Home/imgs/logo.png'));
        const contextMenu = electron_1.Menu.buildFromTemplate([
            {
                label: "Exit", type: "normal", click: () => this.closeGUI()
            }
        ]);
        tray.setContextMenu(contextMenu);
        tray.setToolTip("Tawreed");
    }
    closeGUI() {
        this._app.quit();
    }
}
exports.default = GUI;
