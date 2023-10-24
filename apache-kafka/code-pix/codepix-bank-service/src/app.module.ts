import { Module } from '@nestjs/common';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from './bank-accounts/entities/bank-account.entity';
import { PixKeysModule } from './pix-keys/pix-keys.module';
import { PixKey } from './pix-keys/entities/pix-key.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'codepix-bank-service-db-1',
      database: 'codepix',
      username: 'postgres',
      password: 'root',
      synchronize: true,
      entities: [BankAccount, PixKey],
    }),
    BankAccountsModule,
    PixKeysModule,
  ],
})
export class AppModule {}
