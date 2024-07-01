import fs from 'fs';
import path from 'path';
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
}