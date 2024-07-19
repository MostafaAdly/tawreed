import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import Logger from './logger';
export default class Helpers {
    static findFileInDir = (dirPath: string, fileName: string): string | null => {
        const filesAndDirs = fs.readdirSync(dirPath);
        for (const fileOrDir of filesAndDirs) {
            const fullPath = path.join(dirPath, fileOrDir);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                const result = this.findFileInDir(fullPath, fileName);
                if (result) return result;
            } else if (stat.isFile() && fileOrDir === fileName) {
                return fullPath;
            }
        }
        return null;
    }

    static searchFilesWithFunction = (directory: string, functionName: string): string[] => {
        const filesWithFunction: string[] = [];
        const files = fs.readdirSync(directory);
        for (const file of files) {
            const filePath = path.join(directory, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                const nestedFiles = this.searchFilesWithFunction(filePath, functionName);
                filesWithFunction.push(...nestedFiles);
            } else if (stats.isFile()) {
                try {
                    if (Object.keys(new ((require(filePath)).default)()).includes(functionName)) filesWithFunction.push(filePath);
                } catch (error) {
                    Logger.error(`Error loading file ${filePath}: ${error}`);
                }
            }
        }
        return filesWithFunction;
    }

    static getAPIVersion = () => `/api/v${process.env.API_VERSION || 1}`;

    static hash = async (password: string, salt?: number) => {
        return await bcrypt.hash(password, salt || 10);
    }

    static isEnvProduction = () => process.env.ENVIRONMENT === 'production';

    static combinePaths = (...paths: string[]) => {
        return path.join(...paths).replaceAll("\\", "/")
    };

    static random = (num: number) => Math.floor(Math.random() * num);
    static randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
    static fakePhoneNumber = () => Helpers.randomBetween(100000000, 999999999);

    static generateId = (split: boolean = false) => {
        const uuid = randomUUID();
        return split ? uuid.split('-')[0] : uuid;
    }

    static toInt = (str: string, def: number) => {
        if (!str) return def;
        const num = parseInt(str);
        return isNaN(num) ? def : num;
    }
}