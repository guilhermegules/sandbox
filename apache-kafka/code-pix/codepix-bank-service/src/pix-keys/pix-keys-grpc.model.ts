import { Observable } from 'rxjs';

interface Account {
  accountId: string;
  accountNumber: string;
  bankId: string;
  bankName: string;
  ownerName: string;
  createdAt: string;
}

export interface RegisterPixKeyRpcResponse {
  id: string;
  kind: string;
  key: string;
  account: Account;
  createdAt: string;
}

export interface RegisterPixKeyOptions {
  kind: string;
  key: string;
  accountId: string;
}

export interface RegisterPixKeyResponse {
  id: string;
  status: string;
  error: string;
}

export interface FindPixKeyOptions {
  kind: string;
  key: string;
}

export interface PixKeyClientGrpc {
  registerPixKey: (
    data: RegisterPixKeyOptions,
  ) => Observable<RegisterPixKeyResponse>;
  find: (data: FindPixKeyOptions) => Observable<RegisterPixKeyRpcResponse>;
}
