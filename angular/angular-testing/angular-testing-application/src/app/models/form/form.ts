export interface FormOptions {
  children: Array<FormChildren>;
}

export interface Options {
  label: string;
  paramName: string;
}

export interface FormChildren {
  type: string;
  minLength?: number;
  maxLength?: number;
  required: boolean;
  label: string;
  paramName: string;
  value?: string;
  options?: Array<Options>;
}
