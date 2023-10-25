import { BankAccount } from 'src/bank-accounts/entities/bank-account.entity';
import { PixKeyKind } from 'src/pix-keys/enum/pix-key-kind.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionOperation } from '../enum/transaction-operation.enum';
import { TransactionStatus } from '../enum/transaction-status.enum';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, type: 'uuid', name: 'related_transaction_id' })
  relatedTransactionId: string;

  @Column()
  amount: number;

  @Column()
  description: string;

  @ManyToOne(() => BankAccount)
  @JoinColumn({ name: 'bank_account_id' })
  bankAccount: BankAccount;

  @Column({ name: 'bank_account_id' })
  bankAccountId: string;

  @Column({ nullable: true, name: 'bank_account_from_id' })
  bankAccountFromId: string;

  @Column({ name: 'pix_key_key' })
  pixKeyKey: string;

  @Column({ name: 'pix_key_kind' })
  pixKeyKind: PixKeyKind;

  @Column()
  status: TransactionStatus = TransactionStatus.PENDING;

  @Column()
  operation: TransactionOperation;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
