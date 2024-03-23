import multer, { StorageEngine, Multer, Options } from 'multer';

export default class FileService {
    private storage: StorageEngine
    private upload: Multer

    constructor(path: string, limits?: Options["limits"]) {
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "/public/" + path);
            },
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                cb(null, file.fieldname + '-' + uniqueSuffix);
            }
        })
        this.upload = multer({ storage: this.storage, limits: limits })
    }

    getUpload(): Multer {
        return this.upload;
    }
}