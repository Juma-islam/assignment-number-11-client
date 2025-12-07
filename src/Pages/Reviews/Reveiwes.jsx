import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewsCard from './ReviewesCard';


const Reveiwes = ({reviewsPromise}) => {
const reviews = use(reviewsPromise);
console.log(reviews)
    return (
      <div className="my-24">
        <div className="">
            <h3 className='text-2xl text-center'>Reviews</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum similique eaque a quia quae molestiae illum sequi earum accusantium porro, minima nemo ipsum deserunt amet voluptatibus at ad nihil fugit.</p>
        </div>
             <Swiper
             loop={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          scale: 0.75,
          modifier: 1,
          slideShadows: true,
        }}
          autoplay={{
        delay: 2000,
        disableOnInteraction: false
    }} 
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {
            reviews.map(review => <SwiperSlide key={review.id}>
         <ReviewsCard review={review}></ReviewsCard>
        </SwiperSlide>
        )
        }
      </Swiper>
      </div>
   
    );
};

export default Reveiwes;