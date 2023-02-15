import { View, Text , Image, TextInput, ScrollView} from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styled } from 'nativewind';
import {
  ChevronDownIcon, 
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
  UserIcon
} from "react-native-heroicons/outline";
import Categories from './Category/Categories';
import Featured from './Featured';
import client from '../sanity';
import { useFonts } from 'expo-font';


const HomeScreen = () => {

  const [fontsLoaded] = useFonts({
    'EpilogueB': require('../assets/fonts/Epilogue-Bold.ttf'),
    'EpilogueXB': require('../assets/fonts/Epilogue-ExtraBold.ttf'),
    'EpilogueR': require('../assets/fonts/Epilogue-Regular.ttf'),
    'EpilogueM': require('../assets/fonts/Epilogue-Medium.ttf'),
  });

  const[featuredCategories,setFeaturedCategories] = useState([]);

  const StyledView = styled(View)
  const navigation = useNavigation();
  const StyledSafeAreaView = styled(SafeAreaView)
  const StyledText = styled(Text)
  const StyledTextInput = styled(TextInput);
  const SChevronDownIcon = styled(ChevronDownIcon);
  const StyledScrollView = styled(ScrollView)

  
  
  useLayoutEffect(() => {
      navigation.setOptions({
        // headerTitle: "TESTING",
        headerShown : false,
      });
  },[]);

  useEffect(() => {
    client.fetch(`
      *[_type == "featured"] {
        ...,
        restaurants[] -> {
          ...,
          dishes[]->
      }
    }`).then(data => {
      setFeaturedCategories(data);
    })
  },[])

  if (!fontsLoaded) {
    return null;
  }

  // console.log(featuredCategories);
  return (
    <StyledSafeAreaView className="bg-white pt-3">
        <StyledView className="flex-row items-center">
        {/* Header  */}
            <StyledView className="">
              <Image 
                source={{
                  uri: 'https://links.papareact.com/wru'
                }}  
                className='h-9 w-9 bg-gray-300 rounded-full ml-3 items-center'
              />
            </StyledView>

            <StyledView className="flex-1 ml-3"> 
              <StyledText style={{ fontFamily: 'EpilogueB'}} className="font-bold text-xs text-gray-400">Deliver Now!</StyledText>
              <StyledView className='flex-row items-end'>

                <StyledText style={{ fontFamily: 'EpilogueB'}} className=" text-lg space-x-1 items-center">
                  Current Location
                  
                </StyledText>

                <SChevronDownIcon size={15} color="#FE3448" className="mb-1.5 ml-1.5"/>
              </StyledView>
            </StyledView>

            <StyledView className="mx-2.5 mt-2">
              <UserIcon size={30} color="#FE3448" />
            </StyledView>
        </StyledView>

        {/* Search */}
          
        <StyledView className='flex-row space-x-2  mx-3 my-3 items-center'>
          <StyledView className='flex-row flex-1 space-x-2 py-2 px-4 rounded-lg bg-gray-200'>
                <MagnifyingGlassIcon color="#FE3448" size={25} />
                <StyledTextInput  style={{ fontFamily: 'EpilogueR'}} 
                  placeholder='Search for a Restaurant'
                  keyboardType='default' 
                  className='flex flex-1 tracking-tight' />

          </StyledView>

        {/* <AdjustmentsIcon color='#00CCBB' size={20} /> */}
          <AdjustmentsVerticalIcon size={25} color="#FE3448" />
        </StyledView>

        {/* Body */}
        <StyledScrollView 
          className='bg-gray-100 '
          contentContainerStyle={{
            paddingBottom:130,
          }}
        >
          {/* Categories */}
              <Categories />
            

          {/* Featured */}
            <StyledView className='bg-gray-100'>
              
              {featuredCategories?.map(category => (
                <Featured 
                  key = {category._id}
                  id = {category._id}
                  title = {category.name}
                  description = {category.short_description}
                />
              ))}

              {/* <Featured 
                id="1"
                title="Featured"
                description="Paid Placements from our Partners"
              />

              <Featured 
                id="2"
                title="Tasty Discounts"
                description="Best Discounts from our Top Restaurants"
              />

              <Featured 
                id="3"
                title="Offers near you!"
                description="Why not support your local restaurants!"
              /> */}
            </StyledView>
          </StyledScrollView>
    </StyledSafeAreaView>
  )
}

export default HomeScreen