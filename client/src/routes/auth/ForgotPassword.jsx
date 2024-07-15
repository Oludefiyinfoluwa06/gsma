import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import logo from '../../assets/logo.png';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const { loading, error, setError, next, setNext, getOtp, checkOtp } = useAuth();

    useEffect(() => {
        setError('');
    }, [setError]);

    const handleGetOtp = async (e) => {
        e.preventDefault();

        await getOtp(email);
    }

    const handleGoToResetPassword = async (e) => {
        e.preventDefault();

        await checkOtp(otp);
    }

    return (
        <div className="p-[30px] flex items-center justify-center min-h-screen">
            <div className="flex flex-row items-center justify-center">
                {!next && <form className="w-[350px] sm:w-[500px] lg:w-[600px] border h-full flex flex-col items-center justify-center p-[30px]" onSubmit={handleGetOtp}>
                    <div className="text-center flex items-center justify-center flex-col mb-2">
                        <img src={logo} alt="" width={80} height={80} />
                        <h1 className="text-[25px] sm:text-[40px] font-bold text-slate-800">Get OTP</h1>
                    </div>

                    {error && <p className="text-textError bg-bgError w-full p-2 rounded-md my-[7px]">{error}</p>}

                    <div className="flex flex-col mb-2 gap-3 w-full">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                            className="bg-slate-100 outline-none py-[5px] px-[7px] rounded-md text-[16px]"
                        />
                    </div>

                    <button className="outline-none bg-slate-800 text-white p-[7px] w-full rounded-md my-2 flex items-center justify-center" disabled={loading}>{loading ? <LoadingSpinner /> : 'Continue'}</button>

                    <p>
                        Remembered password? <Link to='/login' className='hover:underline hover:text-slate-800 text-[16px] my-[4px]'>Login</Link>
                    </p>
                </form>}

                {next && <form className="w-[350px] sm:w-[500px] lg:w-[600px] border h-full flex flex-col items-center justify-center p-[30px]" onSubmit={handleGoToResetPassword}>
                    <div className="text-center mb-2">
                        <p className='text-xl'>LOGO</p>
                        <h1 className="text-[25px] sm:text-[40px] font-bold text-slate-800">Input OTP</h1>
                    </div>

                    {error && <p className="text-textError bg-bgError w-full p-2 rounded-md my-[7px]">{error}</p>}

                    <div className="flex flex-col mb-2 gap-3 w-full">
                        <label htmlFor="email">OTP</label>
                        <input
                            type="password"
                            name="otp"
                            id="otp"
                            value={otp}
                            onChange={(e) => {
                                setOtp(e.target.value);
                                setError('');
                            }}
                            className="bg-slate-100 outline-none py-[5px] px-[7px] rounded-md text-[16px]"
                        />
                    </div>

                    <button className="outline-none bg-slate-800 text-white p-[7px] w-full rounded-md my-2 flex items-center justify-center" disabled={loading}>{loading ? <LoadingSpinner /> : 'Continue'}</button>

                    <p className='text-[16px] my-[4px] cursor-pointer text-slate-800' onClick={async () => await setNext(false)}>Go back</p>
                </form>}
            </div>
        </div>
    );
}

export default ForgotPassword;