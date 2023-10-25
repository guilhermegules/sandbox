import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { DataSource, Repository } from 'typeorm';
import { BankAccount } from 'src/bank-accounts/entities/bank-account.entity';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_SERVICE } from '../constant/kafka.constant';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
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
    });

    return transaction;
  }

  findAll(bankAccountId: string) {
    return this.transactionRepository.find({
      where: { bankAccountId },
      order: { createdAt: 'DESC' },
    });
  }
}
