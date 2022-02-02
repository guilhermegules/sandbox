import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';

import globalStyles from '../../GlobalStyles';
import { colors } from '../../variables';
import style from './style';

const StandardView: FC = ({ children }) => {
  return (
    <>
      <SafeAreaView style={style.safeAreaViewTop}>
        <StatusBar backgroundColor={colors.purple} />
        <KeyboardAvoidingView
          style={globalStyles.fill}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
      <SafeAreaView style={style.safeAreaViewBottom} />
    </>
  );
};

export default StandardView;
