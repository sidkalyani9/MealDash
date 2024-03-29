import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import { Provider } from 'react-redux'
import { store } from './store';
import BasketScreen from './screens/Basket/BasketScreen';
import PreparingOrderScreen from './screens/PreparingOrderScreen';
import DeliveryScreen from './screens/DeliveryScreen';
import Dummy from './screens/Dummy';
import Login from './screens/Login';


const Stack = createNativeStackNavigator();

export default function MainApp({user}) {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator>
            {/* Screen */}
            <Stack.Screen name="login" component={Login} />
            
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />
            <Stack.Screen 
              name="Basket" 
              component={BasketScreen} 
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="Preparing" 
              component={PreparingOrderScreen} 
              options={
                {
                  presentation: "fullScreenModal", headerShown:false
                }
              }
            />
            <Stack.Screen 
              name="DeliveryScreen"
              component={DeliveryScreen}
              options={{
                presentation: "fullScreenModal",
                headerShown: false,
              }}
            />
            {/* <Stack.Screen name="Dummy" component={Dummy}  /> */}
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
} 