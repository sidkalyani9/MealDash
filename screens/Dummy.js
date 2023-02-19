import { View, Text, Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { urlFor } from '../sanity';

const Dummy = () => {
    const {
        params: {
            id,
            imgUrl,
            title,
            rating,
            // genre,
            address,
            short_description,
            dishes,
            long,
            lat,
        }
    } = useRoute();

  return (
    <View>
      <Image source={{
        uri: urlFor(imgUrl).url()
       
      }}
      className="w-10 h-10"
        />
    </View>
  )
}

export default Dummy