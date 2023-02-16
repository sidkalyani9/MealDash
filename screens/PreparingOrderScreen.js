import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
import * as Animatable from 'react-native-animatable';
import { useFonts } from 'expo-font';

const PreparingOrderScreen = () => {

    const StyledView = styled(View)
    const StyledSafeAreaView = styled(SafeAreaView)
    const StyledText = styled(Text)
    
    const [fontsLoaded] = useFonts({
      'EpilogueB': require('../assets/fonts/Epilogue-Bold.ttf'),
      'EpilogueR': require('../assets/fonts/Epilogue-Regular.ttf'),
      'EpilogueM': require('../assets/fonts/Epilogue-Medium.ttf'),
    });

    if (!fontsLoaded) {
      return null;
    }

    return (
        <StyledSafeAreaView className='bg-[#FFFFFF] flex-1 justify-center items-center'>
            <Animatable.Image 
              source={require('../assets/preparing2.gif')}
              animation="slideInUp"
              iterationCount={1}
              className='w-[120%] h-[46%]'
            />

            <Animatable.Text 
              animation="slideInUp"
              className='text-base text-center'
              style={{ fontFamily: 'EpilogueB'}}
            >
              Waiting for Restaurant to accept your Order 🕓
            </Animatable.Text>
        </StyledSafeAreaView>
  )
}

export default PreparingOrderScreen