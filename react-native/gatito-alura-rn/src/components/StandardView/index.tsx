import { StatusBar } from 'expo-status-bar';
import { FC } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';

import globalStyles from '../../GlobalStyles';

const StandardView: FC = ({ children }) => {
  return (
    <SafeAreaView style={globalStyles.fill}>
      <StatusBar />
      <KeyboardAvoidingView
        style={globalStyles.fill}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default StandardView;
