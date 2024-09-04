import React from 'react';

const now = new Date();
const year = now.getFullYear()

const Footer = () => {
    return (
        <footer className="w-full flex flex-col items-center justify-center py-2 relative top-64 bg-gray-300 rounded-md rounded-r-none bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30">
            <p className="text-sm text-white">Weather App</p>
            <p className="text-sm text-white">Made by Charles Guelton</p>
            <p className="text-sm text-white">{year}</p>
        </footer>
    )
}

export default Footer
