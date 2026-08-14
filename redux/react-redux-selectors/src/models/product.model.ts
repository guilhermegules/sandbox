export interface Product {
  id: number;
  name: string;
  color: string;
  price: number;
}

export interface ProductState {
  filters: ProductFilter;
  data: Product[];
}

export interface ProductFilter {
  price: {
    min: number;
    max: number;
  };
  colors: string[];
}

export interface ProductReducerAction {
  type: string;
  payload: {
    name: string;
    value: any;
  };
}
