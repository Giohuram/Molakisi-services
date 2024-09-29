/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import uploadImageToCloudinary from './../../utils/uploadCloudinary';
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import debounce from 'lodash.debounce';

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

    const [loading, setLoading] = useState(false); // For optimistic UI
    const [previewImage, setPreviewImage] = useState(null); // For image preview

    useEffect(() => {
        setFormData({
            name: tutorData?.name,
            email: tutorData?.email,
            phone: tutorData?.phone,
            bio: tutorData?.bio,
            gender: tutorData?.gender,
            specialization: tutorData?.specialization,
            ticketPrice: tutorData?.ticketPrice,
            qualifications: tutorData?.qualifications,
            experiences: tutorData?.experiences,
            timeSlots: tutorData?.timeSlots,
            about: tutorData?.about,
            photo: tutorData?.photo,
        });
    }, [tutorData]);

    const handleInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Debounced input change handler to prevent excessive API calls
    const debouncedHandleInputChange = debounce((e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }, 300);

    // Directly handles file input change and previews image before upload
    const handleFileInputChange = async event => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPreviewImage(previewUrl); // Preview the image
            const data = await uploadImageToCloudinary(file);
            setFormData(prev => ({ ...prev, photo: data?.url }));
        }
    };

    // Optimistic UI update for form submission
    const updateProfileHandler = async e => {
        e.preventDefault();
        const previousData = { ...formData }; // Save current state for rollback if necessary
        setLoading(true); // Show loading indicator
        try {
            const res = await fetch(`${BASE_URL}/tutors/${tutorData._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();
            setLoading(false);

            if (!res.ok) {
                throw new Error(result.message);
            }
            toast.success(result.message);
        } catch (error) {
            setFormData(previousData); // Revert on failure
            setLoading(false);
            toast.error(error.message);
        }
    };

    const addItem = (key, item) => {
        setFormData(prevFormData => ({ ...prevFormData, [key]: [...prevFormData[key], item] }));
    };

    const handleReusableInputChange = (key, index, event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => {
            const updatedItems = [...prevFormData[key]];
            updatedItems[index] = { ...updatedItems[index], [name]: value };
            return {
                ...prevFormData,
                [key]: updatedItems,
            };
        });
    };

    const deleteItem = (key, index) => {
        setFormData(prevFormData => ({ ...prevFormData, [key]: prevFormData[key].filter((_, i) => i !== index) }));
    };

    // Qualifications
    const handleAddQualification = e => {
        e.preventDefault();
        addItem('qualifications', { startingDate: "", endingDate: "", degree: "", university: "" });
    };

    const handleQualificationChange = (event, index) => {
        handleReusableInputChange('qualifications', index, event);
    };

    const deleteQualification = (e, index) => {
        e.preventDefault();
        deleteItem('qualifications', index);
    };

    // Experiences
    const handleAddExperience = e => {
        e.preventDefault();
        addItem('experiences', { startingDate: "", endingDate: "", position: "", school: "" });
    };

    const handleExperienceChange = (event, index) => {
        handleReusableInputChange('experiences', index, event);
    };

    const deleteExperience = (e, index) => {
        e.preventDefault();
        deleteItem('experiences', index);
    };

    // Time Slots
    const handleAddTimeSlot = e => {
        e.preventDefault();
        addItem('timeSlots', { day: "Lundi", startingTime: "10:00", endingTime: "04:30" });
    };

    const handleTimeSlotChange = (e, index) => {
        const { name, value } = e.target;
        const updatedTimeSlots = [...formData.timeSlots];
        updatedTimeSlots[index] = { ...updatedTimeSlots[index], [name]: value };
        setFormData(prevFormData => ({ ...prevFormData, timeSlots: updatedTimeSlots }));
    };

    const deleteTimeSlot = (e, index) => {
        e.preventDefault();
        deleteItem('timeSlots', index);
    };


    return (
        <div>
            <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
                Informations du profile
            </h2>
            <form onSubmit={updateProfileHandler}>
                {/* Form Fields */}
                <div className="mb-5">
                    <p className="form__label">Nom complet*</p>
                    <input 
                        type="text"
                        name="name"
                        defaultValue={formData.name}
                        onChange={debouncedHandleInputChange} // Debounced input handling
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
                        disabled
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
                    <p className="form__label">Ville*</p>
                    <input 
                        type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="veuillez écrire ici votre ville de travail"
                        className="form__input"
                        maxLength={100}
                        required
                    />
                </div>

                <div className="mb-5 grid grid-cols-3 gap-5">
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
                            <option value="American English">Anglais Américain</option>
                            <option value="British English">Anglais Britanique</option>
                            <option value="Business English">Anglais des affaires</option>
                            <option value="General English">Anglais Général</option>
                        </select>
                    </div>
                    <div className="mb-5">
                        <p className="form__label">Frais*</p>
                        <input 
                            type="number"
                            placeholder="50"
                            name="ticketPrice"
                            value={formData.ticketPrice}
                            className="form__input"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                 {/** Qualifications  */}

                 <div className="mb-5">
                        <p className="form__label">Qualifications*</p>
                        {formData.qualifications?.map((item, index) => (
                            <div key={index} className="mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                                <div>
                                <p className="form__label">Date du début*</p>
                                <input
                                    type="date"
                                    name="startingDate"
                                    value={item.startingDate}
                                    className="form__input w-full"
                                    onChange={(e) => handleQualificationChange(e, index)}
                                />
                                </div>
                                <div>
                                    <p className="form__label">Date de fin*</p>
                                    <input
                                        type="date"
                                        name="endingDate"
                                        value={item.endingDate}
                                        className="form__input w-full"
                                        onChange={(e) => handleQualificationChange(e, index)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                                <div>
                                <p className="form__label">Diplôme*</p>
                                <input
                                    type="text"
                                    name="degree"
                                    value={item.degree}
                                    className="form__input w-full"
                                    placeholder="Diplôme"
                                    onChange={(e) => handleQualificationChange(e, index)}
                                />
                                </div>
                                <div>
                                <p className="form__label">Université*</p>
                                <input
                                    type="text"
                                    name="university"
                                    value={item.university}
                                    className="form__input w-full"
                                    placeholder="Université"
                                    onChange={(e) => handleQualificationChange(e, index)}
                                />
                                </div>
                            </div>
                            <button onClick={(e) => deleteQualification(e, index)} className="flex items-center gap-2 text-white bg-red-600 py-2 px-4 rounded">
                                <AiOutlineDelete /> Supprimer
                            </button>
                            </div>
                        ))}
                        <button onClick={handleAddQualification} className="flex items-center gap-2 text-white bg-green-600 py-2 px-4 rounded">
                            Ajouter une qualification
                        </button>
                </div>


                 {/** Experience  */}

                    <div className="mb-5">
                            <p className="form__label">Expériences*</p>
                            {formData.experiences?.map((item, index) => (
                                <div key={index} className="mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                                    <div>
                                    <p className="form__label">Date du début*</p>
                                    <input
                                        type="date"
                                        name="startingDate"
                                        value={item.startingDate}
                                        className="form__input w-full"
                                        onChange={(e) => handleExperienceChange(e, index)}
                                    />
                                    </div>
                                    <div>
                                    <p className="form__label">Date de fin*</p>
                                    <input
                                        type="date"
                                        name="endingDate"
                                        value={item.endingDate}
                                        className="form__input w-full"
                                        onChange={(e) => handleExperienceChange(e, index)}
                                    />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                                    <div>
                                    <p className="form__label">Poste*</p>
                                    <input
                                        type="text"
                                        name="position"
                                        value={item.position}
                                        className="form__input w-full"
                                        placeholder="Poste"
                                        onChange={(e) => handleExperienceChange(e, index)}
                                    />
                                    </div>
                                    <div>
                                    <p className="form__label">École*</p>
                                    <input
                                        type="text"
                                        name="school"
                                        value={item.school}
                                        className="form__input w-full"
                                        placeholder="École"
                                        onChange={(e) => handleExperienceChange(e, index)}
                                    />
                                    </div>
                                </div>
                                <button onClick={(e) => deleteExperience(e, index)} className="flex items-center gap-2 text-white bg-red-600 py-2 px-4 rounded">
                                    <AiOutlineDelete /> Supprimer
                                </button>
                                </div>
                            ))}
                            <button onClick={handleAddExperience} className="flex items-center gap-2 text-white bg-green-600 py-2 px-4 rounded">
                                Ajouter une expérience
                            </button>
                    </div>


                                            {/** TimeSlots  */}
                    <div className="mb-5">
                        <p className="form__label">Disponibilités*</p>
                            {formData.timeSlots?.map((item, index) => (
                            <div key={index} className="mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
                            <div>
                                <p className="form__label">Jour*</p>
                                <select name="day" value={item.day} onChange={(e) => handleTimeSlotChange(e, index)} className="form__input w-full py-3.5">
                                <option value="Lundi">Lundi</option>
                                <option value="Mardi">Mardi</option>
                                <option value="Mercredi">Mercredi</option>
                                <option value="Jeudi">Jeudi</option>
                                <option value="Vendredi">Vendredi</option>
                                <option value="Samedi">Samedi</option>
                                </select>
                            </div>

                            <div>
                            <p className="form__label">Heure de début*</p>
                              <input
                                type="time"
                                name="startingTime"
                                value={item.startingTime}
                                className="form__input w-full"
                                onChange={(e) => handleTimeSlotChange(e, index)}
                              />
                            </div>

                                <div>
                                <p className="form__label">Heure de fin*</p>
                                <input
                                    type="time"
                                    name="endingTime"
                                    value={item.endingTime}
                                    className="form__input w-full"
                                    onChange={(e) => handleTimeSlotChange(e, index)}
                                />
                                </div>
                                </div>
                            <button onClick={(e) => deleteTimeSlot(e, index)} className="flex items-center gap-2 text-white bg-red-600 py-2 px-4 rounded">
                                <AiOutlineDelete /> 
                                Supprimer
                            </button>
                         </div>
                        ))}
                        <button onClick={handleAddTimeSlot} className="flex items-center gap-2 text-white bg-green-600 py-2 px-4 rounded">
                                 Ajouter un créneau
                        </button>
                    </div>

                <div className="mb-5">
                    <p className="form__label">À propos de vous*</p>
                    <textarea
                        rows={5}
                        name="about"
                        value={formData.about}
                        onChange={handleInputChange}
                        className="form__input resize-none"
                        placeholder="À propos de vous"
                        required
                    />
                </div>

                <div className="mb-5">
                    <p className="form__label">Télécharger une photo de profil</p>
                    <input
                        type="file"
                        onChange={handleFileInputChange}
                        accept="image/*"
                        className="form__input"
                    />
                    {previewImage && <img src={previewImage} alt="Profile Preview" className="mt-2 w-32 h-32 object-cover" />}
                </div>

                <div className="mb-5 flex gap-5 justify-end">
                    <button type="button" onClick={() => setFormData(tutorData)} className="bg-gray-400 hover:bg-gray-600 text-white py-2 px-4 rounded">Annuler</button>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded">
                        {loading ? 'Mise à jour...' : 'Mettre à jour'} {/* Loading indicator */}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
