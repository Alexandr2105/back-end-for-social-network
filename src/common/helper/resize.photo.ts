// import sharp from 'sharp';

const sharp = require('sharp');

export function resizePhoto(photo: any): Promise<Buffer> {
  const buffer = Buffer.from(photo);
  return sharp(buffer)
    .resize(600, 600, {
      fit: 'contain',
    })
    .toBuffer();
}
