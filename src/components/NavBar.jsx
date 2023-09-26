import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';

export default function NavBar() {

    const [scrollPosition, setScrollPosition] = useState(0);
    const navigate = useNavigate();
    let location = useLocation();

    let isHome = () => {
        return location.pathname == "/";
    };

    const handleScroll = () => {
        const pos = window.scrollY;
        setScrollPosition(pos);
    }

	const goBack = () => {
		navigate(-1);
	}

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location]);

    const backButton = () => {
        if (!isHome()) {
            return <Button onClick={goBack} icon='arrow_back'/>
        }
        return <span></span>
    }

    const navContent = () => {
        return (
            <div className='flex flex-row items-center'>{backButton()} Movies test</div>
        )
    }

    return (
        <div>
            <nav className='z-30 w-screen h-14 bg-neutral-900 flex flex-row gap-x-2 items-center px-2 text-white'>{navContent()}</nav>
            {
                scrollPosition > 150 &&
                <motion.div
                    initial={{ translateY: -200 }}
                    animate={{ translateY: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className='fixed top-0 z-30 w-screen h-14 bg-neutral-950 bg-opacity-40 backdrop-blur-md flex flex-row gap-x-2 items-center px-2 text-white'>
                        {navContent()}
                </motion.div>
            }
        </div>
    )
}
