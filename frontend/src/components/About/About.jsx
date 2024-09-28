import aboutImg from '../../assets/images/about.png'
import aboutCardImg from '../../assets/images/about-card.png'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <section>
        <div className='container'>
           <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>

            {/** about img */}
            <div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1'>
                <img src={aboutImg} alt='' />    
                <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[-15%]'>
                    <img src={aboutCardImg} alt='' />
                </div>
            </div>

            {/** about content */}
            <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
                <h2 className='heading'>Notre Vision</h2>
                <p className='text__para'>
                  Chez Anglais na ndaku, nous croyons que l&apos;apprentissage de l&apos;anglais devrait être accessible à tous, peu importe leur emploi du temps ou leur niveau. Nous nous engageons à offrir des cours de qualité, adaptés aux besoins individuels de chaque apprenant, tout en créant un environnement d&apos;apprentissage positif et stimulant.
                </p>
                <p className="text__para mt-[10px]">
                 Nous utilisons des méthodes d&apos;enseignement modernes et interactives qui favorisent l&apos;engagement et la participation active. Que ce soit par le biais de jeux de rôle, de discussions, ou de projets pratiques, notre objectif est de rendre l&apos;apprentissage de l&apos;anglais agréable et efficace.
                </p>

                <Link to="/tutors">
                  <button className='btn'>Réservez maintenant</button>
                </Link>
            </div>

           </div>     
        </div>
    </section>
  )
}

export default About