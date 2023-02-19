import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import { StarIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

const RestaurantShortCard = ({
    id,
    imgUrl,
    title,
    rating,
    address,
    short_description,
    dishes,
    long,
    lat,
}) => {

    const navigation = useNavigation()
  return (
    <TouchableOpacity 
        className=" m-3.5 flex-row  bg-white rounded-2xl"
        onPress={() => {
            navigation.navigate('Restaurant',{
                id,
                imgUrl,
                title,
                rating,
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
            }}
            className="w-[40vw] h-36 rounded-l-2xl"
        />
        <View className="mx-[3vw] my-2 ">
            <Text className="text-xl">
                {title}
            </Text>
            <View className=" space-y-2 mt-14 ">
                <View className="flex-row space-x-1">
                    <FontAwesomeIcon 
                        icon={faStar} 
                        color="#48bb78" 
                        size={16} 
                    />
                    <Text className="text-green-500">{rating}</Text>
                </View>
                
                    
                <View className="flex-row space-x-1">
                    <FontAwesomeIcon icon={faLocationDot} color="#FE3448" size={16}  />
                    <Text className="text-[#4d4d4d]">Nearby . {address}</Text>
                </View>
            </View>
            {/* <Text className="text-justify w-[30%] h-20 mt-2 text-xs text-[#787878]">{short_description}</Text> */}
            
        </View>
    </TouchableOpacity>
  )
}

export default RestaurantShortCard