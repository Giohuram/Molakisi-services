import heroImg01 from '../assets/images/hero-img01.png';
import heroImg02 from '../assets/images/hero-img02.png';
import heroImg03 from '../assets/images/hero-img03.png';
import icon01 from '../assets/images/icon01.png';
import icon02 from '../assets/images/icon02.png';
import icon03 from '../assets/images/icon03.png';
import featureImg from '../assets/images/feature-img.png';
import faqImg from '../assets/images/faq-img.png';
import videoIcon from '../assets/images/video-icon.png';
import avatarIcon from '../assets/images/avatar-icon.png';
import { Link } from 'react-router-dom';
import { BiArrowToRight } from 'react-icons/bi';
import About from '../components/About/About';
import ServicesList from '../components/Services/ServicesList';
import DoctorList from '../components/Doctors/DoctorList';
import FaqList from '../components/Faq/faqList';
import Testimonial from '../components/Testimonial/Testimonial';

const Home = () => {
  return (
    <>
      {/* ======== Hero Section ============ */}
      <section className='hero__section pt-[100px] 2xl:h-[800px] bg-gradient-to-r from-blue-50 to-amber-50'>
        <div className='container mx-auto px-5'>
          <div className='flex flex-col lg:flex-row items-center lg:items-start gap-[50px]'>
            
            {/* ============ Left Hero Content ================= */}
            <div className='lg:w-[570px]'>
              <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]'>
                We help patients live a healthy, longer life.
              </h1>  
              <p className='text-[16px] leading-[28px] text-textColor mt-[20px]'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus quaerat cumque fugit, perspiciatis cum nemo aperiam, aut quia earum amet architecto, modi odio. Soluta unde ducimus perferendis?
              </p>

              <button className='btn bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out py-3 px-8 rounded-full text-white font-semibold mt-[30px]' aria-label="Request an appointment">
                Request an Appointment
              </button>

              {/* ======== Hero Counter ======== */}
              <div className='mt-[30px] lg:mt-[50px] flex flex-col lg:flex-row lg:items-center gap-10'>
                <div className='text-center'>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                    30+
                  </h2>
                  <span className='w-[100px] h-2 bg-yellowColor rounded-full block mx-auto mt-[-14px]'></span>
                  <p className='text-[16px] leading-[28px] text-textColor mt-2'>Years of Experience</p>
                </div>
                <div className='text-center'>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                    15+
                  </h2>
                  <span className='w-[100px] h-2 bg-purpleColor rounded-full block mx-auto mt-[-14px]'></span>
                  <p className='text-[16px] leading-[28px] text-textColor mt-2'>Clinic Locations</p>
                </div>
                <div className='text-center'>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                    100%
                  </h2>
                  <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mx-auto mt-[-14px]'></span>
                  <p className='text-[16px] leading-[28px] text-textColor mt-2'>Patient Satisfaction</p>
                </div>
              </div>
            </div>

            {/* ============ Right Hero Content (Images) ================= */}
            <div className='flex flex-col lg:flex-row gap-[30px] justify-center lg:justify-end items-center lg:items-start'>
              <div>
                <img className='w-full' src={heroImg01} alt='Hero 1' />
              </div>
              <div className='flex flex-col mt-[30px] lg:mt-0'>
                <img className='w-full mb-[30px]' src={heroImg02} alt='Hero 2' />
                <img className='w-full mb-[30px]' src={heroImg03} alt='Hero 3' />
              </div>
            </div>
          </div>
        </div>
      </section>
       {/* ======== Hero Section end ============ */}
       <section>
        <div className='container'>
          <div className='lg:w-[470px mx-auto'>
            <h2 className='heading text-center'>Providing the best medical services</h2>
            <p className='text__para text-center'>
              World-class care for everyone. Our health System offers unmatched, expert health care.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon01} alt='' />
              </div>
              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Find a Doctor</h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                  World-class care for everyone, Our health system offers unmatched, expert health care. From the lab to the clinic.
                </p>
                <Link to="/tutors" className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none' >
                  <BiArrowToRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>
            </div> 
            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon02} alt='' />
              </div>
              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Find a Location</h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                  World-class care for everyone, Our health system offers unmatched, expert health care. From the lab to the clinic.
                </p>
                <Link to="/tutors" className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none' >
                  <BiArrowToRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>
            </div> 
            <div className='py-[30px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon03} alt='' />
              </div>
              <div className='mt-[30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Book Appointment</h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                  World-class care for everyone, Our health system offers unmatched, expert health care. From the lab to the clinic.
                </p>
                <Link to="/tutors" className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none' >
                  <BiArrowToRight className='group-hover:text-white w-6 h-5' />
                </Link>
              </div>
            </div> 
          </div>
        </div>
       </section>

       <About />

       {/** services section start */}
       <section>
          <div className='container'>
            <div className='xl:w-[470px] mx-auto'>
              <h2 className='heading text-center'>Our medical services</h2>
              <p className='text__para text-center'>
                World-class care for everyone. Our health System offers unmatched, expert health care. 
              </p>
            </div>

            <ServicesList />
          </div>
       </section> 
       {/** services section end */}

        {/** feature section start*/}
        <section>
          <div className="container">
            <div className="flex items-center justify-between flex-col lg:flex-row">
               {/** feature content*/}
               <div className='xl:w-[670px]'>
                 <h2 className='heading'>
                   Get virtual treatment <br /> anytime.
                 </h2>
                 <ul className="pl-4">
                  <li className="text__para">
                    1. Schedule the appointment directly
                  </li>
                  <li className="text__para">
                    2. Search for your physician here, and contact their office.
                  </li>
                  <li className="text__para">
                    3. View our physicians who are accepting new patients, use the online scheduling tool to select an appointment time.
                  </li>
                 </ul>
                 <Link to="/"><button className="btn">Learn More</button></Link>
               </div>

                              {/** feature img */}
                <div className='relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0'>
                  <img src={featureImg} className='w-3/4' alt="" />
                </div>

                <div className='w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]'>
                   <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-[6px] lg:gap-3'>
                        <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]'>
                          Tue, 24
                        </p>
                        <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[400]'>
                          10:00 AM
                        </p>
                      </div>
                      <span className='w-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]'>
                        <img src={videoIcon} alt="" />
                      </span>
                   </div>

                   <div className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full">
                    Consultation
                   </div>

                   <div className='flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[10px]'>
                      <img src={avatarIcon} alt='' />
                      <h4 className='text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor'>John Mwenze</h4>
                   </div>
                </div>
            </div>
          </div>
        </section>
         {/** feature section end*/}
         {/** our great doctors */}
        <section>
          <div className='container'>
            <div className='xl:w-[470px] mx-auto'>
              <h2 className='heading text-center'>Our great doctors</h2>
              <p className='text__para text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <DoctorList />
          </div>
        </section>    
          {/** our great doctors end */}
        {/** faq section start */}
        <section className="py-[50px] lg:py-[80px]">
          <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-[50px] lg:gap-[100px]">
            
            {/* Left Side Image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <img src={faqImg} alt="FAQ" className="max-w-full h-auto rounded-lg" />
            </div>
            
            {/* Right Side FAQ Content */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-[30px] md:text-[36px] leading-[40px] md:leading-[44px] font-semibold text-headingColor mb-[30px] lg:mb-[40px]">
                Most questions by our beloved patients
              </h2>
              <FaqList />
            </div>

          </div>
        </section>
        {/** faq section end */}


             {/** testimonial */}
          <section>
            <div className='container'>
              <div className="xl:w-[470px] mx-auto">
                <h2 className='heading text-center'>What our patient say</h2>
                <p className='text__para text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi voluptatum corrupti nemo ea ex ad.</p>
              </div>

              <Testimonial />
            </div>
          </section>
           
              {/** testimonial end */}
    </>
  );
};

export default Home;
