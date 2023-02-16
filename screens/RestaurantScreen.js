import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { styled } from 'nativewind';
import { urlFor } from '../sanity';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DishRow from './DishRow';
import BasketIcon from './Basket/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';
import { useFonts } from 'expo-font';

const RestaurantScreen = () => {

    const [fontsLoaded] = useFonts({
        'EpilogueB': require('../assets/fonts/Epilogue-Bold.ttf'),
        'EpilogueR': require('../assets/fonts/Epilogue-Regular.ttf'),
        'EpilogueM': require('../assets/fonts/Epilogue-Medium.ttf'),
        
      });

    const navigation = useNavigation();

    const StyledScrollView = styled(ScrollView)
    const StyledText = styled(Text)
    const StyledView = styled(View)
    const StyledImage = styled(Image)
    const StyledTouchableOpacity = styled(TouchableOpacity)
    const StyledFontAwesomeIcon = styled(FontAwesomeIcon)

    const dispatch = useDispatch();
    

    const {
        params: {
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,
        }
    } = useRoute();

    useEffect(() => {
        dispatch(
            setRestaurant({
                id,
                imgUrl,
                title,
                rating,
                genre,
                address,
                short_description,
                dishes
            })
        )
        
    },[])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        })
    },[])

    if (!fontsLoaded) {
        return null;
    }

  return (
    <>

    <BasketIcon />
    <StyledScrollView contentContainerStyle={{

      }}>
        <StyledView className='relative'>
            <StyledImage
                source={{
                    uri: urlFor(imgUrl).url(),
                }}
                className='w-full h-56 bg-gray-300 p-4'
            />
            <StyledTouchableOpacity 
                className='absolute top-14 left-5 p-2 bg-gray-100 rounded-full'
                onPress={navigation.goBack}
            >
                <ArrowLeftIcon size={20} color="#FE3448"/>
            </StyledTouchableOpacity>
        </StyledView>

        <StyledView className='bg-white'>
            <StyledView className='px-4 pt-4'>
                <StyledText style={{ fontFamily: 'EpilogueB'}} className='text-3xl'>
                    {title}
                </StyledText>
                <StyledView className='flex-row space-x-3 my-1'>
                    <StyledView className='flex-row items-center space-x-1'>
                        <StyledFontAwesomeIcon 
                            icon={faStar} 
                            color="#48bb78" 
                            size={16} 
                            className="opacity-70" 
                        />
                        <StyledText style={{ fontFamily: 'EpilogueM'}} className='text-gray-500 text-xs'>
                            <StyledText style={{ fontFamily: 'EpilogueM'}} className='text-green-500'>{rating}</StyledText> . {genre}
                        </StyledText>
                    </StyledView>

                    <StyledView className='flex-row items-center space-x-0.5'>
                        <StyledFontAwesomeIcon 
                            icon={faLocationDot} 
                            color="#FE3448" 
                            size={16} 
                            className="opacity-70" 
                        />
                        <StyledText style={{ fontFamily: 'EpilogueM'}} className='text-gray-500 text-xs'>
                            <StyledText style={{ fontFamily: 'EpilogueM'}} className='text-xs text-gray-500'> Nearby . {address}</StyledText>
                        </StyledText>
                    </StyledView>
                </StyledView>

                <StyledText  style={{ fontFamily: 'EpilogueR'}} className='text-gray-400 mt-3 pb-4 leading-4'>
                    {short_description}
                </StyledText>

            </StyledView>
        </StyledView>

        <StyledView className='pb-[20%]'>
                <StyledText  style={{ fontFamily: 'EpilogueM'}} className='px-4 pt-6 mb-3 font-bold text-xl'>
                    Menu
                </StyledText>
                {/* Dishrows */}
                {dishes?.map(dish => (
                    <DishRow 
                        key={dish._id}
                        id={dish._id}
                        name={dish.name}
                        description={dish.short_description}
                        price={dish.price}
                        image={dish.image}
                    />
                ))}
        </StyledView>

    </StyledScrollView>
    </>
  )
}

export default RestaurantScreen