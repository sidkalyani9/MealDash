import { View, Text , Image, TextInput, ScrollView} from 'react-native'
import React, { useLayoutEffect } from 'react'
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

const HomeScreen = () => {

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
              <StyledText className="font-bold text-xs text-gray-400">Deliver Now!</StyledText>
              <StyledText className=" font-bold text-lg space-x-1">
                Current Location
                <SChevronDownIcon size={15} color="#FE3448" className="mb-1"/>
              </StyledText>
            </StyledView>

            <StyledView className="mx-2.5 mt-2">
              <UserIcon size={30} color="#FE3448" />
            </StyledView>
        </StyledView>

        {/* Search */}
          
        <StyledView className='flex-row space-x-2  mx-3 my-3 items-center'>
          <StyledView className='flex-row flex-1 space-x-2 py-2 px-4 rounded-lg bg-gray-200'>
                <MagnifyingGlassIcon color="#FE3448" size={25} />
                <StyledTextInput 
                  placeholder='Search for a Restaurant'
                  keyboardType='default' 
                  className='flex flex-1' />

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
              <Featured 
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
              />
            </StyledView>
          </StyledScrollView>
    </StyledSafeAreaView>
  )
}

export default HomeScreen