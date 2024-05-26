import { useEffect, useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileUpdate = () => {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [institutionName, setInstitutionName] = useState('');
    const [major, setMajor] = useState('');
    const [yearOfStudy, setYearOfStudy] = useState('');
    const [studentId, setStudentId] = useState('');

    const { error, setError, profileUpdate, loading } = useProfile();

    const navigate = useNavigate();

    const userEmail = localStorage.getItem('email');

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/profile?email=${userEmail}`);

                setUsername(response.data.profile.username);
                setFullname(response.data.profile.fullname);
                setInstitutionName(response.data.profile.institutionName);
                setMajor(response.data.profile.major);
                setYearOfStudy(response.data.profile.yearOfStudy);
                setStudentId(response.data.profile.studentId);
            } catch (error) {
                console.log(error);
            }
        }
        
        getUserProfile();
    }, [userEmail]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        setError('');

        await profileUpdate(username, fullname, institutionName, major, yearOfStudy, studentId);
        navigate('/profile');
    }

    return (
        <form className="p-6" onSubmit={handleUpdateProfile}>
            <legend className="text-[30px] text-white font-bold">Profile Setup</legend>

            {error && <p className="text-textError bg-bgError w-full p-2 rounded-md my-[7px]">{error}</p>}

            <div className='flex items-center justify-start gap-4 w-full mt-[15px] flex-wrap sm:flex-nowrap'>
                <div className="flex flex-col mb-2 gap-3 w-full sm:w-1/2">
                    <label htmlFor="username" className='text-white'>Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setError('');
                        }}
                        className="bg-slate-100 outline-none py-[5px] px-[7px] rounded-md text-[16px]"
                    />
                </div>

                <div className="flex flex-col mb-2 gap-3 w-full sm:w-1/2">
                    <label htmlFor="fullname" className='text-white'>Full name</label>
                    <input
                        type="text"
                        name="fullname"
                        id="fullname"
                        value={fullname}
                        onChange={(e) => {
                            setFullname(e.target.value);
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
