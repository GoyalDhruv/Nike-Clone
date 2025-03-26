import React from 'react'
import { Link } from 'react-router-dom'
import Images from '../../constants/imageConstant'
import TextOnImage from '../TextOnImage'

function Essentials() {
    return (
        <section className='essentials-section mb-14'>
            <h2 className='section-heading'>The Essentials</h2>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
                <Link
                    to={{
                        pathname: "/products",
                        search: "?gender=men",
                    }}
                >
                    <TextOnImage item={{ image: Images.MensImg, text: "Men's" }} ImgClass='w-full' />
                </Link>
                <Link
                    to={{
                        pathname: "/products",
                        search: "?gender=women",
                    }}
                >
                    <TextOnImage item={{ image: Images.WomensImg, text: "Women's" }} ImgClass='w-full' />
                </Link>
                <Link
                    to={{
                        pathname: "/products",
                        search: "?isKids=true",
                    }}
                >
                    <TextOnImage item={{ image: Images.KidsImg, text: "Kid's" }} ImgClass='w-full' />
                </Link>
            </div>
        </section>
    )
}

export default Essentials