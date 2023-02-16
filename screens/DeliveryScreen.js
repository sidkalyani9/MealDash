import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { styled } from 'nativewind'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { XCircleIcon } from 'react-native-heroicons/mini'
import { useFonts } from 'expo-font';
import * as Progress from 'react-native-progress';
import MapView, { MapMarker } from 'react-native-maps';
import { useState } from 'react'
import { useEffect } from 'react'

const DeliveryScreen = () => {
    const StyledView = styled(View)
    const StyledSafeAreaView = styled(SafeAreaView)
    const StyledText = styled(Text)
    const StyledTouchableOpacity = styled(TouchableOpacity)
    const StyledImage = styled(Image)

    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant)

    const [fontsLoaded] = useFonts({
        'EpilogueB': require('../assets/fonts/Epilogue-Bold.ttf'),
        'EpilogueXB': require('../assets/fonts/Epilogue-ExtraBold.ttf'),
        'EpilogueR': require('../assets/fonts/Epilogue-Regular.ttf'),
        'EpilogueM': require('../assets/fonts/Epilogue-Medium.ttf'),
      });
    
      if (!fontsLoaded) {
        return null;
      }

  return (
    <StyledView className='bg-[#FE3448] flex-1'>
        <StyledSafeAreaView className='z-50'>
            <StyledView className='flex-row justify-between items-center p-5'>
                <StyledTouchableOpacity onPress={() => navigation.navigate("Home")}>
                <XCircleIcon height={40} width={40} color="white"/>
                </StyledTouchableOpacity>

                <StyledText style={{ fontFamily: 'EpilogueR'}} className="text-white text-lg">
                    Order Help
                </StyledText>
            </StyledView>

            <StyledView className='bg-white mx-5 my-2 z-50 px-6 py-6 shadow-md rounded-xl'>
                <StyledView className='flex-row '>
                    <StyledView className='flex-1'>
                        <StyledText style={{ fontFamily: 'EpilogueR'}} className="text-[4vw] text-gray-400">
                            Estimated Arrival
                        </StyledText>
                        <StyledText style={{ fontFamily: 'EpilogueB'}} className="text-[7vw] mt-[4%] mb-7">
                            45-55 Minutes
                        </StyledText>
                        
                        
                    </StyledView>
                    <StyledImage 
                        source={
                            require('../assets/fonts/delivery.gif')
                        }
                        className="w-[24%] h-[40vw] -mt-12"
                    />
                </StyledView>
                <Progress.Bar size={30} color="#FE3448" indeterminate={true} />
                <StyledText className='mt-4'>
                            Your Order at {restaurant.title} is being prepared!
                </StyledText>
            </StyledView>
        </StyledSafeAreaView>

        <MapView
            region={{
                latitude: restaurant.lat,
                longitude: restaurant.long,
                latitudeDelta:0.005,
                longitudeDelta:0.01,
            }}
            mapType="mutedStandard"
            className="flex-1 -mt-10 z-0"
            minZoomLevel={0.01}
        >
            <MapMarker
                coordinate={{
                    latitude: restaurant.lat,
                    longitude: restaurant.long,
                }}
                title={restaurant.title}
                description={restaurant.short_description}
                identifier="origin"
                pinColor="#FE3448"
            />
        </MapView>
    </StyledView>
  )
}

export default DeliveryScreen