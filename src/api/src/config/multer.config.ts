import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

const UPLOAD_DIR = join(__dirname, '../../images/section'); // Папка, расположенная на уровень выше проекта

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const getMulterOptions = (type: string) => {
  return {
    storage: diskStorage({
      destination: UPLOAD_DIR,
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  };
};

export { getMulterOptions };
