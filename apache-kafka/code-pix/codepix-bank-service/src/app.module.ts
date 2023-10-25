import { Module } from '@nestjs/common';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from './bank-accounts/entities/bank-account.entity';
import { PixKeysModule } from './pix-keys/pix-keys.module';
import { PixKey } from './pix-keys/entities/pix-key.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConsoleModule } from 'nestjs-console';
import { Transaction } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', `.bank-${process.env.BANK_CODE}.env`],
      isGlobal: true,
    }),
    ConsoleModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: configService.get('TYPEORM_CONNECTION') as any,
        host: configService.get('TYPEORM_HOST'),
        port: parseInt(configService.get('TYPEORM_PORT')),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE') as string,
        entities: [BankAccount, PixKey, Transaction],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    BankAccountsModule,
    PixKeysModule,
    TransactionsModule,
  ],
})
export class AppModule {}
