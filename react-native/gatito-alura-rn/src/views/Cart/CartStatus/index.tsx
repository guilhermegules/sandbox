import { FC } from 'react';
import { Text, View } from 'react-native';
import OpacityButton from '../../../components/OpacityButton';

import { currencyFormatter } from '../../../utils/NumberFormatter';
import style from './style';

interface CartStatusProps {
  total: number;
}

const CartStatus: FC<CartStatusProps> = ({ total }) => {
  return (
    <View style={style.content}>
      <View style={style.total}>
        <Text style={style.description}>Total do carrinho:</Text>
        <Text style={style.value}>{currencyFormatter.format(total)}</Text>
      </View>
      <View style={style.button}>
        <OpacityButton label="Concluir pedido" inverted action={() => {}} />
      </View>
    </View>
  );
};

export default CartStatus;
