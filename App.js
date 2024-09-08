import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaLogin from './screens/TelaLogin';
import TelaPrincipal from './screens/TelaPrincipal';
import { FavoritosProvider } from './FavoritosContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <FavoritosProvider>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={TelaLogin} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={TelaPrincipal} />
        </Stack.Navigator>
      </FavoritosProvider>
    </NavigationContainer>
  );
};
