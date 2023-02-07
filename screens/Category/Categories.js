import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styled } from 'nativewind'
import CategoryCard from './CategoryCard'
import sanityClient, { urlFor } from '../../sanity'


const Categories = () => {

    const StyledScrollView = styled(ScrollView)

    const[categories,setCategories] = useState([]);

    useEffect(() => {
        sanityClient.fetch(`
            *[_type == "category"]
        `).then(data => {
            setCategories(data)
        })
    },[])

    return (
        <StyledScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-3.5 pt-3"
        >
            {/* Category Card */}

            {categories?.map((category) =>(
                <CategoryCard 
                    key = {category._id}
                    imgUrl = {category.image}
                    title = {category.name}
            />
            ))}

            {/* <CategoryCard 
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
            /> */}

            
        </StyledScrollView>
    )
}

export default Categories