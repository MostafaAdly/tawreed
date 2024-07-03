import { Request, Response } from "express";
import ImagesController from "./images.controller";

export default class LoginHandler extends ImagesController {
    getImage = {
        'GET': (req: Request, res: Response) => {
            const { filename } = req.params;
            const imagePath = this.getImageByFilename(filename);
            return imagePath ? res.status(200).sendFile(imagePath) : res.status(404).send('Image not found');
        }
    }
}