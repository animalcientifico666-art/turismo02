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

interface Props{
    images: string[];
    title: string;
    className?:string;
}

export const ProductMobileSlideshow = ({images, title, className}:Props) => {

 const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
    
  return (

    <div className={className}>
       <Swiper
        style={{
          width:'100vw',
          height:'500px'
        } 
    
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
                <Image
                    width={1024}
                    height={800}
                    src={`/products/${image}`}
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
