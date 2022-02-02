import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Services from './views/Services';
import Cart from './views/Cart';
import { colors } from './variables';

const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: colors.purple,
          tabBarInactiveTintColor: colors.gray,
          tabBarActiveBackgroundColor: colors.purple,
          tabBarInactiveBackgroundColor: colors.orange,
          tabBarStyle: {
            height: 70,
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            lineHeight: 21,
            width: '100%',
            flex: 1,
            marginTop: 3,
            paddingTop: 21,
            backgroundColor: colors.orange,
          },
          tabBarIconStyle: { display: 'none' },
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen name="Serviços" component={Services} />
        <Tab.Screen name="Carrinho" component={Cart} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
