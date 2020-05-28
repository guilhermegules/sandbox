import { Formatter } from './../interfaces/Formatter';

export class Payment implements Formatter {
  constructor(
    private recipient: string,
    private details: string,
    private amount: number
  ) {}

  format(): string {
    return `${this.recipient} is owes £${this.amount} for ${this.details}`;
  }
}