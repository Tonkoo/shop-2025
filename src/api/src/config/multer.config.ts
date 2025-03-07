import { diskStorage } from 'multer';
import { extname } from 'path';

const getMulterOptions = (type: string) => {
  return {
    storage: diskStorage({
      destination: `./../images/${type}`,
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  };
};

export { getMulterOptions };
