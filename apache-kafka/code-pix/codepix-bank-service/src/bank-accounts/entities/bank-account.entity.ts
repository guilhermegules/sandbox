import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'bank_accounts' })
export class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'account_number' })
  accountNumber: string;
  @Column({ name: 'owner_name' })
  ownerName: string;
  @Column({ default: 0 })
  balance: number;
  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createdAt: Date;
}
