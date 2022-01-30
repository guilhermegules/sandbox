import { FC } from 'react';
import { TextInput } from 'react-native';

import style from './style';

interface IntegerInputProps {
  value: string | number;
  onInputChange: (value: number) => void;
  customStyles?: Record<string, any>;
}

const IntegerInput: FC<IntegerInputProps> = ({ value, onInputChange, customStyles }) => {
  const update = (newValue: string) => {
    if (isNaN(Number(newValue))) return;

    const removeLeftZeros = newValue.replace(new RegExp('/*(0)(.+)/'), '$2');

    onInputChange(Number(removeLeftZeros));
  };

  return (
    <TextInput
      keyboardType="number-pad"
      style={[style.field, customStyles]}
      value={String(value)}
      onChangeText={update}
      selectTextOnFocus
    />
  );
};

export default IntegerInput;
