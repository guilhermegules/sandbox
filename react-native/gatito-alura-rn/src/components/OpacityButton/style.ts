import { StyleSheet } from 'react-native';

import { colors } from '../../variables';

export default (small: boolean, inverted: boolean) =>
  StyleSheet.create({
    button: {
      width: 140,
      paddingVertical: small ? 3 : 9,
      paddingHorizontal: 20,
      backgroundColor: inverted ? colors.orange : colors.purple,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    value: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: inverted ? colors.purple : colors.orange,
    },
  });
