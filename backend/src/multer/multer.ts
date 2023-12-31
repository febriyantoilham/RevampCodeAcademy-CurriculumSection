import { Injectable } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class UploadMulter {
  static MulterOption(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          const filename = file.originalname;
          return callback(null, filename);
        },
      }),
      fileFilter(req, file, callback) {
        if (file.mimetype.match(/\/(jpg|jpeg|png|mp4|avi|mov)$/)) {
          callback(null, true);
        } else {
          return callback(
            new Error(
              'Only .png, .jpg, .jpeg, .mp4, .avi, and .mov formats allowed',
            ),
            false,
          );
        }
      },
      limits: { fileSize: 100 * 1024 * 1024 },
    };
  }
}
