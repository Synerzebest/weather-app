import React from 'react';
import Image from "next/image";


type InformationsProps = {
    weatherData: any,
}

type DetailCardProps = {
    title: string,
    content: string
}

const getWeatherIcon = (icon: string) => {
    if (icon === "clear-day") {
        return '/sun.png'; 
    } else if (icon === "partly-cloudy-day") {
        return '/cloudy.png';
    } else if (icon === "cloudy") {
        return '/cloud.png'; 
    } else if (icon === "snow") {
        return '/snowflake.png';
    } else if (icon === "clear-night") {
        return '/moon.png';
    } else if (icon === "rain") {
        return "/rainy.png"
    } else if (icon === "wind") {
        return "/wind.png"
    } else if (icon === "partly-cloudy-night") {
        return "/cloudy-night.png"
    } else {
        return "/cloudy.png"
    }
};

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

const formatTime = (timeString: string) => {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', hour12: true };
    const date = new Date(`1970-01-01T${timeString}Z`);
    return date.toLocaleTimeString('en-US', options);
};

const formatSunTime = (timeString: string) => {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: "2-digit", hour12: true };
    const date = new Date(`1970-01-01T${timeString}Z`);
    return date.toLocaleTimeString('en-US', options);
};


const DetailCard: React.FC<DetailCardProps> = ({title, content}) => {
    return(
        <div className="w-[90px] h-[90px] flex flex-col justify-center items-center bg-gray-700 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100 p-2">
            <p className="text-white text-sm">{title}</p>
            <p className="text-white text-sm">{content}</p>
        </div>
    )
}


const Informations: React.FC<InformationsProps> = ({weatherData}) => {
    const details = [
        {
            name: "temp",
            title: "Now",
            content: `${weatherData.days[0].temp}°F`
        },
        {
            name: "tempMax",
            title: "Max",
            content: `${weatherData.days[0].tempmax}°F`
        },
        {
            name: "tempMin",
            title: "Min",
            content: `${weatherData.days[0].tempmin}°F`
        },
        {
            name: "sunrise",
            title: <Image alt="sunrise" src="/sunrise.png" width={35} height={35} />,
            content: formatSunTime(weatherData.days[0].sunrise)
        },
        {
            name: "sunset",
            title: <Image alt="sunrise" src="/sunset.png" width={35} height={35} />,
            content: formatSunTime(weatherData.days[0].sunset)
        },
        {
            name: "uvIndex",
            title: "UV",
            content: weatherData.days[0].uvindex
        },
        {
            name: "preciprob",
            title: <Image alt="precipitations probability" src="/rainy.png" width={35} height={35} />,
            content: `${weatherData.days[0].precipprob}%`
        }
    ]
    return (
        <div className="w-full flex flex-col items-center gap-8">
            <div className="w-full flex justify-center">
                <p className="text-3xl text-white text-center">{weatherData.resolvedAddress}</p>
            </div>

            <div className="w-[80%] flex flex-col justify-between items-center bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100 p-8">
                <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                    <div className="flex flex-col items-center gap-4">
                        <Image src={getWeatherIcon(weatherData.days[0].icon)} alt="condition" width={150} height={150} className="object-contain" />
                        <p className="text-white text-2xl mb-4">{formatDate(weatherData.days[0].datetime)}</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 w-full md:w-1/2 lg:w-1/3">
                        {details.map((detail: any) => {
                            return(
                                <DetailCard content={detail.content} title={detail.title} key={detail.title} />
                            )
                        })}
                    </div>
                </div>
                

                <div className="relative top-8  mb-4 flex gap-4 w-full justify-center overflow-x-scroll">
                    {weatherData.days[0].hours.map((hour: any, index: number) => {
                        if (index % 3 === 0) {
                            return(
                                <div className="min-w-[50px] flex flex-col items-center gap-2 text-white bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100 p-4">
                                    <Image src={getWeatherIcon(hour.icon)} width={30} height={30} alt="icon" />
                                    <p className="text-sm w-full">{formatTime(hour.datetime)}</p>
                                    <p className="text-sm">{hour.temp}°F</p>
                                </div>
                            ); 
                        }
                        return null
                              
                    })}
                </div>

                
            </div>
            <div className="w-11/12 flex flex-wrap gap-4 justify-center">
                {weatherData.days.slice(1, 7).map((day: any, index: number) => {
                    return(
                        <div key={index} className="flex flex-col items-center bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100 p-8">
                            <Image src={getWeatherIcon(day.icon)} alt="condition" width={100} height={100} className="object-contain" />
                            <p className="text-white text-xl mb-4">{formatDate(day.datetime)}</p>
                            <p className="text-white">{day.temp}°F</p>
                        </div>
                    )
                })}
            </div>
            
        </div>
    )
}

export default Informations
