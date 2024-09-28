import { useEffect, useRef, useContext, useState } from 'react';
import logo from '../../assets/images/logo.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BiMenu, BiChevronDown } from 'react-icons/bi';
import { AuthContext } from '../../context/AuthContext';

const navlinks = [
  { path: '/home', display: 'Accueil' },
  { path: '/tutors', display: 'Trouver un répétiteur' },
  { path: '/services', display: 'Services' },
  { path: '/contact', display: 'Contact' },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null); // New ref for dropdown menu
  const { user, role, token, dispatch } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state for dropdown
  const navigate = useNavigate(); 

  const handleStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
};

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener('scroll', handleStickyHeader);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavLinkClick = () => {
    closeMenu(); // Close the mobile menu when a link is clicked
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDocumentClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [isDropdownOpen]);

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="header__logo">
            <img src={logo} alt="Molakisi Logo" className="w-[150px] h-auto" />
          </div>
          
          {/* Menu */}
          <div className={`navigation ${isMenuOpen ? 'show__menu' : 'hidden md:flex'}`} ref={menuRef}>
            <ul className="menu flex flex-col md:flex-row md:items-center md:gap-[2.7rem] bg-white md:bg-transparent p-4 md:p-0 border-t md:border-none">
              {navlinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    onClick={handleNavLinkClick}
                    className={navClass =>
                      navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600]' : 'text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'
                    }>
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Right */}
          <div className="flex items-center gap-4 relative">
            {token && user ? (
              <div ref={dropdownRef} className="relative">
                <button className="flex items-center focus:outline-none" onClick={toggleDropdown}>
                  <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                    <img src={user?.photo} className="w-full rounded-full" alt={user?.name} />
                  </figure>
                  <BiChevronDown className="w-5 h-5 ml-2 text-gray-500" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 bg-white rounded-md shadow-md mt-2">
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink to={role === 'tutor' ? '/tutors/profile/me' : '/users/profile/me'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Mon Profile
                        </NavLink>
                      </li>
                      <li>
                        <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Déconnexion
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">Login</button>
              </Link>
            )}

            {/* Mobile Menu Icon */}
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;