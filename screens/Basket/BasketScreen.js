import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../../features/basketSlice';
import {XCircleIcon} from 'react-native-heroicons/solid'
import { urlFor } from '../../sanity';
import Currency from 'react-currency-formatter'

const BasketScreen = () => {

    const StyledText = styled(Text)
    const StyledView = styled(View)
    const StyledSafeAreaView = styled(SafeAreaView)
    const StyledImage = styled(Image)
    const StyledTouchableOpacity = styled(TouchableOpacity)
    const StyledScrollView = styled(ScrollView)

    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant)
    const items = useSelector(selectBasketItems)
    const dispatch = useDispatch()
    const basketTotal = useSelector(selectBasketTotal)

    const [groupedItemsInBasket, setGroupedItems] = useState([]);

    useEffect(() => {
      
      const groupedItems = items.reduce((results,item) => {
        
        (results[item.id] = results[item.id] || []).push(item);
        return results;
      },{});

      setGroupedItems(groupedItems)
    },[items])

  return (
    <StyledSafeAreaView className='flex-1 bg-white'>
      <StyledView className='flex-1 bg-gray-100'>
        
        <StyledView className='p-5 border-b border-[#FE3448] bg-white shadow-sm'>
          <StyledView>
            <StyledText className='text-center text-lg font-bold'>Basket</StyledText>
            <StyledText className='text-center text-gray-400'>{restaurant.title}</StyledText>
          </StyledView>
        </StyledView>
        <StyledTouchableOpacity className='absolute top-5 right-3' onPress={navigation.goBack}>
          <XCircleIcon height={40} width={40} color="#FE3448"/>
        </StyledTouchableOpacity>

        <StyledView className='flex-row bg-white my-5 px-4 py-3 items-center space-x-3'>
          <StyledImage 
            source={{
              uri: "https://links.papareact.com/wru",
            }}  
            className='h-10 w-10 bg-gray-300 p-4 rounded-full'
          />
          <StyledText className='flex-1'>
            Deliver in 50-55 Minutes
          </StyledText>
          <StyledTouchableOpacity>
            <StyledText className='text-[#FE3448]'>Change</StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        <StyledScrollView className=''>
            {Object.entries(groupedItemsInBasket).map(([key,items]) => (
              <StyledView key={key} className='flex-row items-center space-x-3 bg-white py-2 my-1 px-2 mx-3 rounded-xl'>
                <StyledText className='tracking-widest text-[#FE3448]'>{items.length}X</StyledText>
                <StyledImage 
                  source={{
                    uri: urlFor(items[0]?.image).url()
                  }}
                  className='h-12 w-12 rounded-md'
                />
                <StyledText className='flex-1'>
                  {items[0].name}
                </StyledText>
                <StyledText className='text-gray-400'>
                  <Currency quantity={items[0]?.price} currency="GBP" />
                </StyledText>
                <StyledTouchableOpacity
                  onPress={() => {
                    dispatch(removeFromBasket({id: key}))
                  }}
                >
                  <StyledText className='text-[#FE3448] text-xs'>
                    Remove
                  </StyledText>
                </StyledTouchableOpacity>

              </StyledView>
            ))}
        </StyledScrollView>

        <StyledView className='p-5 bg-white mt-5 space-y-4'>
          
          <StyledView className='flex-row justify-between'>
            <StyledText className='text-gray-400'>Subtotal</StyledText>
            <StyledText className='text-gray-400'><Currency quantity={basketTotal} currency="GBP" /></StyledText>
          </StyledView>

          <StyledView className='flex-row justify-between'>
            <StyledText className='text-gray-400'>Delivery Fee</StyledText>
            <StyledText className='text-gray-400'><Currency quantity={basketTotal*0.2} currency="GBP" /></StyledText>
          </StyledView>

          <StyledView className='flex-row justify-between'>
            <StyledText className='text-lg font-medium'>Order Total</StyledText>
            <StyledText className='text-lg font-medium'><Currency quantity={basketTotal+basketTotal*0.2} currency="GBP" /></StyledText>
          </StyledView>

          <StyledTouchableOpacity className='p-4 bg-[#FE3448] rounded-2xl'>
            <StyledText className='text-center text-lg font-bold text-white'>Place Order</StyledText>
          </StyledTouchableOpacity>

        </StyledView>
        
      </StyledView>
    </StyledSafeAreaView>
  )
}

export default BasketScreen