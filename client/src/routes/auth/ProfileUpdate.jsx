import { useEffect, useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileUpdate = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [institutionName, setInstitutionName] = useState('');
    const [major, setMajor] = useState('');
    const [yearOfStudy, setYearOfStudy] = useState('');
    const [studentId, setStudentId] = useState('');

    const { error, setError, profileUpdate, loading } = useProfile();

    const navigate = useNavigate();

    
    useEffect(() => {
        const token = localStorage.getItem('token');

        const getUserProfile = async () => {
            try {
                const response = await axios.get('https://gsma-server.vercel.app/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setFirstname(response.data.profile.firstname);
                setLastname(response.data.profile.lastname);
                setInstitutionName(response.data.profile.institutionName);
                setMajor(response.data.profile.major);
                setYearOfStudy(response.data.profile.yearOfStudy);
                setStudentId(response.data.profile.studentId);
            } catch (error) {
                console.log(error);

                if (error.response.data === 'Please, authenticate') {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    return navigate('/login');
                }
            }
        }
        
        getUserProfile();
    }, [navigate]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        setError('');

        await profileUpdate(firstname, lastname, institutionName, major, yearOfStudy, studentId);
        navigate('/profile');
    }

    return (
        <form className="p-6" onSubmit={handleUpdateProfile}>
            <legend className="text-[30px] text-white font-bold">Profile Setup</legend>

            {error && <p className="text-textError bg-bgError w-full p-2 rounded-md my-[7px]">{error}</p>}

            <div className='flex items-center justify-start gap-4 w-full mt-[15px] flex-wrap sm:flex-nowrap'>
                <div className="flex flex-col mb-2 gap-3 w-full sm:w-1/2">
                    <label htmlFor="firstname" className='text-white'>Firstname</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={firstname}
                        onChange={(e) => {
                            setFirstname(e.target.value);
                            setError('');
                        }}
                        className="bg-slate-100 outline-none py-[5px] px-[7px] rounded-md text-[16px]"
                    />
                </div>

                <div className="flex flex-col mb-2 gap-3 w-full sm:w-1/2">
                    <label htmlFor="lastname" className='text-white'>Lastname</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={lastname}
                        onChange={(e) => {
                            setLastname(e.target.value);
                            setError('');
                        }}
                        className="bg-slate-100 outline-none py-[5px] px-[7px] rounded-md text-[16px]"
                    />
                </div>
            </div>

            <div className='flex items-center justify-start gap-4 w-full mt-[15px] flex-wrap sm:flex-nowrap'>
                <div className="flex flex-col mb-2 gap-3 w-full sm:w-1/2">
                    <label htmlFor="institutionName" className='text-white'>Institution name</label>
                    <input
                        type="text"
                        name="institutionName"
                        id="institutionName"
                        value={institutionName}
                        onChange={(e) => {
                            setInstitutionName(e.target.value);
                            setError('');
                        }}
                        className="bg-slate-100 outline-none py-[5px] px-[7px] rounded-md text-[16px]"
                    />
                </div>

                <div className="flex flex-col mb-2 gap-3 w-full sm:w-1/2">
                    <label htmlFor="major" className='text-white'>Major / Field of study</label>
                    <input
                        type="text"
                        name="major"
                        id="major"
                        value={major}
                        onChange={(e) => {
                            setMajor(e.target.value);
                            setError('');
                        }}
                        className="bg-slate-100 outline-none py-[5px] px-[7px] rounded-md text-[16px]"
                    />
                </div>
            </div>

            <div className='flex items-center justify-start gap-4 w-full mt-[15px] flex-wrap sm:flex-nowrap'>
                <div className="flex flex-col mb-2 gap-3 w-full sm:w-1/2">
                    <label htmlFor="yearOfStudy" className='text-white'>Year of study</label>
                    <input
                        type="number"
                        name="yearOfStudy"
                        id="yearOfStudy"
                        value={yearOfStudy}
                        onChange={(e) => {
                            setYearOfStudy(e.target.value);
                            setError('');
                        }}
                        className="bg-slate-100 outline-none py-[5px] px-[7px] rounded-md text-[16px]"
                    />
                </div>

                <div className="flex flex-col mb-2 gap-3 w-full sm:w-1/2">
                    <label htmlFor="studentId" className='text-white'>Student ID</label>
                    <input
                        type="text"
                        name="studentId"
                        id="studentId"
                        value={studentId}
                        onChange={(e) => {
                            setStudentId(e.target.value);
                            setError('');
                        }}
                        className="bg-slate-100 outline-none py-[5px] px-[7px] rounded-md text-[16px]"
                    />
                </div>
            </div>

            <div className="flex items-center justify-center gap-[20px]">
                <button className="outline-none text-white p-[7px] w-full rounded-md mt-[20px] flex items-center justify-center bg-slate-950" disabled={loading}>{loading ? <LoadingSpinner /> : 'Submit'}</button>
                <button className="outline-none text-white p-[7px] w-full rounded-md mt-[20px] flex items-center justify-center bg-red-500" onClick={() => navigate('/profile')}>Cancel</button>
            </div>
        </form>
    );
}

export default ProfileUpdate;
