import { Formatter } from './../interfaces/Formatter';

export class Invoice implements Formatter {
  constructor(
    private client: string,
    private details: string,
    private amount: number
  ) {}

  format(): string {
    return `${this.client} owes £${this.amount} for ${this.details}`;
  }
}