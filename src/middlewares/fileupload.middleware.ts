import dayjs from 'dayjs';
import multer from 'multer';
import path from 'path';
import Helpers from 'src/utils/helpers';
export default class FileUploadMiddleware {
  _multer = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), './src/database/local/storage'));
      },
      filename: (req: any, file, cb) => {
        const fileType = file.mimetype.split("/")[file.mimetype.split("/").length - 1] ?? "png";
        cb(null, `${dayjs(new Date()).format(
          'YYYY-MM-DD_HH-mm-ss'
        )}__${Helpers.generateId(true)}.${fileType}`);
      }
    })
  });
  acceptFiles = this._multer.array('files', 12);
  acceptSingleFile = () => this._multer.single('file');
}