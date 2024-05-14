import { useEffect } from "react";
import { useProfile } from '../../hooks/useProfile';
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ProfileSetup from "../../components/ProfileSetup";

const Profile = () => {
    const { getUserProfile, loading, user } = useProfile();
    const email = localStorage.getItem('user');

    useEffect(() => {
        const getUser = async () => {
            if (loading) return await getUserProfile(email);
        }

        getUser();
    }, [getUserProfile, email, loading]);

    return (
        <div className="w-full overflow-y-auto no-scrollbar">
            {loading ? (
                <LoadingSpinner />
            ) : user ? (
                <p>{user.username}</p>
            ) : (
                <ProfileSetup />
            )}
        </div>
    );
}

export default Profile;
