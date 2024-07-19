import Helpers from 'src/utils/helpers';
import BaseController from '../../base/base.controller';
import path from 'path';

export default class ImagesController extends BaseController {
    getImageByFilename = (filename: string) => {
        return Helpers.findFileInDir(path.join(process.cwd(), './src/database/local/images/'), filename);
    }
}