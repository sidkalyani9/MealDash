import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
import { urlFor } from '../../sanity'


const CategoryCard = (props) => {

    const StyledText = styled(Text)
    const StyledView = styled(View)
    const StyledTouchableOpacity = styled(TouchableOpacity)
    const imgUrl = props.imgUrl

    return (
        <StyledTouchableOpacity className='relative mr-2'>
            <Image 
                source={{
                    // uri: props.imgUrl
                    uri: urlFor(imgUrl).url()

                }}
                className='h-20 w-20 rounded'
            />
            <StyledText className='absolute bottom-1 left-1 text-white font-extrabold'>{props.title}</StyledText>
        </StyledTouchableOpacity>
  )
}

export default CategoryCard