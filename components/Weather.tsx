"use client"

import React, {useState, useEffect} from 'react';
import { FiSearch } from "react-icons/fi";
import CircularProgress from '@mui/material/CircularProgress';
import Informations from './Informations';
import Image from "next/image";
import { motion } from "framer-motion";
import Background from './Background';


const Weather = () => {

    const [weatherData, setWeatherData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [location, setLocation] = useState<string>("");

    
    const fetchWeather = async (location: string) => {
        setLoading(true)
        try {
            const response = await fetch(`/api/getWeather?location=${location}`);
            if(!response.ok) {
                throw new Error(`Error: ${response.statusText}`)
            }
            const data: any = await response.json();
            setWeatherData(data);
        } catch(err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchWeather('malvern pa')
    }, [])


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (location) {
          fetchWeather(location);
        } else {
          setError("Please enter a location.");
        }
    };

    return (
        <>
            <Background />
            <div className="w-11/12 m-auto relative flex justify-between">
                <motion.div
                    whileHover={{rotate: 360, scale: 1.45}}
                    className="cursor-pointer"
                >
                    <Image alt="logo" width={150} height={150} src="/weather-app-logo.png" />
                </motion.div>
                <form onSubmit={handleSubmit} className="flex items-center">
                    <div >
                        <input
                            type="text"
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter location"
                            autoComplete="off"
                            required
                            className="placeholder-gray-200 text-white p-2 outline-none border-none bg-gray-300 rounded-md rounded-r-none bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100"
                        />
                    </div>
                    <button type="submit" className="text-center border-none bg-gray-300 rounded-md rounded-l-none bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100 text-gray-200 text-2xl font-bold p-2">
                        <FiSearch />
                    </button>
                </form>
            </div>
        
            {loading ? (
                <div className="w-full flex justify-center">
                    <CircularProgress />
                </div>
            ) : error ? (
                <p>Error: {error}</p>
            ) : weatherData ? (
                <div className="relative top-12">
                    <Informations weatherData={weatherData} />
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default Weather
