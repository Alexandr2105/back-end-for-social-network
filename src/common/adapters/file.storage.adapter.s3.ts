import { Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { settings } from '../helper/settings';

@Injectable()
export class FileStorageAdapterS3 {
  s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: settings.REGION,
      endpoint: settings.URL_AWS,
      credentials: {
        accessKeyId: settings.ACCESS_KEY,
        secretAccessKey: settings.SECRET_KEY,
      },
    });
  }

  async saveAvatar(userId: number, buffer: Buffer) {
    const key = `${userId}/avatars/${userId}/avatar.png`;

    const command = new PutObjectCommand({
      Key: key,
      Bucket: settings.BUCKET,
      Body: buffer,
      ContentType: 'image/png',
    });
    try {
      await this.s3Client.send(command);
      return {
        id: randomUUID(),
        key: key,
        createdAt: new Date(),
        bucket: settings.BUCKET,
      };
    } catch (err) {
      console.error(err);
    }
  }

  async saveImagesForPost(
    userId: string,
    buffer: Buffer,
    postId: string,
  ): Promise<any> {
    const randomName = randomUUID();
    const command = new PutObjectCommand({
      Bucket: settings.BUCKET,
      Key: `${userId}/posts/${postId}/${randomName}_post.png`,
      Body: buffer,
      ContentType: 'image/png',
    });
    try {
      await this.s3Client.send(command);
      return {
        id: randomUUID(),
        key: `${userId}/posts/${postId}/${randomName}_post.png`,
        postId: postId,
        createdAt: new Date(),
        bucket: settings.BUCKET,
      };
    } catch (err) {
      console.error(err);
    }
  }

  async deleteImage(bucket: string, key: string) {
    const command = new DeleteObjectCommand({ Bucket: bucket, Key: key });
    try {
      await this.s3Client.send(command);
    } catch (err) {
      console.error(err);
    }
  }

  async deletePostFolder(
    bucket: string,
    folderName: string,
    userId: string,
  ): Promise<boolean> {
    const objects = await this.s3Client.send(
      new ListObjectsCommand({
        Bucket: bucket,
        Prefix: `${userId}/posts/${folderName}`,
      }),
    );

    if (objects.Contents && objects.Contents.length > 0) {
      const objectsToDelete = objects.Contents.map((obj) => ({
        Key: obj.Key,
      }));
      await this.s3Client.send(
        new DeleteObjectsCommand({
          Bucket: bucket,
          Delete: { Objects: objectsToDelete },
        }),
      );
      return true;
    } else {
      return true;
      // console.log(`Папка "${folderName}" пустая или не существует.`);
    }
  }

  async deleteUserFolders(bucket: string, userId: string): Promise<boolean> {
    const objects = await this.s3Client.send(
      new ListObjectsCommand({
        Bucket: bucket,
        Prefix: userId,
      }),
    );

    if (objects.Contents && objects.Contents.length > 0) {
      const objectsToDelete = objects.Contents.map((obj) => ({
        Key: obj.Key,
      }));
      await this.s3Client.send(
        new DeleteObjectsCommand({
          Bucket: bucket,
          Delete: { Objects: objectsToDelete },
        }),
      );
      return true;
    } else {
      return true;
    }
  }
}
