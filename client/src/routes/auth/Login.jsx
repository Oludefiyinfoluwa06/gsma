import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { login, loading } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        await login(email, password);
    }

    return (
        <div className="px-[30px] py-[100px] sm:p-[100px] h-screen">
            <div className="flex flex-row items-center justify-between h-full">
                <div className="w-full h-full hidden lg:block">
                    Image
                </div>
                <form className="w-full border h-full flex flex-col items-center justify-center p-[30px]" onSubmit={handleLogin}>
                    <div className="text-center mb-2">
                        <h1 className="text-[40px] font-bold">Welcome back</h1>
                        <p>Login to access your account</p>
                    </div>

                    <div className="flex flex-col mb-2 gap-3 w-full">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-100 outline-none py-[5px] px-[7px] rounded-md text-[16px]"
                        />
                    </div>

                    <div className="flex flex-col mb-2 gap-3 w-full">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-100 outline-none py-[5px] px-[7px] rounded-md text-[16px]" 
                        />
                    </div>

                    <Link to='/forgot-password' className='hover:underline text-[16px] my-[4px]'>Forgot Password?</Link>

                    <button className="outline-none bg-black text-white p-[7px] w-full rounded-md my-2 flex items-center justify-center" disabled={loading}>{loading ? <LoadingSpinner /> : 'Sign in'}</button>

                    <p>
                        Don't have an account? <Link to='/register' className='hover:underline text-[16px] my-[4px]'>Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;