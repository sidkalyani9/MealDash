import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationDot, faStar } from '@fortawesome/free-solid-svg-icons';
import { StarIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

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
            <Text className="text-xl" style={{ fontFamily: 'EpilogueB'}}>
                {title}
            </Text>
            <View className=" space-y-2 absolute bottom-1 left-0 ">
                <View className="flex-row space-x-1 items-center">
                    <FontAwesomeIcon 
                        icon={faStar} 
                        color="#48bb78" 
                        size={16} 
                    />
                    <Text style={{ fontFamily: 'EpilogueB'}} className="text-green-500 -mb-1">{rating}</Text>
                </View>
                
                    
                <View className="flex-row space-x-1 w-40">
                    <FontAwesomeIcon icon={faLocationDot} color="#FE3448" size={16}  />
                    <Text style={{ fontFamily: 'EpilogueR'}} className="text-[#4d4d4d] -mb-1">Nearby . {address}</Text>
                </View>
            </View>
            {/* <Text className="text-justify w-[30%] h-20 mt-2 text-xs text-[#787878]">{short_description}</Text> */}
            
        </View>
    </TouchableOpacity>
  )
}

export default RestaurantShortCard