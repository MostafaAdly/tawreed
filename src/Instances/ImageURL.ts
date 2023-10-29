
import defaultProfilePicture from '../DefaultData/defaultProfilePicture.json'
import path from 'path'

export default class ImageURL {
    private url?: string;
    constructor(file_destination: string | undefined) {
        this.url = file_destination ? path.relative(path.join(process.cwd(), "/views"), file_destination) : undefined;
    }

    public getURL() {
        return this.url ? (`${this.url}`).replace("\\", "/") : defaultProfilePicture.image;
    }
}