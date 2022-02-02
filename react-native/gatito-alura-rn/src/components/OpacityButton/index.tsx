import { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import style from './style';

interface OpacityButtonProps {
  label: string;
  action: () => void;
  small?: boolean;
  inverted?: boolean;
  customStyles?: Record<string, any>;
}

const OpacityButton: FC<OpacityButtonProps> = ({
  label,
  action,
  small = false,
  inverted = false,
  customStyles,
}) => {
  const standardStyle = style(small, inverted);

  return (
    <TouchableOpacity onPress={action} style={[standardStyle.button, customStyles]}>
      <Text style={standardStyle.value}>{label}</Text>
    </TouchableOpacity>
  );
};

export default OpacityButton;
