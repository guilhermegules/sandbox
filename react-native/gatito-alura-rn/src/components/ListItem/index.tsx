import { FC, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import IntegerInput from '../IntegerInput';
import OpacityButton from '../OpacityButton';
import { currencyFormatter } from '../../utils/NumberFormatter';
import style from './style';

interface ListItemProps {
  title: string;
  price: number;
  description: string;
  hasExpansion?: boolean;
  quantity?: number;
  buttonLabel: string;
}

const ListItem: FC<ListItemProps> = ({
  title,
  price,
  description,
  hasExpansion = false,
  quantity: initialQuantity,
  buttonLabel,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(initialQuantity ? price * initialQuantity : price);
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

  const cartItemTemplate = (
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

      <OpacityButton label={buttonLabel} action={() => {}} />
    </View>
  );

  return (
    <>
      <TouchableOpacity style={style.information} onPress={showInformation}>
        <Text style={style.title}>{title}</Text>
        <Text style={style.description}>{description}</Text>
        <Text style={style.price}>{currencyFormatter.format(price)}</Text>
      </TouchableOpacity>
      {hasExpansion ? expand && cartItemTemplate : cartItemTemplate}
      <View style={style.divider} />
    </>
  );
};

export default ListItem;
