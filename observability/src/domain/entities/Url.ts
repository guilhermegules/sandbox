export class Url {
  public readonly id: string;
  public readonly code: string;
  public readonly url: string;
  public readonly expiresAt: Date | null;
  public readonly clickCount: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(props: {
    id: string;
    code: string;
    url: string;
    expiresAt: Date | null;
    clickCount: number;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = props.id;
    this.code = props.code;
    this.url = props.url;
    this.expiresAt = props.expiresAt;
    this.clickCount = props.clickCount;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  isExpired(): boolean {
    if (!this.expiresAt) return false;
    return this.expiresAt <= new Date();
  }
}

export interface UrlCreateInput {
  code: string;
  url: string;
  expiresAt: Date | null;
}

export interface UrlUpdateInput {
  url?: string | null;
  expiresAt?: Date | null;
}

export interface ClickStats {
  clicksPerDay: Array<{ date: string; count: number }>;
  clicksPerHour: Array<{ hour: Date; count: number }>;
}
