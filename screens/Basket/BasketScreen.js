import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../../features/restaurantSlice';
import { selectBasketItems } from '../../features/basketSlice';

const BasketScreen = () => {

    const StyledText = styled(Text)
    const StyledView = styled(View)
    const StyledImage = styled(Image)
    const StyledTouchableOpacity = styled(TouchableOpacity)

    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant)
    const items = useSelector(selectBasketItems)
    const dispatch = useDispatch()

    const [groupedItems, setGroupedItems] = useState();

    useEffect(() => {
      
      const groupedItems = items.reduce((results,item) => {
        
        (results[item.id] = results[item.id] || []).push(item);
        return results;
      },{});

      setGroupedItems(groupedItems)
    },[items])

  return (
    <StyledView>
      <StyledText>Hii</StyledText>
    </StyledView>
  )
}

export default BasketScreen