import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePixKeyDto } from './dto/create-pix-key.dto';
import { Repository } from 'typeorm';
import { PixKey } from './entities/pix-key.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BankAccount } from 'src/bank-accounts/entities/bank-account.entity';
import { ClientGrpc } from '@nestjs/microservices';
import {
  FindPixKeyOptions,
  PixKeyClientGrpc,
  RegisterPixKeyRpcResponse,
} from './pix-keys-grpc.model';
import { PixKeyGrpcGenericError } from './pix-key-grpc-generic-error';
import { lastValueFrom } from 'rxjs';
import { PixKeyAlreadyExistsError } from './pix-key-already-exists-error';
import { PixKeyKind } from './enum/pix-key-kind.enum';
import { PIX_PACKAGE } from './constant/pix-package.constant';

@Injectable()
export class PixKeysService implements OnModuleInit {
  private pixGrpcService: PixKeyClientGrpc;

  constructor(
    @InjectRepository(PixKey) private pixKeyRepository: Repository<PixKey>,
    @InjectRepository(BankAccount)
    private bankAccountRepository: Repository<BankAccount>,
    @Inject(PIX_PACKAGE)
    private pixGrpcPackage: ClientGrpc,
  ) {}

  onModuleInit() {
    this.pixGrpcService = this.pixGrpcPackage.getService('PixService');
  }

  async create(bankAccountId: string, createPixKeyDto: CreatePixKeyDto) {
    await this.bankAccountRepository.findOneOrFail({
      where: { id: bankAccountId },
    });

    const remotePixKey = await this.findRemotePixKey(createPixKeyDto);

    if (remotePixKey) {
      return this.createIfNotExists(bankAccountId, remotePixKey);
    }

    const createRemotePixKey = await lastValueFrom(
      this.pixGrpcService.registerPixKey({
        ...createPixKeyDto,
        accountId: bankAccountId,
      }),
    );

    return this.pixKeyRepository.save({
      id: createRemotePixKey.id,
      bankAccountId,
      ...createPixKeyDto,
    });
  }

  findAll(bankAccountId: string) {
    return this.pixKeyRepository.find({
      where: { bankAccountId },
      order: { createdAt: 'DESC' },
    });
  }

  private async createIfNotExists(
    bankAccountId: string,
    remotePixKey: RegisterPixKeyRpcResponse,
  ) {
    const hasLocalPixKey = await this.pixKeyRepository.exist({
      where: { key: remotePixKey.key },
    });

    if (hasLocalPixKey) {
      throw new PixKeyAlreadyExistsError('Pix key already exists');
    }

    return this.pixKeyRepository.save({
      bankAccountId,
      key: remotePixKey.key,
      kind: remotePixKey.kind as PixKeyKind,
      id: remotePixKey.id,
    });
  }

  private async findRemotePixKey(
    data: FindPixKeyOptions,
  ): Promise<RegisterPixKeyRpcResponse | null> {
    try {
      return await lastValueFrom(this.pixGrpcService.find(data));
    } catch (e) {
      console.error(e);

      if (e.details === 'no key was found') {
        return null;
      }

      throw new PixKeyGrpcGenericError('Grpc internal error');
    }
  }
}
