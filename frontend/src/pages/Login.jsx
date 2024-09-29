// import { useContext, useState } from 'react'; 
// import { Link, useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../config.js';
// import { toast } from 'react-toastify';
// import { AuthContext } from '../context/AuthContext.jsx';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { dispatch } = useContext(AuthContext);

//   const handleInputChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const submitHandler = async event => {
//     event.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch(`${BASE_URL}/auth/Login`, {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       const result = await res.json();
//       if (!res.ok) {
//         throw new Error(result.message || 'Login failed');
//       }

//       dispatch({
//         type: 'LOGIN_SUCCESS',
//         payload: {
//             user: {
//                 _id: result.data._id,
//                 email: result.data.email,
//                 name: result.data.name,
//                 photo: result.data.photo, // Include photo
//             },
//             token: result.token,
//             role: result.role, 
//         }
//     });
    
    

//       console.log(result, 'login data');
//       setLoading(false);
//       toast.success(result.message);
//       navigate('/');
//     } catch (error) {
//       toast.error(error.message); // Ensure error handling is correct
//       setLoading(false);
//     }
//   };

//   return (
//     <section className='px-5 lg:px-0'>
//       <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
//         <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 text-center">Hello dear student<br/><span className="text-primaryColor">Welcome to Anglais na ndaku.com</span></h3>
//         <form className="py-4 md:py-0" onSubmit={submitHandler}>
//           <div className="mb-5">
//             <input 
//               type="email" 
//               placeholder="Entrer votre Email" 
//               name="email" 
//               value={formData.email} 
//               onChange={handleInputChange} 
//               className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
//               required
//             />
//           </div>
//           <div className="mb-5">
//             <input 
//               type="password" 
//               placeholder="Entrer votre mot de passe" 
//               name="password" 
//               value={formData.password} 
//               onChange={handleInputChange} 
//               className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
//               required
//             />
//           </div>
//           <div className='mt-7'>
//             <button type="submit" className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
//               {loading ? 'Loading...' : 'Se connecter'}
//             </button>
//           </div>
//           <p className='mt-5 text-textColor text-center'>
//             Vous n&apos;avez pas compte? <Link to="/Signup" className='text-primaryColor font-medium ml-1'>S&apos;inscrire</Link>
//           </p>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Login;

import { useContext, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config.js';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext.jsx';
import loginImg from "../assets/images/login-pic.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async event => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/Login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Login failed');
      }

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: {
            _id: result.data._id,
            email: result.data.email,
            name: result.data.name,
            photo: result.data.photo,
          },
          token: result.token,
          role: result.role,
        }
      });

      setLoading(false);
      toast.success(result.message);
      navigate('/');
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <section className='flex flex-col md:flex-row items-center justify-center min-h-screen px-5 lg:px-0'>
      <div className="flex flex-col md:flex-row w-full max-w-[900px] mx-auto rounded-lg shadow-md overflow-hidden">
        
        {/* Left section: Login Form */}
        <div className="w-full md:w-1/2 p-10 bg-white">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 text-center">
            Hello dear student<br/>
            <span className="text-primaryColor">Welcome to Anglais na ndaku.com</span>
          </h3>
          <form onSubmit={submitHandler}>
            <div className="mb-5">
              <input 
                type="email" 
                placeholder="Entrer votre Email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                required
              />
            </div>
            <div className="mb-5">
              <input 
                type="password" 
                placeholder="Entrer votre mot de passe" 
                name="password" 
                value={formData.password} 
                onChange={handleInputChange} 
                className='w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                required
              />
            </div>
            <div className='mt-7'>
              <button type="submit" className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
                {loading ? 'Loading...' : 'Se connecter'}
              </button>
            </div>
            <p className='mt-5 text-textColor text-center'>
              Vous n&apos;avez pas compte? <Link to="/Signup" className='text-primaryColor font-medium ml-1'>S&apos;inscrire</Link>
            </p>
          </form>
        </div>

        {/* Right section: Image */}
        <div className="w-full md:w-1/2 bg-gray-100">
          <img 
            src={loginImg} 
            alt="Cours à domicile" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
