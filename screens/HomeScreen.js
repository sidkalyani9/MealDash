import { View, Text , Image, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
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
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearch } from '../features/searchSlice';
import RestaurantShortCard from './RestaurantShortCard';
import { resetUser, selectUser } from '../features/userSlice';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetAuth, selectauth } from '../features/authSlice';




const HomeScreen = () => {

  useEffect(() => {
    const getAuth = async () => {
      const jsonValue = await AsyncStorage.getItem("auth")
      setAuth(JSON.parse(jsonValue))
    }
    getAuth()
  },[])
  const [auth, setAuth] = useState(null)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [fontsLoaded] = useFonts({
    'EpilogueB': require('../assets/fonts/Epilogue-Bold.ttf'),
    'EpilogueXB': require('../assets/fonts/Epilogue-ExtraBold.ttf'),
    'EpilogueR': require('../assets/fonts/Epilogue-Regular.ttf'),
    'EpilogueM': require('../assets/fonts/Epilogue-Medium.ttf'),
  });

  const[featuredCategories,setFeaturedCategories] = useState([]);
  const[searchedItems,setSearchedItems] = useState([]);
  const navigation = useNavigation();
  const search = useSelector(selectSearch)

  
  useLayoutEffect(() => {
      navigation.setOptions({
        // headerTitle: "TESTING",
        headerShown : false,
      });
  },[]);

  useEffect(() => {
    {!search=="" && 
      client.fetch(`
      *[_type == "restaurant" && name match "*${search}*" ] {
        ...,
        dishes[] ->
      }`).then(data => {
        setSearchedItems(data)
      })
    }
  },[search])

  // To Fetch all the Featured Restaurant Cards
  useEffect(() => {
    client.fetch(`
    *[_type == "featured"] {
      ...,
      restaurants[] -> {
        ...,
        dishes[]->
    }
  }
    `).then(data => {
      setFeaturedCategories(data);
    })
  },[])

  const logout = async () => {
    console.log(auth.accessToken)
    await AuthSession.revokeAsync({
      token: auth
    }, {
      revocationEndpoint: "https://oauth2.googLeapis.com/revoke"
    });

    dispatch(resetAuth())
    dispatch(resetUser())
    await AsyncStorage.removeItem("auth",null)
  }

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <SafeAreaView className="bg-white pt-3">
        <View className="flex-row items-center">
        {/* Header  */}
            <View className="">
              <Image 
                source={{
                  uri: 'https://links.papareact.com/wru'
                }}  
                className='h-9 w-9 bg-gray-300 rounded-full ml-3 items-center'
              />
            </View>

            <View className="flex-1 ml-3"> 
              <Text style={{ fontFamily: 'EpilogueB'}} className="font-bold text-xs text-gray-400">Deliver Now!</Text>
              <View className='flex-row items-end'>

                {user != null && <Text style={{ fontFamily: 'EpilogueB'}} className=" text-lg space-x-1 items-center">
                  {user?.userInfo.name}
                </Text> }

                {/* <ChevronDownIcon size={15} color="#FE3448" className="mb-3 ml-1.5"/> */}
              </View>
            </View>

            <TouchableOpacity 
            onPress={() => {
              logout();
              // navigation.navigate("login")
            }} 
            className="mx-2.5 mt-2">
              <UserIcon size={30} color="#FE3448" />
            </TouchableOpacity>
        </View>

        {/* Search */}
          
        <View className='flex-row space-x-2  mx-3 my-3 items-center'>
          {/* <StyledView className='flex-row flex-1 space-x-2 py-2 px-4 rounded-lg bg-gray-200'> */}

                {/* <TextInput  style={{ fontFamily: 'EpilogueR'}} 
                  placeholder={'Search for a Restaurant'}
                  keyboardType={'default'} 
                  value={search}
                  className='flex flex-1 tracking-tight' 
                  onChangeText={(search) => {
                    setSearched(search)
                  }}
                /> */}
                <Search />
                
                
                
          {/* </StyledView> */}
          <AdjustmentsVerticalIcon size={25} color="#FE3448" />
        </View>

        {/* Body */}

        {search == "" && 
        <ScrollView 
          className='bg-gray-100 '
          contentContainerStyle={{
            paddingBottom:130,
          }}
        >
          {/* Categories */}
              <Categories />
            

          {/* Featured */}
            <View className='bg-gray-100'>
              
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
            </View>
          </ScrollView>
          }

          {search != "" && 
            searchedItems.length > 0 &&
            <ScrollView className="bg-gray-100 h-full">
              {searchedItems?.map(searchedItem => (
                 <RestaurantShortCard 
                    key = {searchedItem._id}
                    id = {searchedItem._id}
                    imgUrl = {searchedItem.image}
                    title = {searchedItem.name}
                    rating = {searchedItem.rating}
                    address = {searchedItem.address}
                    short_description = {searchedItem.short_description}
                    dishes={searchedItem.dishes}
                    long = {searchedItem.long}
                    lat = {searchedItem.lat}
                  />
              ))}
             
            </ScrollView>
          }

          { search != "" && 
            searchedItems.length == 0 &&
            <View className="bg-gray-100 h-full items-center pt-[35%]">
              <Image
                source={
                  require('../assets/fonts/noItem.png')
                }  
                className="w-[90%] h-[40%]"
              />
              <Text style={{ fontFamily: 'EpilogueR'}} className="text-lg">Searched Restaurant Not Found! 🧐</Text>

            </View>
          }

    </SafeAreaView>
  )
}

export default HomeScreen