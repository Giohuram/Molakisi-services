import heroImg01 from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroImg03 from '../assets/images/hero-img03.jpg';
import icon01 from '../assets/images/icon01.png';
import icon02 from '../assets/images/icon02.png';
import icon03 from '../assets/images/icon03.png';
import featureImg from '../assets/images/feature-img.jpg';
import faqImg from '../assets/images/faq-img.jpg';
import { Link } from 'react-router-dom';
import { BiArrowToRight } from 'react-icons/bi';
import About from '../components/About/About';
// import TutorList from '../components/Tutors/TutorList';
import FaqList from '../components/Faq/faqList';
import Testimonial from '../components/Testimonial/Testimonial';

const Home = () => {
  return (
    <>
      {/* ======== Hero Section ============ */}
      <section className='hero__section pt-[100px] 2xl:h-[800px] bg-gradient-to-r from-blue-50 to-amber-50'>
          <div className='container mx-auto px-5'>
            <div className='flex flex-col lg:flex-row items-center justify-between lg:gap-[50px]'>
              
              {/* ============ Left Hero Content ================= */}
              <div className='lg:w-[550px]'>
                <h1 className='text-[40px] leading-[50px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]'>
                  Vous faire parler l&apos;anglais en peu de temps, c&apos;est notre boulot.
                </h1>  
                <p className='text-[16px] leading-[28px] text-textColor mt-[20px]'>
                  Bienvenue sur Anglais na ndaku.com, un service d&apos;anglais spécialisée dans les cours à domicile offert par Molakisi Business Group. Nous sommes dédiés à vous offrir une expérience d&apos;apprentissage personnalisée et accessible, directement depuis le confort de votre maison.
                </p>
                <Link to="/tutors">
                  <button className='btn bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out py-3 px-8 rounded-full text-white font-semibold mt-[30px]'>
                    Faire une réservation
                  </button>
                </Link>
                
                {/* ======== Hero Counter ======== */}
                <div className='mt-[30px] lg:mt-[50px] flex flex-col lg:flex-row lg:items-center gap-10'>
                  <div className='text-center'>
                    <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                      20+
                    </h2>
                    <span className='w-[100px] h-2 bg-yellowColor rounded-full block mx-auto mt-[-14px]'></span>
                    <p className='text-[16px] leading-[28px] text-textColor mt-2'>Année d&apos;Expérience</p>
                  </div>
                  <div className='text-center'>
                    <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                      15+
                    </h2>
                    <span className='w-[100px] h-2 bg-purpleColor rounded-full block mx-auto mt-[-14px]'></span>
                    <p className='text-[16px] leading-[28px] text-textColor mt-2'>Prof d&apos;anglais</p>
                  </div>
                  <div className='text-center'>
                    <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                      100%
                    </h2>
                    <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mx-auto mt-[-14px]'></span>
                    <p className='text-[16px] leading-[28px] text-textColor mt-2'>Apprenants satisfaits</p>
                  </div>
                </div>
              </div>

              {/* ============ Right Hero Content (Images) ================= */}
              <div className='flex flex-col lg:flex-row gap-[30px] justify-center lg:justify-end items-center'>
                <div>
                  <img className='w-[400px] rounded-lg' src={heroImg01} alt='Hero 1' />
                </div>
                <div className='flex flex-col mt-[30px] lg:mt-0'>
                  <img className='w-[250px] mb-[30px] rounded-lg' src={heroImg02} alt='Hero 2' />
                  <img className='w-[250px] rounded-lg' src={heroImg03} alt='Hero 3' />
                </div>
              </div>
            </div>
          </div>
        </section>

       {/* ======== Hero Section end ============ */}
       <section>
        <div className='container'>
          <div className='lg:w-[470px mx-auto'>
            <h2 className='heading text-center'>Fournir une formation de qualité</h2>
            <p className='text__para text-center'>
              Nous Offrons des cours d&apos;anglais adaptés et à tous les niveaux des enfants aux adultes.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
            <div className='py-[-20px] px-5'>
              <div className='flex items-center justify-center'>
                <img src={icon01} alt='' />
              </div>
              <div className='mt-[-30px]'>
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Trouver un répétiteur 
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                  Nos enseignants sont des experts passionnés par l&apos;enseignement de l&apos;anglais.
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
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  À domicile
                </h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                  Apprenez l&apos;anglais dans le confort de votre maison avec un enseignant qualifié. 
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
                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
                  Réservez en ligne</h2>
                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
                  Après avoir choisi l&apos;enseignant de votre choix, faites votre réservation en ligne.
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

        {/** feature section start*/}
        <section>
          <div className="container">
            <div className="flex items-center justify-between flex-col lg:flex-row">
              
              {/** feature content */}
              <div className='xl:w-[50%] lg:w-[55%]'>
                <h2 className='heading'>
                  Nos objectifs.
                </h2>
                <ul className="pl-4">
                  <li className="text__para">
                    1. Offrir des cours d&apos;anglais adaptés à tous les niveaux.
                  </li>
                  <li className="text__para">
                    2. Favoriser un apprentissage interactif et engageant.
                  </li>
                  <li className="text__para">
                    3. Assurer la flexibilité des horaires pour s&apos;adapter à votre emploi du temps.
                  </li>
                </ul>
                <Link to="/Services">
                  <button className="btn">En savoir plus</button>
                </Link>
              </div>

              {/** feature img */}
              <div className='relative z-10 xl:w-[50%] lg:w-[45%] flex justify-end mt-[50px] lg:mt-0'>
                <img src={featureImg} className='w-[60%] rounded-lg' alt="" />
              </div>

            </div>
          </div>
        </section>

         {/** feature section end*/}

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
                FAQ
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
                <h2 className='heading text-center'>Ce que disents nos Apprenants</h2>
                <p className='text__para text-center'>100 % de nos apprenants sont satisfait de nos services et nous avons hâtes de vous avoir comme apprenant.</p>
              </div>

              <Testimonial />
            </div>
          </section>
           
              {/** testimonial end */}
    </>
  );
};

export default Home;
