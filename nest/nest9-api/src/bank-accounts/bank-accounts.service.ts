import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { BankAccount } from './entities/bank-account.entity';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BankAccountsService {
  constructor(
    @InjectRepository(BankAccount) private repository: Repository<BankAccount>,
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto) {
    const bankAccount = this.repository.create({
      accountNumber: createBankAccountDto.accountNumber,
      balance: 0,
    });

    await this.repository.insert(bankAccount);

    return bankAccount;
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async transfer(from: string, to: string, amount: number) {
    const fromAccount = await this.repository.findOneBy({
      accountNumber: from,
    });
    const toAccount = await this.repository.findOneBy({ accountNumber: to });

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    this.repository.save(fromAccount);
    this.repository.save(toAccount);
  }
}
