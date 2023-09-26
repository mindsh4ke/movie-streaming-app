import React from 'react'
import PropTypes from 'prop-types'
import { getHdImage, getImage } from '../core/api-methods'
import Button, { ButtonVariations } from './Button'
import GenreBadge from './GenreBadge'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

const MovieBanner = props => {

    const navigate = useNavigate();
    const handleViewTrailers = () => {
        navigate(`/MovieTrailers/${props.movieInfo.id}`);
    }

    return (
        <div className='w-full h-[60vh] relative'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className='w-full h-[80vh] bg-cover bg-center duration-700 absolute z-0'
                style={{ backgroundImage: `url(${getHdImage(props.movieInfo.backdrop_path)})` }}>

                <div className='absolute w-full h-80 left-0 bottom-0 bg-gradient-to-b from-transparent to-neutral-900'></div>
                <div className='absolute w-1/2 h-80 left-0 top-0 bg-gradient-to-tl from-transparent from-50% to-neutral-900'></div>

            </motion.div>

            <div className='absolute top-12 left-12 text-white'>
                <motion.img
                    initial={{ translateY: -10, opacity: 0 }}
                    animate={{ translateY: 0, opacity: 1 }}
                    transition={{ duration: 0.25, ease: 'easeInOut', delay: 0.1 }}
                    className='h-32'
                    src={getImage(props.extraMovieData.logo.file_path)} />


                <motion.div
                    initial={{ translateY: -10, opacity: 0 }}
                    animate={{ translateY: 0, opacity: 1 }}
                    transition={{ duration: 0.25, ease: 'easeInOut', delay: 0.2 }}
                    className='flex flex-row items-center gap-x-2 mt-4'>

                    <div className='font-bold'>
                        <span className='text-lg mr-4'>
                            <span class="material-symbols-rounded">schedule</span>
                            {props.movieInfo.release_date.split("-")[0]}
                        </span>
                        <span className='text-lg'>
                            <span class="material-symbols-rounded">thumb_up</span>
                            {props.movieInfo.vote_average * 10}
                            </span>
                        <span className='text-sm'>%</span>
                    </div>
                    {
                        props.extraMovieData.genres.map((item, key) => {
                            return (
                                <GenreBadge key={key} text={item.name} />
                            )
                        })
                    }
                </motion.div>

                <motion.div
                    initial={{ translateY: -10, opacity: 0 }}
                    animate={{ translateY: 0, opacity: 1 }}
                    transition={{ duration: 0.25, ease: 'easeInOut', delay: 0.3 }}
                    className='text-md opacity-70 w-[30vw] mt-4'>{props.movieInfo.overview}</motion.div>

                {
                    props.showButtons &&
                    <motion.div
                        className='flex flex-row gap-x-4 mt-4'
                        initial={{ translateY: -10, scaleY: 0 }}
                        animate={{ translateY: 0, scaleY: 1 }}
                        transition={{ duration: 0.25, ease: 'easeInOut', delay: 0.4 }}>

                        <Button variation={ButtonVariations.Accent} icon='live_tv' text={"Watch this movie"} />
                        <Button onClick={handleViewTrailers} variation={ButtonVariations.Seconday} icon='slideshow' text={"Watch Trailer"} />
                        <Button variation={ButtonVariations.Seconday} icon='movie' text={"Rent this movie 4.99€"} />

                    </motion.div>
                }
            </div>

        </div>
    )
}

MovieBanner.propTypes = {
    movieInfo: PropTypes.object,
    extraMovieData: PropTypes.object,
    showButtons: PropTypes.bool
}

export default MovieBanner