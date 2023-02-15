import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import { Provider } from 'react-redux'
import { store } from './store';
import BasketScreen from './screens/Basket/BasketScreen';


const Stack = createNativeStackNavigator();

export default function MainApp() {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator>
            {/* Screen */}
            <Stack.Screen name="Home" component={HomeScreen}  />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen 
              name="Basket" 
              component={BasketScreen} 
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
} 