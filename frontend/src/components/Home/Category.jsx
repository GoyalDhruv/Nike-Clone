import React from 'react'
import CategoryList from './CategoryList'

function Category() {
    return (
        <section className='categories-section mb-14'>
            <div className='grid grid-cols-1 gap-0 xl:px-60 lg:grid-cols-4 lg:gap-10 lg:px-24
                     md:grid-cols-4 md:gap-4'>
                <CategoryList title='Icons' items={['Air Force 1', 'Huarache', 'Air Max 90', 'Air Max 95', 'Air Max 97', 'Air Max 270', 'Air Max 720', 'All Air Max']} />
                <CategoryList title='Shoes' items={['All Shoes', 'Custom Shoes', 'Jordan Shoes', 'Running Shoes', 'Basketball Shoes', 'Football Shoes', 'Gym & Training Shoes', 'Lifestyle Shoes']} />
                <CategoryList title='Clothing' items={['All Clothing', 'Modest Wear', 'Hoodies & Pullovers', 'Shirts & Tops', 'Jackets', 'Compression & Nike Pro', 'Trousers & Leggings', 'Shorts']} />
                <CategoryList title="Kids'" items={['Infant & Toddler Shoes', "Kids' Shoes", "Kids' Jordan Shoes", "Kids' Basketball Shoes", "Kids' Running Shoes", "Kids' Clothing", "Kids' Backpacks", "Kids' Socks"]} />
            </div>
        </section>
    )
}

export default Category