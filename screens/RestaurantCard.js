import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { styled } from 'nativewind';
import { StarIcon } from 'react-native-heroicons/outline';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';


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

    const StyledView = styled(View)
    const StyledText = styled(Text)
    const StyledTouchableOpacity = styled(TouchableOpacity)
    const StyledFontAwesomeIcon = styled(FontAwesomeIcon)

    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            className="mt-4 mr-4 rounded-md shadow"
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
                className="h-36 w-64 rounded-t-md"
            />

            <StyledView className='px-3 pb-4'>
                <StyledText className='font-bold text-lg pt-2'>{title}</StyledText>
                <StyledView className='flex-row items-center space-x-1'>
                    {/* <StarIcon size={22} color="#FE3448" opacity={0.5} /> */}
                    <StyledFontAwesomeIcon 
                        icon={faStar} 
                        color="#48bb78" 
                        size={16} 
                        className="opacity-70" 
                    />

                    <StyledText className='text-gray-500 text-xs'>
                        <StyledText className='text-green-500'>{rating}</StyledText> .  {genre}
                    </StyledText>
                    
                </StyledView>
                <StyledView className='flex-row pt-1 items-center'>
                    <StyledFontAwesomeIcon icon={faLocationDot} color="#FE3448" size={16} className="opacity-60" />
                    <StyledText className='text-xs text-gray-500'> Nearby .  {address}</StyledText>
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