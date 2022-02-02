import { FC, useState } from 'react';
import { Text, View } from 'react-native';

import IntegerInput from '../../../components/IntegerInput';
import OpacityButton from '../../../components/OpacityButton';
import { currencyFormatter } from '../../../utils/NumberFormatter';

import style from './style';

interface ItemProps {
  title: string;
  price: number;
  description: string;
  quantity: number;
}

const Item: FC<ItemProps> = ({ title, price, description, quantity: initialQuantity }) => {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(price * initialQuantity);

  const updateQuantity = (quantity: number) => {
    setQuantity(quantity);
    totalCalculation(quantity);
  };

  const totalCalculation = (quantity: number) => {
    setTotal(quantity * price);
  };

  return (
    <>
      <View style={style.information}>
        <Text style={style.title}>{title}</Text>
        <Text style={style.description}>{description}</Text>
        <Text style={style.price}>{currencyFormatter.format(price)}</Text>
      </View>
      <View style={style.cart}>
        <View>
          <View style={style.value}>
            <Text style={style.description}>Quantidade:</Text>
            <IntegerInput
              customStyles={style.quantity}
              value={quantity}
              onInputChange={updateQuantity}
            />
          </View>
          <View style={style.value}>
            <Text style={style.description}>Total:</Text>
            <Text style={style.price}>{currencyFormatter.format(total)}</Text>
          </View>
        </View>

        <OpacityButton title="Remover do carrinho" action={() => {}} />
      </View>
      <View style={style.divider} />
    </>
  );
};

export default Item;
