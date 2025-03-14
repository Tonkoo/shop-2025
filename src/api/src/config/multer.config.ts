import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync } from 'fs';

const getMulterOptions = (type: string) => {
  const uploadDir = `./images/${type}`;
  return {
    storage: diskStorage({
      destination: uploadDir,
      filename: (req, file, callback) => {
        const ext = extname(file.originalname);
        const originalFileName = file.originalname;
        if (existsSync(join(uploadDir, originalFileName))) {
          callback(null, originalFileName);
        } else {
          const fileName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
          callback(null, fileName);
        }
      },
    }),
  };
};

export { getMulterOptions };
