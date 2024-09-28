import aboutImg from '../../assets/images/about.jpg';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section>
      <div className='container'>
        <div className='flex justify-between gap-[20px] lg:gap-[30px] xl:gap-[40px] flex-col lg:flex-row'>

          {/** about img */}
          <div className='relative w-full lg:w-2/5 xl:w-2/5 z-10 order-2 lg:order-1'>
            <img className='w-auto rounded-lg' src={aboutImg} alt='' /> {/* Reduced size to fit better */}
          </div>

          {/** about content */}
          <div className='w-full lg:w-3/5 xl:w-3/5 order-1 lg:order-2'>
            <h2 className='heading'> Pourquoi Choisir Anglais na ndaku ?</h2>
            <p className='text__para'>
              Avec ce service, nous croyons que l&apos;apprentissage de l&apos;anglais devrait être accessible à tous, peu importe leur emploi du temps ou leur niveau. Nous nous engageons à offrir des cours de qualité, adaptés aux besoins individuels de chaque apprenant, tout en créant un environnement d&apos;apprentissage positif et stimulant.
            </p>
            <p className="text__para mt-4"> {/* Added spacing for better readability */}
              Nous utilisons des méthodes d&apos;enseignement modernes et interactives qui favorisent l&apos;engagement et la participation active. Que ce soit par le biais de jeux de rôle, de discussions, ou de projets pratiques, notre objectif est de rendre l&apos;apprentissage de l&apos;anglais agréable et efficace.
            </p>
            
            <p className="text__para mt-4">
                <b>Formateurs Qualifiés :</b> Nos enseignants sont des experts passionnés par l&apos;enseignement de l&apos;anglais.
              </p>

              <p className="text__para mt-4">
                <b>Méthodologie Personnalisée :</b> Chaque élève bénéficie d&apos;un programme d&apos;apprentissage sur mesure, en fonction de ses besoins et de ses objectifs.
              </p>

              <p className="text__para mt-4">
                <b>Suivi Régulier :</b> Des évaluations périodiques pour mesurer votre progression et ajuster les cours si nécessaire.
              </p>

              <p className="text__para mt-4">
                <b>Flexibilité des Horaires :</b> Nos cours sont programmés en fonction de vos disponibilités, vous permettant d&apos;apprendre à votre propre rythme, sans perturber votre emploi du temps.
              </p>

              <p className="text__para mt-4">
                <b>Enseignement en Ligne et en Présentiel :</b> Que vous préfériez apprendre depuis chez vous ou en face-à-face, nous vous offrons les deux options pour une expérience d&apos;apprentissage complète.
              </p>

            <div className='mt-8'>
                <Link to="/tutors">
                  <button className='btn mt-4'>Réservez maintenant</button> {/* Added margin for better spacing */}
                </Link>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
