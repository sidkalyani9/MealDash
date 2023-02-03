import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
import CategoryCard from './CategoryCard'


const Categories = () => {

    const StyledScrollView = styled(ScrollView)

    return (
        <StyledScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-3.5 pt-3"
        >
            {/* Category Card */}
            <CategoryCard 
                imgUrl="https://links.papareact.com/gn7" 
                title="Testing" 
            />

            <CategoryCard 
                imgUrl="https://links.papareact.com/gn7"
                title="Testing" 
            />

            <CategoryCard 
                imgUrl="https://links.papareact.com/gn7" 
                title="Testing" 
            />

            <CategoryCard 
                imgUrl="https://links.papareact.com/gn7" 
                title="Testing" 
            />

            <CategoryCard 
                imgUrl="https://links.papareact.com/gn7" 
                title="Testing" 
            />

            <CategoryCard 
                imgUrl="https://links.papareact.com/gn7" 
                title="Testing" 
            />

            
        </StyledScrollView>
    )
}

export default Categories