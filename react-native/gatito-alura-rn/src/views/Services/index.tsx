import { FC } from 'react';
import { SafeAreaView, StatusBar, FlatList } from 'react-native';
import Item from './Item';

import { IService } from './models/service.model';

const services: Array<IService> = [
  {
    id: 1,
    name: 'Banho',
    price: 79.9,
    description: 'Não dê banho no seu gat0! Mas se precisar, nos damos!',
  },
  {
    id: 2,
    name: 'Vacina v4',
    price: 89.9,
    description: 'Uma dose da vacina V4',
  },
  {
    id: 3,
    name: 'Vacina antirrábica',
    price: 99.9,
    description: 'Uma dose da vacina antirrábica, seu gato precisa de uma por ano!',
  },
];

const Services: FC = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <FlatList
        data={services}
        renderItem={({ item }) => <Item {...item} title={item.name} />}
        keyExtractor={({ id }) => String(id)}
        removeClippedSubviews={false}
      />
    </SafeAreaView>
  );
};

export default Services;
