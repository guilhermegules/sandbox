import { StyleSheet } from 'react-native';

import { colors } from '../../variables';

export default StyleSheet.create({
  safeAreaViewTop: {
    flex: 1,
    backgroundColor: colors.purple,
  },
  safeAreaViewBottom: {
    flex: 0,
    backgroundColor: colors.orange,
  },
});
