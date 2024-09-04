import React from 'react'

const Background = () => {

    return (
        <div>
            <video autoPlay muted loop className="object-cover w-full h-full fixed z-[-1]" >
                <source src="/sun-bg.mp4"></source>
            </video>
        </div>
    )
}

export default Background;
