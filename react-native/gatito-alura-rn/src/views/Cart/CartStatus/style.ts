import { StyleSheet } from 'react-native';

import { colors } from '../../../variables';

export default StyleSheet.create({
  content: {
    backgroundColor: colors.purple,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 24,
    paddingTop: 30,
  },
  total: {
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.orange,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 6,
    color: colors.orange,
  },
  button: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
});
