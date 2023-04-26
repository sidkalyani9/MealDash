import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { styled } from 'nativewind';
import { StarIcon } from 'react-native-heroicons/outline';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';


const RestaurantCard = ({
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat}) => {

    const [fontsLoaded] = useFonts({
        'EpilogueB': require('../assets/fonts/Epilogue-Bold.ttf'),
        'EpilogueR': require('../assets/fonts/Epilogue-Regular.ttf'),
        'EpilogueM': require('../assets/fonts/Epilogue-Medium.ttf'),
        'EpilogueXB': require('../assets/fonts/Epilogue-ExtraBold.ttf'),
    });

    const StyledView = styled(View)
    const StyledText = styled(Text)
    const StyledTouchableOpacity = styled(TouchableOpacity)
    const StyledFontAwesomeIcon = styled(FontAwesomeIcon)

    const navigation = useNavigation();
    
    if (!fontsLoaded) {
        return null;
    }
    
    return (
        <TouchableOpacity 
            className="mt-4 mr-4 rounded-xl shadow border-[1px] border-gray-200"
            style={styles.container}
            onPress={() => {
                navigation.navigate('Restaurant',{
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
                });
            }}
        >
            <Image 
                source={{
                    uri: urlFor(imgUrl).url()
                    // uri: imgUrl
                }}
                className="h-36 w-64 rounded-t-xl"
            />

            <StyledView className='px-3 pb-4'>
                <StyledText style={{ fontFamily: 'EpilogueB'}} className='font-bold text-lg pt-2'>{title}</StyledText>
                <StyledView style={{ fontFamily: 'EpilogueM'}} className='flex-row items-center space-x-1'>
                    {/* <StarIcon size={22} color="#FE3448" opacity={0.5} /> */}
                    <StyledFontAwesomeIcon 
                        icon={faStar} 
                        color="#48bb78" 
                        size={16} 
                        className="opacity-70" 
                    />

                    <StyledText style={{ fontFamily: 'EpilogueM'}} className='text-gray-400 text-xs'>
                        <StyledText style={{ fontFamily: 'EpilogueM'}} className='text-green-500'>{rating}</StyledText> .  {genre}
                    </StyledText>
                    
                </StyledView>
                <StyledView className='flex-row pt-1 items-center'>
                    <StyledFontAwesomeIcon icon={faLocationDot} color="#FE3448" size={16} className="opacity-60" />
                    <StyledText style={{ fontFamily: 'EpilogueM'}} className='text-xs text-gray-400'> Nearby .  {address}</StyledText>
                </StyledView>
            </StyledView>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    }
});

export default RestaurantCard