import { View, Text, Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { urlFor } from '../sanity';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const Dummy = () => {
    
  const user = useSelector(selectUser)

  return (
    <View>
        <Text>Dummy</Text>
        <Text>{user.userInfo.name} HII</Text>
    </View>
  )
}

export default Dummy