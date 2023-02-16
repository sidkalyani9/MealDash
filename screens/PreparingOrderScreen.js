import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
import * as Animatable from 'react-native-animatable';
import { useFonts } from 'expo-font';
import * as Progress from 'react-native-progress';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { XCircleIcon } from 'react-native-heroicons/solid';

const PreparingOrderScreen = () => {

    const StyledView = styled(View)
    const StyledSafeAreaView = styled(SafeAreaView)
    const StyledText = styled(Text)
    const navigation = useNavigation();
    const StyledTouchableOpacity = styled(TouchableOpacity)
    
    const [fontsLoaded] = useFonts({
      'EpilogueB': require('../assets/fonts/Epilogue-Bold.ttf'),
      'EpilogueR': require('../assets/fonts/Epilogue-Regular.ttf'),
      'EpilogueM': require('../assets/fonts/Epilogue-Medium.ttf'),
    });

    useEffect(() => {
      setTimeout(()=> {
        navigation.navigate("DeliveryScreen");
      }, 4000);
    }, []);

    if (!fontsLoaded) {
      return null;
    }

    return (
        <StyledSafeAreaView className='bg-[#FFFFFF] flex-1 relative justify-center items-center'>
            <Animatable.Image 
              source={require('../assets/preparing2.gif')}
              animation="slideInUp"
              iterationCount={1}
              className='w-[120%] h-[46%]'
              // onLoadStart={() => {
              //   setTimeout(
              //     () => {
              //     //navigate to another screen after some times
              //       navigation.navigate("DeliveryScreen");
              //     },
              //     4000
              //   );
              // }}
            />

            <Animatable.Text 
              animation="slideInUp"
              className='text-base text-center mb-10'
              style={{ fontFamily: 'EpilogueB'}}
            >
              Waiting for Restaurant to accept your Order 🕓
            </Animatable.Text>

            <Progress.Circle size={60} indeterminate={true} color="#00CCBB"/>

            
            <StyledTouchableOpacity className='absolute top-10 right-3' onPress={() => navigation.navigate("DeliveryScreen")}>
              <XCircleIcon height={40} width={40} color="#FE3448"/>
            </StyledTouchableOpacity>
    
        </StyledSafeAreaView>
  )
}

export default PreparingOrderScreen