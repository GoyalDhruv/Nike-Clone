import React from 'react';
import PropTypes from 'prop-types';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Carousel.css'

import { Pagination, Navigation, Autoplay } from 'swiper/modules';

function Carousel({ items }) {
    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            allowTouchMove={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            breakpoints={{
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
                780: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                600: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                0: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
            }}
        >
            {items.map((item, index) => (
                <SwiperSlide key={index}>
                    <img src={item.image} alt="shoes" className='h-72 w-full' loading="lazy" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

Carousel.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Carousel;


// import React from 'react';
// import Carousel from './Carousel';

// const items = [
//   { image: 'https://via.placeholder.com/400x300', text: 'Slide 1' },
//   { image: 'https://via.placeholder.com/400x300' },
//   { image: 'https://via.placeholder.com/400x300', text: 'Slide 2' },
//   { image: 'https://via.placeholder.com/400x300' },
//   { image: 'https://via.placeholder.com/400x300', text: 'Slide 3' },
//   { image: 'https://via.placeholder.com/400x300' }
// ];

// const breakpoints = {
//   1500: { slidesPerView: 5, spaceBetween: 40 },
//   1000: { slidesPerView: 3, spaceBetween: 20 },
//   600: { slidesPerView: 2, spaceBetween: 15 },
// };

// const ParentComponent = () => {
//   return (
//     <Carousel
//       items={items}
//       loop={false} // Disable looping
//       slidesPerView={4} // Show 4 slides by default
//       autoplayDelay={3000} // Set autoplay delay to 3 seconds
//       breakpoints={breakpoints} // Pass custom breakpoints
//     />
//   );
// };
// import React from 'react';
// import PropTypes from 'prop-types';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import './Carousel.css';

// import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// function Carousel({
//   items,
//   loop = true,
//   slidesPerView = 3,
//   spaceBetween = 30,
//   autoplayDelay = 2500,
//   breakpoints = {}
// }) {
//   const hasTextSlides = items.some(item => item.text); // Check if any slide has text

//   return (
//     <Swiper
//       slidesPerView={slidesPerView}
//       spaceBetween={spaceBetween}
//       loop={loop}
//       autoplay={{
//         delay: autoplayDelay, // Custom autoplay delay
//         disableOnInteraction: false,
//       }}
//       navigation={true}
//       modules={[Autoplay, Pagination, Navigation]}
//       className="mySwiper"
//       breakpoints={{
//         1200: {
//           slidesPerView: 4,
//           spaceBetween: 30,
//         },
//         780: {
//           slidesPerView: 3,
//           spaceBetween: 20,
//         },
//         600: {
//           slidesPerView: 2,
//           spaceBetween: 10,
//         },
//         0: {
//           slidesPerView: 1,
//           spaceBetween: 0,
//         },
//         ...breakpoints, // Allow custom breakpoints from the parent
//       }}
//     >
//       {items.map((item, index) => (
//         <SwiperSlide key={index}>
//           {item.text ? (
//             // Image with text
//             <div className="carousel-slide-text">
//               <img src={item.image} alt="carousel-item" className="h-72 w-full" loading="lazy" />
//               <div className="text-overlay">{item.text}</div>
//             </div>
//           ) : (
//             // Image only
//             <img src={item.image} alt="carousel-item" className="h-72 w-full" loading="lazy" />
//           )}
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// }

// Carousel.propTypes = {
//   items: PropTypes.arrayOf(
//     PropTypes.shape({
//       image: PropTypes.string.isRequired,
//       text: PropTypes.string, // text is optional
//     })
//   ).isRequired,
//   loop: PropTypes.bool,
//   slidesPerView: PropTypes.number,
//   spaceBetween: PropTypes.number,
//   autoplayDelay: PropTypes.number,
//   breakpoints: PropTypes.object,
// };

// export default Carousel;

// export default ParentComponent;
