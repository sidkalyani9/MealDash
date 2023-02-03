import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { styled } from 'nativewind';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';

const Featured = (props) => {

    const StyledView = styled(View)
    const StyledText = styled(Text)
    const StyledScrollView = styled(ScrollView)

    return (
      <StyledView className='px-3.5 mt-5'>
        
        {/* Heading */}
        <StyledView className='flex-row justify-between items-center'>
          <StyledText className='text-bold text-lg'>{props.title}</StyledText>
          <ArrowRightIcon size={25} color="#FE3448"/>
        </StyledView>

        {/* Description */}
        <StyledText className='text-xs text-gray-500'>{props.description}</StyledText>

        {/* Restaurant Cards */}
        <StyledScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <RestaurantCard 
            id={1}
            imgUrl="https://links.papareact.com/gn7"
            title="KFC"
            rating={4.5}
            genre="American"
            address="Chandkheda, Near VGEC"
            short_description="KFC Chicken"
            dishes={[]}
            long={20}
            lat={0}
          />

          <RestaurantCard 
            id={1}
            imgUrl="https://links.papareact.com/gn7"
            title="KFC"
            rating={4.5}
            genre="American"
            address="Chandkheda, Near VGEC"
            short_description="KFC Chicken"
            dishes={[]}
            long={20}
            lat={0}
          />

          <RestaurantCard 
            id={1}
            imgUrl="https://links.papareact.com/gn7"
            title="KFC"
            rating={4.5}
            genre="American"
            address="Chandkheda, Near VGEC"
            short_description="KFC Chicken"
            dishes={[]}
            long={20}
            lat={0}
          />

          <RestaurantCard 
            id={1}
            imgUrl="https://links.papareact.com/gn7"
            title="KFC"
            rating={4.5}
            genre="American"
            address="Chandkheda, Near VGEC"
            short_description="KFC Chicken"
            dishes={[]}
            long={20}
            lat={0}
          />
        </StyledScrollView>
      </StyledView>
    )
}

export default Featured