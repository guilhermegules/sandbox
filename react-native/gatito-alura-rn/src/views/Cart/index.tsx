import { FC } from 'react';
import { FlatList } from 'react-native';

import Item from './Item';
import { IService } from '../Services/models/service.model';
import StandardView from '../../components/StandardView';
import CartStatus from './CartStatus';

const services: Array<IService> = [
  {
    id: 1,
    name: 'Banho',
    price: 79.9,
    description: 'Não dê banho no seu gat0! Mas se precisar, nos damos!',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Vacina v4',
    price: 89.9,
    description: 'Uma dose da vacina V4',
    quantity: 1,
  },
  {
    id: 3,
    name: 'Vacina antirrábica',
    price: 99.9,
    description: 'Uma dose da vacina antirrábica, seu gato precisa de uma por ano!',
    quantity: 1,
  },
];

const Cart: FC = () => {
  const total = services.reduce(
    (accumulator, { price, quantity }) => accumulator + price * quantity,
    0,
  );

  return (
    <StandardView>
      <CartStatus total={total} />
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <Item {...item} quantity={item.quantity ?? 0} title={item.name} />
        )}
        keyExtractor={({ id }) => String(id)}
        removeClippedSubviews={false}
      />
    </StandardView>
  );
};

export default Cart;
