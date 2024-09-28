/* eslint-disable react/no-unescaped-entities */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';  // Updated import path
import 'swiper/css';
import 'swiper/css/pagination';
import patientAvatar from '../../assets/images/patient-avatar.png';
import { HiStar } from 'react-icons/hi';


const Testimonial = () => {
    return (
      <div className='mt-[30px] lg:mt-[55px]'>
        <Swiper 
          modules={[Pagination]} 
          spaceBetween={30} 
          slidesPerView={1} 
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          <SwiperSlide>
            <div className='py-[30px] px-5 rounded-3'>
              <div className='flex items-center gap-[13px]'>
                <img src={patientAvatar} alt="Giovanni Huram" />
                <div>
                  <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                   — Sarah K.
                  </h4>
                  <div className='flex items-center gap-[2px]'>
                    <HiStar className='text-yellowColor w-[18px] h-5' />
                    <HiStar className='text-yellowColor w-[18px] h-5' />
                    <HiStar className='text-yellowColor w-[18px] h-5' />
                    <HiStar className='text-yellowColor w-[18px] h-5' />
                    <HiStar className='text-yellowColor w-[18px] h-5' />
                  </div>
                </div>
              </div>
              <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
               "Les cours à domicile avec Anglais na ndaku ont transformé ma manière d'apprendre. J'apprécie la flexibilité et le soutien que je reçois de mon enseignant."
              </p>

            </div>
          </SwiperSlide>
          {/* SwiperSlide 2 */}
          <SwiperSlide>
            <div className='py-[30px] px-5 rounded-3'>
              <div className='flex items-center gap-[13px]'>
                <img src={patientAvatar} alt="Giovanni Huram" />
                <div>
                  <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                   — Marc T.
                  </h4>
                  <div className='flex items-center gap-[2px]'>
                    <HiStar className='text-yellowColor w-[18px] h-5' />
                    <HiStar className='text-yellowColor w-[18px] h-5' />
                    <HiStar className='text-yellowColor w-[18px] h-5' />
                    <HiStar className='text-yellowColor w-[18px] h-5' />
                    <HiStar className='text-yellowColor w-[18px] h-5' />
                  </div>
                </div>
              </div>
              <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
               "J'ai amélioré mes compétences en anglais de manière significative grâce à la méthode d'enseignement personnalisée. Je recommande vivement cette école !"
              </p>

            </div>
          </SwiperSlide>
          {/* SwiperSlide 3 */}
          <SwiperSlide>
            <div className='py-[30px] px-5 rounded-3'>
              <div className='flex items-center gap-[13px]'>
                <img src={patientAvatar} alt="Giovanni Huram" />
                <div>
                  <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>
                    — Linda M.
                  </h4>
                  <div className='flex items-center gap-[2px]'>
                    <HiStar className='text-yellowColor w-[18px] h-5' />
                    <HiStar className='text-yellowColor w-[18px] h-5' />
                    <HiStar className='text-yellowColor w-[18px] h-5' />
                    <HiStar className='text-yellowColor w-[18px] h-5' />
                    <HiStar className='text-yellowColor w-[18px] h-5' />
                  </div>
                </div>
              </div>
              <p className='text-[16px] leading-7 mt-4 text-textColor font-[400]'>
                "L'ambiance est très conviviale et les cours sont adaptés à mes besoins. Merci, Anglais na ndaku !"
              </p>
            </div>
          </SwiperSlide>
        </Swiper>      
      </div>
    );
  }
  
  export default Testimonial;
  