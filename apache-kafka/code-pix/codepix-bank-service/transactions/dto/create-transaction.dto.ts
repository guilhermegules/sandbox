import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { PixKeyKind } from '../../pix-keys/enum/pix-key-kind.enum';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  pixKeyKey: string;

  @IsIn(['cpf', 'email'])
  @IsString()
  @IsNotEmpty()
  pixKeyKind: PixKeyKind;

  @IsString()
  @IsOptional()
  description: string = null;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @IsNotEmpty()
  amount: number;
}
