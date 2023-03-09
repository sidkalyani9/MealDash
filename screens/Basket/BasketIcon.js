import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styled } from 'nativewind';
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../../features/basketSlice';
import { useNavigation } from '@react-navigation/native';
import Currency from 'react-currency-formatter'
import { useFonts } from 'expo-font';

const BasketIcon = () => {

    const [fontsLoaded] = useFonts({
        'EpilogueB': require('../../assets/fonts/Epilogue-Bold.ttf'),
        'EpilogueR': require('../../assets/fonts/Epilogue-Regular.ttf'),
        'EpilogueM': require('../../assets/fonts/Epilogue-Medium.ttf'),
        'EpilogueXB': require('../../assets/fonts/Epilogue-ExtraBold.ttf'),
    });

    const items = useSelector(selectBasketItems)
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);

    const StyledText = styled(Text)
    const StyledView = styled(View)
    // const StyledImage = styled(Image)
    const StyledTouchableOpacity = styled(TouchableOpacity)

    if (items.length === 0) return null;

    if (!fontsLoaded) {
        return null;
      }

    return (
        <StyledView className='absolute bottom-[3%] w-full px-4 z-50 rounded-lg'> 
            <StyledTouchableOpacity 
                className='bg-[#FE3448] p-4 rounded-xl flex-row items-center space-x-[4%]'
                onPress={() => navigation.navigate("Basket")}    
            >
                <StyledText  className='text-[#ffffff] rounded-xl bg-[#d6293a] px-3 py-1 text-xl font-extrabold'  style={{ fontFamily: 'EpilogueB'}}>{items.length}</StyledText>
                <StyledText className='flex-1 text-white font-bold text-lg text-center' style={{ fontFamily: 'EpilogueXB'}}>View Basket</StyledText>
                <StyledText className='text-white bg-[#d6293a] rounded-xl px-2 py-1 text-lg font-bold' style={{ fontFamily: 'EpilogueB'}}><Currency quantity={basketTotal} currency="INR" className="rounded-3xl"/></StyledText>
            </StyledTouchableOpacity>
        </StyledView>
    )
}

export default BasketIcon