import { View, Text, SafeAreaView, TouchableOpacity, Image, BackHandler } from 'react-native'
import { styled } from 'nativewind'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { XCircleIcon } from 'react-native-heroicons/mini'
import { useFonts } from 'expo-font';
import * as Progress from 'react-native-progress';
import MapView, { MapMarker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps'
import { useEffect } from 'react'
import { setSearch } from '../features/searchSlice';

const DeliveryScreen = () => {
    const StyledView = styled(View)
    const StyledSafeAreaView = styled(SafeAreaView)
    const StyledText = styled(Text)
    const StyledTouchableOpacity = styled(TouchableOpacity)
    const StyledImage = styled(Image)

    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant)
    const dispatch = useDispatch()

    function handleBackButtonClick() {
        navigation.navigate("Home")
        dispatch(setSearch(""))
        return true;
      }

    const [fontsLoaded] = useFonts({
        'EpilogueB': require('../assets/fonts/Epilogue-Bold.ttf'),
        'EpilogueXB': require('../assets/fonts/Epilogue-ExtraBold.ttf'),
        'EpilogueR': require('../assets/fonts/Epilogue-Regular.ttf'),
        'EpilogueM': require('../assets/fonts/Epilogue-Medium.ttf'),
      });

      useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
      }, []);
    
      if (!fontsLoaded) {
        return null;
      }

  return (
    <StyledView className='bg-[#FE3448] flex-1'>
        <StyledSafeAreaView className='z-50'>
            <StyledView className='flex-row justify-between items-center p-5'>
                <StyledTouchableOpacity onPress={handleBackButtonClick}>
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
            initialRegion={{
                latitude: restaurant.lat,
                longitude: restaurant.long,
                latitudeDelta:0.005,
                longitudeDelta:0.01,
            }}
            mapType="standard"
            className="flex-1 -mt-10 z-0"
            provider= {PROVIDER_GOOGLE}
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
                style={{width: 250}}
            />
        </MapView>
    </StyledView>
  )
}

export default DeliveryScreen