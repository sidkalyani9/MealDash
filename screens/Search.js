import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-paper';
import SearchBar from 'react-native-dynamic-search-bar';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearch, setSearch } from '../features/searchSlice';

const Search = () => {

    const dispatch = useDispatch()
    const search = useSelector(selectSearch)
    
    return (
        <>
            <SearchBar
                    value={search}
                    searchIconImageStyle={{ tintColor: '#FE3448'}}
                    clearIconImageStyle={{ tintColor: '#FE3448'}}
                    textInputStyle= {{ fontFamily: 'EpilogueR' }}
                    placeholder={"Search for Restaurants"}
                    className='flex flex-1 tracking-tight rounded-xl h-12 border-solid  bg-gray-100 ' 
                    style={{ fontFamily: 'EpilogueR'}}
                    onChangeText={(text) => dispatch(setSearch(text))}
                    onClearPress={() => dispatch(setSearch(""))}
                    />

                    
            </>
    )
}

export default Search