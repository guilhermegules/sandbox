import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { PixKeyKind } from '../../pix-keys/enum/pix-key-kind.enum';
import { TransactionStatus } from '../types/transaction-status.type';

export class CreateTransactionFromAnotherBankAccountDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  pixKeyTo: string;

  @IsString()
  @IsNotEmpty()
  pixKeyKindTo: PixKeyKind;

  @IsOptional()
  description: string | null;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @IsNotEmpty()
  amount: number;

  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @IsString()
  @IsNotEmpty()
  status: TransactionStatus;
}
