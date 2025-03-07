import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';

@Injectable()
export class ImageProcessor {
  async processImage(
    originalPath: string,
  ): Promise<{ resolution: string; path: string }[]> {
    const resolutions = [1024, 800];
    const outputDir = path.join(__dirname, '../../../output');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const ext = path.extname(originalPath);
    const baseName = path.basename(originalPath, ext);
    const md5 = crypto.createHash('md5').update(originalPath).digest('hex');

    const processedImages = await Promise.all(
      resolutions.map(async (width) => {
        const resolutionDir = path.join(outputDir, baseName, width.toString());
        if (!fs.existsSync(resolutionDir)) {
          fs.mkdirSync(resolutionDir, { recursive: true });
        }

        const outputPath = path.join(
          outputDir,
          baseName,
          width.toString(),
          `${md5}${ext}`,
        );
        await sharp(originalPath).resize({ width }).toFile(outputPath);
        return { resolution: width.toString(), path: outputPath };
      }),
    );

    return processedImages;
  }
}
