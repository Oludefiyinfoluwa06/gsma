import { useEffect, useState } from "react";
import HomeCard from "../components/home/HomeCard";

const Dashboard = () => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');

    const time = new Date().toLocaleTimeString();

    const currentTime = time.split(':')[0] + ':' + time.split(':')[1];
    const dayTime = time.split(' ')[1];
    
    const date = new Date().getDate();

    const year = new Date().getFullYear();

    useEffect(() => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        const numericMonth = new Date().getMonth();
        setMonth(months[numericMonth]);

        const numericDay = new Date().getDay();
        setDay(days[numericDay]);
    }, [])
    
    return (
        <div className='text-white w-full overflow-y-auto no-scrollbar p-6 md:pl-2'>
            <div className="w-full h-[250px] rounded-lg p-3 flex items-start justify-end flex-col text-gray-200 hero">
                <h1 className="font-bold md:text-[50px] text-[40px]">{currentTime} {dayTime}</h1>
                <p className="text-[20px] font-bold">{day}, {date} {month}, {year}</p>
            </div>

            <HomeCard />
        </div>
    );
}

export default Dashboard;