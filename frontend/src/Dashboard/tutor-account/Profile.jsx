/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import uploadImageToCloudinary from './../../utils/uploadCloudinary';
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";


const Profile = ({ tutorData }) => {
    const [formData, setFormData] = useState({
        name: tutorData.name || '',
        email: tutorData.email || '',
        password: tutorData.password || '',
        phone: tutorData.phone || '',
        bio: tutorData.bio || '',
        gender: tutorData.gender || '',
        specialization: tutorData.specialization || '',
        ticketPrice: tutorData.ticketPrice || 0,
        qualifications: tutorData.qualifications || [],
        experiences: tutorData.experiences || [],
        timeSlots: tutorData.timeSlots || [],
        about: tutorData.about || '',
        photo: tutorData.photo || null,
      });      

   useEffect(()=>{
    setFormData({
        name:tutorData?.name, 
        email:tutorData?.email,
        phone:tutorData?.phone,
        bio:tutorData?.bio,
        gender:tutorData?.gender,
        specialization:tutorData?.specialization,
        ticketPrice:tutorData?.ticketPrice,
        qualifications:tutorData?.qualifications,
        experiences:tutorData?.experiences,
        timeSlots:tutorData?.timeSlots,
        about:tutorData?.about,
        photo:tutorData?.photo, 
    })
   }, [tutorData?.about, tutorData?.bio, tutorData?.email, tutorData?.experiences, tutorData?.gender, tutorData?.name, tutorData?.phone, tutorData?.photo, tutorData?.qualifications, tutorData?.specialization, tutorData?.ticketPrice, tutorData?.timeSlots])

   const handleInputChange = e => {
      setFormData({ ... formData, [e.target.name]:e.target.value})
   };

   const handleFileInputChange = async event => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setFormData({ ...formData, photo:data?.url}); 
   }; 

   const updateProfileHandler = async e=> {
    e.preventDefault(); 

    try {
        const res = await fetch(`${BASE_URL}/tutors/${tutorData._id}`, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData),
          });          

        const result = await res.json()

        if(!res.ok){
            throw Error(result.message)
        }

        toast.success(result.message)

    } catch (error) {
        toast.error(error.message)
    }
   }; 

   // reusable function for adding item 
   const addItem = (key, item) =>{
    setFormData(prevFormData=> ({ ...prevFormData, [key]:[...prevFormData[key], item]}))
   }

   // reusable input change function 
   const handleReusableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
  
    setFormData(prevFormData => {
      const updateItems = [...prevFormData[key]];
  
      updateItems[index] = { ...updateItems[index], [name]: value };
  
      return {
        ...prevFormData,
        [key]: updateItems,
      };
    });
  };  

   // reusable function for deleting item
   const deleteItem = (key, index) => {
    setFormData(prevFormData=> ({ ...prevFormData, [key]:prevFormData[key].filter((_,i)=>i !== index)}))
   }

 
   // functions for qualifications 

   const handleAddQualification = e=>{
    e.preventDefault()

    addItem('qualifications', {
        startingDate: "", 
        endingDate: "", 
        degree: "", 
        university: "", 
    })
   };

   const handleQualificationChange = (event, index)=>{
    handleReusableInputChangeFunc('qualifications', index, event)
   }

   const deleteQualification = (e, index)=>{
    e.preventDefault()
    deleteItem('qualifications', index)
   } 

   // functions for experience

   const handleAddExperience = e=>{
    e.preventDefault()

    addItem('experiences', {
        startingDate: "", 
        endingDate: "", 
        position: "", 
        school: "", 
    })
   };

   const handleExperienceChange = (event, index)=>{
    handleReusableInputChangeFunc('experiences', index, event)
   }

   const deleteExperience = (e, index)=>{
    e.preventDefault()
    deleteItem('experiences', index)
   } 

   // functions for timeSlots 

   const AddTimeSlot = e=>{
    e.preventDefault()

    addItem('timeSlots', {
        day: "Lundi", 
        startingTime:"10:00", 
        endingTime:"04:30", 
    })
   };

   const handleTimeSlotChange = (e, index) => {
    const { name, value } = e.target;
  
    // Create a copy of the current formData timeSlots array
    const updatedTimeSlots = [...formData.timeSlots];
  
    // Update the specific timeslot at the given index
    updatedTimeSlots[index] = {
      ...updatedTimeSlots[index],
      [name]: value, // Dynamically update 'startingTime' or 'endingTime'
    };
  
    // Set the updated timeSlots array within the formData state
    setFormData((prevFormData) => ({
      ...prevFormData,           // Copy other fields in formData
      timeSlots: updatedTimeSlots, // Update only timeSlots
    }));
  };
  
   const deleteTimeSlot = (e, index)=>{
    e.preventDefault()
    deleteItem('timeSlots', index)
   } 

  return (
    <div>
        <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">Informations du profile</h2>

        <form>
            <div className="mb-5">
               <p className="form__label">Nom complet*</p> 
               <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Veuillez écrire votre nom complet"
                className="form__input"
                required
               />
            </div>
            <div className="mb-5">
               <p className="form__label">Email*</p> 
               <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Votre addresse email"
                className="form__input"
                required
                readOnly
                aria-readonly
                disabled = {true}
               />
            </div>
            <div className="mb-5">
               <p className="form__label">Téléphone*</p> 
               <input 
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Veuillez écrire votre numéro de téléphone"
                className="form__input"
                required
               />
            </div>
            <div className="mb-5">
               <p className="form__label">Bio*</p> 
               <input 
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="votre biographie"
                className="form__input"
                maxLength={100}
                required
               />
            </div>

            <div className="mb-5">
                <div className="grid grid-cols-3 gap-5 mb-[30px]">
                    <div>
                        <p className="form__label">Genre*</p>
                        <select name="gender" value={formData.gender} onChange={handleInputChange} className="form__input py-3.5">
                            <option value="">Choisir</option>
                            <option value="male">Homme</option>
                            <option value="female">Femme</option>
                        </select>
                    </div>
                    <div>
                        <p className="form__label">Spécialisation*</p>
                        <select name="specialization" value={formData.specialization} onChange={handleInputChange} className="form__input py-3.5">
                            <option value="">Choisir</option>
                            <option value="primaire">Primaire</option>
                            <option value="secondaire">Secondaire</option>
                            <option value="Général">Général</option>
                        </select>
                    </div>

                    <div className="mb-5">
                        <p className="form__label">Frais par Mois en $USD</p>
                        <input 
                          type="number"
                          placeholder="100"
                          name="ticketPrice"  
                          value={formData.ticketPrice} 
                          className="form__input"
                          onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-5">
                        <p className="form__label">Qualifications*</p>
                        {formData.qualifications?.map((item, index) => (
                            <div key={index} className="mb-[30px]">
                            
                               <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="w-[300px]">
                                        <p className="form__label">Date du début*</p>
                                        <input
                                           type="date"
                                           name="startingDate"
                                           value={item.startingDate}
                                           className="form__input w-[300px]"
                                           onChange={(e) => handleQualificationChange(e, index, 'startingDate')}
                                        />
                                    </div>
                                    <div className="w-[300px]">
                                        <p className="form__label ml-52">Date du fin*</p>
                                        <input
                                           type="date"
                                           name="endingDate"
                                           value={item.endingDate}
                                           className="form__input  ml-52"
                                           onChange={(e) => handleQualificationChange(e, index, 'endingDate')}
                                        />
                                    </div>
                                </div>

                            {/* Grid for Degree and University */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div>
                                        <p className="form__label">Diplôme*</p>
                                        <input
                                            type="text"
                                            name="degree"
                                            value={item.degree}
                                            className="form__input w-[300px]"
                                            onChange={(e) => handleQualificationChange(e, index, 'degree')}
                                        />
                                    </div>
                                    <div className="w-[300px]">
                                        <p className="form__label ml-52">Institution*</p>
                                        <input
                                            type="text"
                                            name="university"
                                            value={item.university}
                                            className="form__input ml-52"
                                            onChange={(e) => handleQualificationChange(e, index, 'university')}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-start">
                                    <button
                                    type="button"
                                    onClick={e => deleteQualification(e, index)}
                                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 cursor-pointer"
                                    >
                                    <AiOutlineDelete />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Add Qualification Button */}
                        <button
                            type="button"
                            onClick={handleAddQualification}
                            className="bg-black py-2 px-5 rounded text-white h-fit cursor-pointer"
                        >
                            Ajouter les qualifications
                        </button>
                    </div>
                </div>

                  {/** Experiences section  */}          
                <div className="mb-5">
                        <p className="form__label">Expériences*</p>
                        {formData.experiences?.map((item, index) => (
                            <div key={index} className="mb-[30px]">
                            
                               <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="w-[300px]">
                                        <p className="form__label">Date du début*</p>
                                        <input
                                           type="date"
                                           name="startingDate"
                                           value={item.startingDate}
                                           className="form__input w-[300px]"
                                           onChange={(e) =>  handleExperienceChange(e, index)}
                                        />
                                    </div>
                                    <div className="w-[300px]">
                                        <p className="form__label ">Date du fin*</p>
                                        <input
                                           type="date"
                                           name="endingDate"
                                           value={item.endingDate}
                                           className="form__input"
                                           onChange={(e) =>  handleExperienceChange(e, index)}
                                        />
                                    </div>
                                </div>

                            {/* Grid for position and school */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div>
                                        <p className="form__label">Position*</p>
                                        <input
                                            type="text"
                                            name="position"
                                            value={item.position}
                                            className="form__input w-[300px]"
                                            onChange={(e) =>  handleExperienceChange(e, index)}
                                        />
                                    </div>
                                    <div className="w-[300px]">
                                        <p className="form__label">École*</p>
                                        <input
                                            type="text"
                                            name="school"
                                            value={item.hospital}
                                            className="form__input"
                                            onChange={(e) =>  handleExperienceChange(e, index)}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-start">
                                    <button
                                    type="button"
                                    onClick={e => deleteExperience(e, index)}
                                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 cursor-pointer"
                                    >
                                    <AiOutlineDelete />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Add Qualification Button */}
                        <button
                            type="button"
                            onClick={handleAddExperience}
                            className="bg-black py-2 px-5 rounded text-white h-fit cursor-pointer"
                        >
                            Ajouter l&apos;expérience
                        </button>
                </div>

                {/** TimeSlots */}

                <div className="mb-5">
                        <h2 className="form__label">Créneaux horaires*</h2>
                        {formData.timeSlots?.map((item, index) => (
                            <div key={index}>
                              <div>
                                <div className="grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5">
                                    <div >
                                        <p className="form__label">Jour*</p>
                                        <select 
                                            name="day" 
                                            value={item.day} 
                                            className="form__input py-3.5"
                                            onChange={(e) => handleTimeSlotChange(e, index)}>
                                                <option value="Monday">Lundi</option>
                                                <option value="Tuesday">Mardi</option>
                                                <option value="Wednesday">Mercredi</option>
                                                <option value="Thursday">Jeudi</option>
                                                <option value="Friday">Vendredi</option>
                                                <option value="Saturday">Samedi</option>
                                                <option value="Sunday">Dimanche</option>
                                            </select>

                                    </div>
                                    <div>
                                        <p className="form__label ">Heure du début*</p>
                                        <input
                                            type="time"
                                            name="startingTime"
                                            value={item.startingTime || ''}  
                                            className="form__input"
                                            onChange={(e) => handleTimeSlotChange(e, index)}
                                        />
                                    </div>
                                    <div>
                                        <p className="form__label ">Heure de fin*</p>
                                        <input
                                            type="time"
                                            name="endingTime"
                                            value={item.endingTime || ''} 
                                            className="form__input"
                                            onChange={(e) => handleTimeSlotChange(e, index)}
                                        />
                                    </div>
                                </div>
                                </div>
                            </div>
                        ))}

                        {/* Add TimeSlot Button */}
                        <button
                            type="button"
                            onClick={AddTimeSlot}
                            className="bg-black py-2 px-5 rounded text-white h-fit cursor-pointer"
                        >
                            Ajouter le créneau horaire
                        </button>
                </div>        
            </div>
            <div className="mb-5">
              <p className="form__label">À propos*</p>  
              <textarea name="about" id=""  rows={5} value={formData.about} placeholder="Écrivez votre biographie en long et en large ici" onChange={handleInputChange} className="form__input" ></textarea>        
            </div>

            <div className="mb-5 flex items-center gap-3">
                { formData.photo && 
                    (<figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                    <img 
                        src={formData.photo} 
                        alt=""
                        className="w-full rounded-full"
                        />
                    </figure>
                    )}
                <div className="relative w-[165px] h-[50px]">
                    <input 
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg, .png"
                    className="absolute top=0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    <label htmlFor="customFile" className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer">
                    Ajouter votre photo
                    </label>
                </div>  
            </div>
                    
            <div className="mt-7">
                <button type="submit" onClick={updateProfileHandler} className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg">
                    Mettre à jour mon profile
                </button>
            </div>

        </form>
    </div>
  )
}

export default Profile