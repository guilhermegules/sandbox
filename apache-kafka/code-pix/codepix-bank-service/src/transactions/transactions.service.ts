import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { DataSource, Repository } from 'typeorm';
import { BankAccount } from 'src/bank-accounts/entities/bank-account.entity';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_SERVICE } from '../constant/kafka.constant';
import { TransactionOperation } from './enum/transaction-operation.enum';
import { lastValueFrom } from 'rxjs';
import { TransactionStatus } from './enum/transaction-status.enum';
import { ConfirmTransactionDto } from './dto/confirm-transaction.dto';
import { PixKey } from 'src/pix-keys/entities/pix-key.entity';
import { CreateTransactionFromAnotherBankAccountDto } from './dto/create-transaction-from-another-bank-account.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @Inject(KAFKA_SERVICE)
    private kafkaService: ClientKafka,
    private dataSource: DataSource,
  ) {}

  async create(
    bankAccountId: string,
    createTransactionDto: CreateTransactionDto,
  ) {
    const transaction = await this.dataSource.transaction(async (manager) => {
      const bankAccount = await manager.findOneOrFail(BankAccount, {
        where: { id: bankAccountId },
        lock: { mode: 'pessimistic_write' },
      });

      const transaction = manager.create(Transaction, {
        ...createTransactionDto,
        amount: createTransactionDto.amount * -1,
        bankAccountId,
        operation: TransactionOperation.CREDIT,
      });

      await manager.save(transaction);

      bankAccount.balance += transaction.amount;
      await manager.save(bankAccount);
      return transaction;
    });

    const sendData = {
      id: transaction.id,
      accountId: bankAccountId,
      amount: createTransactionDto.amount,
      pixKeyTo: createTransactionDto.pixKeyKey,
      pixKeyKindTo: createTransactionDto.pixKeyKind,
      description: createTransactionDto.description,
    };

    await lastValueFrom(this.kafkaService.emit('transactions', sendData));

    return transaction;
  }

  findAll(bankAccountId: string) {
    return this.transactionRepository.find({
      where: { bankAccountId },
      order: { createdAt: 'DESC' },
    });
  }

  async createFromAnotherBankAccount(
    input: CreateTransactionFromAnotherBankAccountDto,
  ) {
    const transaction = await this.dataSource.transaction(async (manager) => {
      const pixKey = await manager.findOneOrFail(PixKey, {
        where: {
          key: input.pixKeyTo,
          kind: input.pixKeyKindTo,
        },
      });

      const bankAccount = await manager.findOneOrFail(BankAccount, {
        where: { id: pixKey.bankAccountId },
        lock: { mode: 'pessimistic_write' },
      });

      const transaction = await manager.create(Transaction, {
        relatedTransactionId: input.id,
        amount: input.amount,
        description: input.description,
        bankAccountId: bankAccount.id,
        bankAccountFromId: input.accountId,
        pixKeyKey: input.pixKeyTo,
        pixKeyKind: input.pixKeyKindTo,
        operation: TransactionOperation.CREDIT,
        status: TransactionStatus.COMPLETED,
      });

      await manager.save(transaction);

      bankAccount.balance += transaction.amount;
      await manager.save(bankAccount);
    });

    const sendData = {
      ...input,
      status: 'confirmed',
    };

    await lastValueFrom(
      this.kafkaService.emit('transaction_confirmation', sendData),
    );

    return transaction;
  }

  async confirmTransaction(input: ConfirmTransactionDto) {
    const transaction = await this.transactionRepository.findOneOrFail({
      where: {
        id: input.id,
      },
    });

    await this.transactionRepository.update(
      { id: input.id },
      {
        status: TransactionStatus.COMPLETED,
      },
    );

    const sendData = {
      id: input.id,
      accountId: transaction.bankAccountId,
      amount: Math.abs(transaction.amount),
      pixkeyto: transaction.pixKeyKey,
      pixKeyKindTo: transaction.pixKeyKind,
      description: transaction.description,
      status: TransactionStatus.COMPLETED,
    };

    await lastValueFrom(
      this.kafkaService.emit('transaction_confirmation', sendData),
    );

    return transaction;
  }
}
