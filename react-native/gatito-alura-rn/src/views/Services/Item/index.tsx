import { FC, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import IntegerInput from '../../../components/IntegerInput';
import OpacityButton from '../../../components/OpacityButton';
import { currencyFormatter } from '../../../utils/NumberFormatter';

import style from './style';

interface ItemProps {
  title: string;
  price: number;
  description: string;
}

const Item: FC<ItemProps> = ({ title, price, description }) => {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(price);
  const [expand, setExpand] = useState(false);

  const updateQuantity = (quantity: number) => {
    setQuantity(quantity);
    totalCalculation(quantity);
  };

  const totalCalculation = (quantity: number) => {
    setTotal(quantity * price);
  };

  const showInformation = () => {
    setExpand(!expand);
    updateQuantity(1);
  };

  return (
    <>
      <TouchableOpacity style={style.information} onPress={showInformation}>
        <Text style={style.title}>{title}</Text>
        <Text style={style.description}>{description}</Text>
        <Text style={style.price}>{currencyFormatter.format(price)}</Text>
      </TouchableOpacity>
      {expand && (
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

          <OpacityButton title="Adicionar ao carrinho" action={() => {}} />
        </View>
      )}
      <View style={style.divider} />
    </>
  );
};

export default Item;
