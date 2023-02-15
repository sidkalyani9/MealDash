import { StatusBar } from 'expo-status-bar';
import { Image, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import { Provider } from 'react-redux'
import { store } from './store';
import BasketScreen from './screens/Basket/BasketScreen';
import FastImage from 'react-native-fast-image';
import { useState } from 'react';
import MainApp from './MainApp';


const Stack = createNativeStackNavigator();

export default function App() {

  const [done,isDone] = useState(false)

  return (
    <>
    {!done && <><Image
            style={{ width: "100%", height: "100%" }}
            // source={{
            //   uri: "https://www.linkpicture.com/q/Meal-Dash.gif", //give your url here
            //   priority: FastImage.priority.high
            // }}
            source={
              require('./assets/fonts/splash.gif')
            }
            onLoadStart={() => {
              setTimeout(
                () => {
                //navigate to another screen after some times
                isDone(true)
                },
                1500
              );
            }}
            
      />
      
      </>
    }
    <MainApp />
    </>
  );
} 