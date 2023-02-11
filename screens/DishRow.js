import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styled } from 'nativewind';
import Currency from 'react-currency-formatter'
import { urlFor } from '../sanity';
import ReadMore from '@expo/react-native-read-more-text';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, selectBasketItems } from '../features/basketSlice';

const DishRow = ({
    id,
    name,
    description,
    price,
    image
}) => {

    const StyledText = styled(Text)
    const StyledView = styled(View)
    const StyledImage = styled(Image)
    const StyledTouchableOpacity = styled(TouchableOpacity)
    const StyledReadMore = styled(ReadMore)

    const dispatch = useDispatch();

    const addItemToBasket = () => {
        dispatch(addToBasket({ id, name, description, price, image }));
        // dispatch(addToBasket({id}))
    }

    const items = useSelector(selectBasketItems);

    _renderTruncatedFooter = (handlePress) => {
        return (
          <Text style={{color: "#6B7280", paddingBottom:5, fontSize:12, marginTop: 5}} onPress={handlePress}>
            Read more
          </Text>
        );
      }
    
      _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{color: "#6B7280", paddingBottom:5, fontSize:12, marginTop: 5}} onPress={handlePress}>
            Show less
          </Text>
        );
      }

  return (
    <StyledView className='mx-2 my-2 rounded-2xl bg-white'>
        <StyledView className='flex-row'>

        <StyledView className='pr-3 relative'>
            <StyledImage 
                source={{
                    uri: urlFor(image).url()
                }}
                className="h-44 w-48 bg-gray-100 p-4 rounded-l-lg rounded-r-none"
                style={{
                    borderWidth: 1,
                    borderColor: "#F3F3F4",
                }}
            />

            <StyledView className='bg-gray-100 border-red-400 border-[1px] border-solid w-24 h-9 rounded-md absolute left-[25%] bottom-[1vh] items-center justify-center flex-row space-x-2'>
              <StyledTouchableOpacity className='bg-gray-100 w-6 items-center justify-center border-solid rounded-md'>
                <StyledText className=' text-red-400 text-lg'>-</StyledText>
              </StyledTouchableOpacity>
                
              <StyledText className='text-black text-lg  font-light'>
                {items.length}
              </StyledText>
              <TouchableOpacity 
                className='bg-gray-100 w-6 items-center justify-center border-solid rounded-md'
                onPress={addItemToBasket}
              >
                <StyledText className=' text-red-400 text-lg'>+</StyledText>
              </TouchableOpacity>  
            </StyledView>
            
        </StyledView>

        <StyledView className='flex-1 h-full relative'>
            <StyledText className='text-base mb-1'>{name}</StyledText>
            <StyledText className={`text-gray-600 mb-[2vw]`}>
                <Currency quantity={price} currency="GBP" />
            </StyledText>
            <StyledView>
            {/* <StyledText className='text-gray-400 text-xs text-justify pr-2 pt-7' >{description}</StyledText> */}
                <StyledReadMore 
                    numberOfLines={4}
                    renderTruncatedFooter={this._renderTruncatedFooter}
                    renderRevealedFooter={this._renderRevealedFooter}
                    onReady={this._handleTextReady}
                >
                    <StyledText className='text-gray-400 text-xs pr-2'>
                        {description}
                    </StyledText>
                </StyledReadMore>
            </StyledView>
        </StyledView>

        
        </StyledView>
    </StyledView>
  )
}



export default DishRow