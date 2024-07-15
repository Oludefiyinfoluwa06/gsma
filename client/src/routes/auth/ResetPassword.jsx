import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import logo from '../../assets/logo.png';

const ResetPassword = () => {
    const [password, setPassword] = useState('');

    const { resetPassword, loading, error, setError } = useAuth();

    useEffect(() => {
        setError('');
    }, [setError]);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        await resetPassword(password);
    }

    return (
        <div className="p-[30px] flex items-center justify-center min-h-screen">
            <div className="flex flex-row items-center justify-center">
                <form className="w-[350px] sm:w-[500px] lg:w-[600px] border h-full flex flex-col items-center justify-center p-[30px]" onSubmit={handleResetPassword}>
                    <div className="text-center mb-2">
                        <img src={logo} alt="" width={80} height={80} />
                        <h1 className="text-[25px] sm:text-[40px] font-bold text-slate-800">Reset your password</h1>
                    </div>

                    {error && <p className="text-textError bg-bgError w-full p-2 rounded-md my-[7px]">{error}</p>}

                    <div className="flex flex-col mb-2 gap-3 w-full">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            className="bg-slate-100 outline-none py-[5px] px-[7px] rounded-md text-[16px]" 
                        />
                    </div>

                    <button className="outline-none bg-slate-800 text-white p-[7px] w-full rounded-md my-2 flex items-center justify-center" disabled={loading}>{loading ? <LoadingSpinner /> : 'Reset Password'}</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;