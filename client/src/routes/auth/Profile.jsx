import { useEffect, useState } from 'react';
import axios from "axios";

import { FaPencil } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';

import ProfileSetup from "../../components/ProfileSetup";
import { useProfile } from '../../hooks/useProfile';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);

    const { profilePictureUpload, loading, error, setError } = useProfile();

    const email = localStorage.getItem('email');

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/profile?email=${email}`);

                setUser(response.data.profile);
            } catch (error) {
                console.log(error);
            }
        }

        getUserProfile();
    }, [email]);

    // const convertImgToBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();

    //         fileReader.readAsDataURL(file);
    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         }

    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         }
    //     });
    // }

    const handleFileUpload = async (e) => {
        e.preventDefault();

        setError('');

        await profilePictureUpload(email, profilePicture);
    }

    return (
        <>
            <div className="w-full overflow-y-auto no-scrollbar">
                {user ? (
                    <div className='text-white p-3'>
                        <h1 className="text-[30px] mt-4 text-white font-bold md:text-left text-center">Profile details</h1>

                        <div className='flex items-center justify-start gap-[30px] mt-4 md:flex-row flex-col'>
                            <div className='flex items-center justify-center gap-4 flex-col'>
                                <div className='md:w-[300px] md:h-[300px] w-[130px] h-[130px] rounded-full relative bg-white'>
                                    <div className='absolute top-[80%] md:right-[30px] right-[18px] rounded-full md:text-[25px] text-[15px] text-slate-800 bg-white md:w-[45px] md:h-[45px] flex items-center justify-center cursor-pointer w-[25px] h-[25px]' onClick={() => setShowModal(true)}>
                                        <FaPencil />
                                    </div>
                                </div>

                                <p className='text-[25px]'>{user.username}</p>
                            </div>

                            <div className='flex items-start justify-start flex-col'>
                                <div className='flex flex-col md:flex-row justify-start w-full mb-[20px] gap-[30px]'>
                                    <div className='w-full space-y-2 flex items-start justify-center flex-col'>
                                        <p className='text-[23px] font-bold'>Email address</p>
                                        <p className='text-[15px]'>{user.email}</p>
                                    </div>
                                    <div className='w-full space-y-2 flex items-start justify-center flex-col'>
                                        <p className='text-[23px] font-bold'>Full name</p>
                                        <p className='text-[15px]'>{user.fullname}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col md:flex-row justify-start w-full mb-[20px] gap-[30px]'>
                                    <div className='w-full space-y-2 flex items-start justify-center flex-col'>
                                        <p className='text-[23px] font-bold'>Institution name</p>
                                        <p className='text-[15px]'>{user.institutionName}</p>
                                    </div>
                                    <div className='w-full space-y-2 flex items-start justify-center flex-col'>
                                        <p className='text-[23px] font-bold'>Major / Program of study</p>
                                        <p className='text-[15px]'>{user.major}</p>
                                    </div>
                                </div>

                                <div className='flex flex-col md:flex-row justify-start w-full mb-[20px] gap-[30px]'>
                                    <div className='w-full space-y-2 flex items-start justify-center flex-col'>
                                        <p className='text-[23px] font-bold'>Year of Study</p>
                                        <p className='text-[15px]'>{user.yearOfStudy}</p>
                                    </div>
                                    <div className='w-full space-y-2 flex items-start justify-center flex-col'>
                                        <p className='text-[23px] font-bold'>Student ID</p>
                                        <p className='text-[15px]'>{user.studentId}</p>
                                    </div>
                                </div>

                                <button className='text-[18px] font-bold bg-slate-100 text-slate-800 px-[20px] py-[8px] rounded-lg'>Edit profile</button>
                            
                            </div>

                        </div>
                    </div>
                ) : (
                    <ProfileSetup />
                )}
            </div>

            {showModal && (
                <div className='absolute bg-gradient-to-b from-transparentBlack to-transparentBlack w-full top-0 left-0 h-screen'>
                    <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-white p-[20px] rounded-md">
                        <FaTimes className='absolute top-[10px] right-[10px] text-slate-800 cursor-pointer' onClick={() => setShowModal(false)} />

                        <form onSubmit={handleFileUpload} encType='multipart/form-data'>
                            {error && <p className="text-textError bg-bgError w-full p-2 rounded-md my-[7px]">{error}</p>}

                            <div className="flex flex-col mb-2 gap-3 w-full">
                                <label htmlFor="profilePicture" className='text-white'>Profile Picture</label>
                                <input
                                    type="file"
                                    name="profilePicture"
                                    id="profilePicture"
                                    onChange={async (e) => {
                                        // const base64 = await convertImgToBase64(e.target.files[0]);
                                        setProfilePicture(e.target.files[0]);
                                        setError('');
                                    }}
                                    accept=".jpeg, .jpg, .png"
                                    className="bg-slate-100 outline-none rounded-md text-[16px]"
                                />
                            </div>

                            <button className="outline-none text-white p-[7px] w-full rounded-md mt-[20px] flex items-center justify-center bg-slate-950" disabled={loading}>{loading ? <LoadingSpinner /> : 'Submit'}</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Profile;
