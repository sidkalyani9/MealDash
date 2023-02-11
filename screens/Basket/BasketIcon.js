import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styled } from 'nativewind';
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../../features/basketSlice';
import { useNavigation } from '@react-navigation/native';
import Currency from 'react-currency-formatter'

const BasketIcon = () => {
    const items = useSelector(selectBasketItems)
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);

    const StyledText = styled(Text)
    const StyledView = styled(View)
    // const StyledImage = styled(Image)
    const StyledTouchableOpacity = styled(TouchableOpacity)

    if (items.length === 0) return null;

    return (
        <StyledView className='absolute bottom-[3%] w-full px-4 z-50 rounded-lg'> 
            <StyledTouchableOpacity 
                className='bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-[4%]'
                onPress={() => navigation.navigate("Basket")}    
            >
                <StyledText className='text-[#ffffff] rounded-xl bg-[#01a29795] px-3 py-1 text-xl font-extrabold'>{items.length}</StyledText>
                <StyledText className='flex-1 text-white font-bold text-lg text-center'>View Basket</StyledText>
                <StyledText className='text-white bg-[#01a29795] rounded-3xl px-2 py-1 text-lg font-bold'><Currency quantity={basketTotal} currency="GBP" className="rounded-3xl"/></StyledText>
            </StyledTouchableOpacity>
        </StyledView>
    )
}

export default BasketIcon