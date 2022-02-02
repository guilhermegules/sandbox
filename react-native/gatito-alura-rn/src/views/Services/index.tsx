import { FC } from 'react';
import { FlatList } from 'react-native';
import ListItem from '../../components/ListItem';

import { IService } from './models/service.model';

const services: Array<IService> = [
  {
    id: 1,
    name: 'Banho',
    price: 79.9,
    description: 'Não dê banho no seu gato! Mas se precisar, nos damos!',
    quantity: 0,
  },
  {
    id: 2,
    name: 'Vacina v4',
    price: 89.9,
    description: 'Uma dose da vacina V4',
    quantity: 0,
  },
  {
    id: 3,
    name: 'Vacina antirrábica',
    price: 99.9,
    description: 'Uma dose da vacina antirrábica, seu gato precisa de uma por ano!',
    quantity: 0,
  },
];

const Services: FC = () => {
  return (
    <>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <ListItem
            {...item}
            hasExpansion={true}
            buttonLabel="Adicionar ao carrinho"
            title={item.name}
          />
        )}
        keyExtractor={({ id }) => String(id)}
        removeClippedSubviews={false}
      />
    </>
  );
};

export default Services;
