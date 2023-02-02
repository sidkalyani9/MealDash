import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'
import CategoryCard from './CategoryCard'


const Categories = () => {

    const StyledText = styled(Text)
    const StyledScrollView = styled(ScrollView)

    return (
        <StyledScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-5 pt-2"
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