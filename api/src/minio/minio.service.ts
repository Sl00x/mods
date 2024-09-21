import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as crypto from 'crypto';
import { MinioClient, MinioService } from 'nestjs-minio-client';

@Injectable()
export class MinioClientService {
  constructor(private readonly minio: MinioService) {}

  public get client(): MinioClient {
    return this.minio.client;
  }

  public async upload(
    file: Express.Multer.File,
    bucket: string,
    name?: string,
  ) {
    const temp_filename = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const filename = (name ?? hashedFileName) + ext;
    const fileBuffer = file.buffer;
    const success = await this.client
      .putObject(bucket, filename, fileBuffer)
      .then(() => true)
      .catch((error) => {
        console.error(error);
        return false;
      });

    if (!success) {
      throw new InternalServerErrorException('upload_failed');
    }

    return {
      name: filename,
      url: `${process.env.MINIO_PUBLIC_URL}/${bucket}/${filename}`,
    };
  }

  public async uploadMultiple(files: Express.Multer.File[], bucket: string) {
    const results = await Promise.all(
      files.map((file) => this.upload(file, bucket)),
    );
    return results;
  }

  public getPublicUrl(bucketName: string, name?: string): string | null {
    return name
      ? `${process.env.MINIO_PUBLIC_URL}/${bucketName}/${name}`
      : null;
  }

  public async generatePresignedUrl(
    bucket: string,
    filename: string,
    expirySeconds: number = 3600 * 2, // 2hours
  ): Promise<string> {
    try {
      const url = await this.client.presignedGetObject(
        bucket,
        filename,
        expirySeconds,
      );
      return url.replace('http://minio', 'http://localhost');
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('generate_presigned_url_failed');
    }
  }
}
