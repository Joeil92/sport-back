import multer, { StorageEngine, Multer, Options } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { FileType } from '../shared/types/fileType.interface';

export default class FileService {
    private storage: StorageEngine
    private upload: Multer
    private acceptedType: FileType[]

    constructor(endpoint: string, acceptedType: FileType[], limits?: Options["limits"]) {
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
        this.upload = multer({ storage: this.storage, limits: limits, fileFilter: this.fileFilter })
        this.acceptedType = acceptedType;
    }

    public getUpload(): Multer {
        return this.upload;
    }

    private fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        console.log(this.acceptedType, file.mimetype);
        try {
            if(!this.acceptedType.includes(file.mimetype as FileType)) {
                throw new Error('This format is not accepted. Please choose a valid one.')   
            }
            
            cb(null, true);
        } catch (error: any) {
            cb(error);
        }
    }
}