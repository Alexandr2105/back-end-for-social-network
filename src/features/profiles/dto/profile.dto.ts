import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProfileDto {
  @IsBoolean()
  @IsOptional()
  lookingForAJob: boolean;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(0, 500)
  lookingForAJobDescription: string;
  @IsOptional()
  avatar: string;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(0, 100)
  country: string;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(0, 100)
  city: string;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @Length(0, 100)
  status: string;
}
