import { BankAccount } from '../../bank-accounts/entities/bank-account.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PixKeyKind } from '../enum/pix-key-kind.enum';

@Entity({ name: 'pix_keys' })
export class PixKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  kind: PixKeyKind;
  @Column({ unique: true })
  key: string;
  @Column({ name: 'bank_account_id' })
  bankAccountId: string;
  @ManyToOne(() => BankAccount)
  @JoinColumn({ name: 'bank_account_id' })
  bankAccount: BankAccount;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}
