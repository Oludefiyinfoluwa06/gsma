import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, loading, error, setError } = useAuth();

    useEffect(() => {
        setError('');
    }, [setError]);

    const handleLogin = async (e) => {
        e.preventDefault();

        await login(email, password);
    }

    return (
        <div className="p-[30px] flex items-center justify-center min-h-screen bg-slate-900">
            <div className="flex flex-row items-center justify-center">
                <form className="w-[350px] sm:w-[500px] lg:w-[600px] border h-full flex flex-col items-center justify-center p-[30px] rounded-lg" onSubmit={handleLogin}>
                    <div className="text-center mb-2">
                        <p className='text-xl text-white'>LOGO</p>
                        <h1 className="text-[25px] sm:text-[40px] font-bold text-white">Login to your account</h1>
                    </div>

                    {error && <p className="text-textError bg-bgError w-full p-2 rounded-md my-[7px]">{error}</p>}

                    <div className="flex flex-col mb-2 gap-3 w-full">
                        <label htmlFor="email" className='text-white'>Email</label>
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

                    <div className="flex flex-col my-2 gap-3 w-full">
                        <label htmlFor="password" className='text-white'>Password</label>
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

                    <Link to='/forgot-password' className='hover:underline text-white text-[16px] my-[4px]'>Forgot Password?</Link>

                    <button className="outline-none text-white p-[7px] w-full rounded-md my-2 flex items-center justify-center bg-slate-950" disabled={loading}>{loading ? <LoadingSpinner /> : 'Sign in'}</button>

                    <p className='text-white'>
                        Don't have an account? <Link to='/register' className='hover:underline text-[16px] my-[4px]'>Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;