import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { AiFillYoutube, AiFillInstagram, AiFillFacebook, AiFillLinkedin } from 'react-icons/ai';

const socialLinks = [
  {
    path: "#",
    Icon: <AiFillYoutube className='hover:text-primaryColor w-6 h-6' />,
  },  
  {
    path: "#",
    Icon: <AiFillFacebook className='hover:text-primaryColor w-6 h-6' />,
  }, 
  {
    path: "#",
    Icon: <AiFillInstagram className='hover:text-primaryColor w-6 h-6' />,
  }, 
  {
    path: "#",
    Icon: <AiFillLinkedin className='hover:text-primaryColor w-6 h-6' />,
  }, 
];

const quickLinks01 = [
  {
    path: "/home",
    display: "Accueil", 
  },
  {
    path: "/tutors",
    display: "Trouver un répétiteur", 
  },
  {
    path: "/services",
    display: "Services", 
  },
  {
    path: "/contact",
    display: "Contact", 
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#cae9f5] to-[#fef6e4] text-black py-8">
      <div className='container mx-auto text-center'>
        {/* Logo */}
        <div className='mb-6'>
          <img src={logo} alt="Molakisi Logo" className='mx-auto w-28' />
        </div>

        {/* Menu Links */}
        <ul className='flex justify-center space-x-6 mb-6'>
          {quickLinks01.map((item, index) => (
            <li key={index}>
              <Link to={item.path} className='text-[16px] hover:text-primaryColor'>
                {item.display}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className='flex justify-center space-x-6 mb-6'>
          {socialLinks.map((link, index) => (
            <Link 
              to={link.path} 
              key={index} 
              className='w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition duration-300'
            >
              {link.Icon}
            </Link>
          ))}
        </div>

        {/* Footer Text */}
        <p className='text-[14px] leading-7'>
          Copyright {year} Molakisi Business Group. <br/>
          Developed by Giovanni Huram Masala. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
