import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styled } from 'nativewind';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import sanityClient from '../sanity';

const Featured = (props) => {
    const id = props.id

    const[restaurants,setRestaurants] = useState([]);

    useEffect(() => {
      sanityClient.fetch(`
          *[_type == "featured" && _id == $id] {
            ...,
            restaurants[] -> {
              ...,
              dishes[]->,
              type-> {
                name
              }
            }
          }[0]
      `, {id} ).then(data => {
        setRestaurants(data?.restaurants)
      })
    },[])   
    
    // console.log(restaurants)

    const StyledView = styled(View)
    const StyledText = styled(Text)
    const StyledScrollView = styled(ScrollView)

    return (
      <StyledView className='px-3.5 mt-5'>
        
        {/* Heading */}
        <StyledView className='flex-row justify-center items-center'>
          <StyledText className='text-bold tracking-widest text-lg justify-center text-center flex-1'>{props.title}</StyledText>
          <ArrowRightIcon size={25} color="#FE3448"/>
        </StyledView>

        {/* Description */}
        {/* <StyledText className='text-xs text-gray-500'>{props.description}</StyledText> */}

        {/* Restaurant Cards */}
        <StyledScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {restaurants?.map((restaurant) => (
            <RestaurantCard
              key = {restaurant._id}
              id = {restaurant._id}
              imgUrl = {restaurant.image}
              title = {restaurant.name}
              rating = {restaurant.rating}
              genre = {restaurant.type?.name}
              address = {restaurant.address}
              short_description = {restaurant.short_description}
              dishes={restaurant.dishes}
              long = {restaurant.long}
              lat = {restaurant.lat}
              />
          ))}

          {/* <RestaurantCard 
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
          /> */}
        </StyledScrollView>
      </StyledView>
    )
}

export default Featured