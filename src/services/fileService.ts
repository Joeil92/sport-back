import multer, { StorageEngine, Multer, Options } from 'multer';
import path from 'path';
import fs from 'fs';

export default class FileService {
    private storage: StorageEngine
    private upload: Multer

    constructor(endpoint: string, limits?: Options["limits"]) {
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
                const destination = path.join(__dirname, '..', process.env.FILE_PATH + endpoint);

                if (!fs.existsSync(destination)) {
                    fs.mkdirSync(destination, { recursive: true });
                }

                cb(null, destination);
            },
            filename: function (req, file, cb) {
                const format = file.originalname.split('.')[1];
                const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9);
                cb(null, file.fieldname + '-' + uniqueSuffix + '.' + format);
            }
        })
        this.upload = multer({ storage: this.storage, limits: limits })
    }

    getUpload(): Multer {
        return this.upload;
    }
}