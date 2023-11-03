import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { TransactionStatus } from '../types/transaction-status.type';

export class ConfirmTransactionDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  status: TransactionStatus;
}
