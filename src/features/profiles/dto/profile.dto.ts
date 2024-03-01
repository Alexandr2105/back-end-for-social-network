import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: 'boolean' })
  lookingForAJob: boolean;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(0, 500)
  @ApiProperty({ type: 'string' })
  lookingForAJobDescription: string;
  @IsOptional()
  @ApiProperty({ type: 'string' })
  avatar: string;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(0, 100)
  @ApiProperty({ type: 'string' })
  country: string;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(0, 100)
  @ApiProperty({ type: 'string' })
  city: string;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(0, 100)
  @ApiProperty({ type: 'string' })
  status: string;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(0, 500)
  @ApiProperty({ type: 'string' })
  aboutMe: string;
}
