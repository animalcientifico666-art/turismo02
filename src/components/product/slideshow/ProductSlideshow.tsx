'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';

import {Swiper as SwiperObject} from 'swiper';

import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';

// import styles

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import { useState } from 'react';
import { ProductImage } from '../product-image/ProductImage';

interface Props{
    images: string[];
    title: string;
    className?:string;
}

export const ProductSlideshow = ({images, title, className}:Props) => {

 const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
    
  return (

    <div className={className}>
       <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties
    
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >

        {
            images.map(image=>(
                <SwiperSlide key={image}>
                <ProductImage
                    width={1024}
                    height={800}
                    src={image}
                    alt={title}
                    className='rounded-lg object-fill'
                />
                
                </SwiperSlide>
            ))
        }
       </Swiper>
    </div>
  );
    
    
};
