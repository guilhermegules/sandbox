import { PixKeyKind } from '../enum/pix-key-kind.enum';

export class CreatePixKeyDto {
  key: string;
  kind: PixKeyKind;
}
