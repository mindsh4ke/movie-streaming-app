import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getImage, getMovieExtraData, getPopularMovies } from '../core/api-methods'
import MovieButton from '../components/MovieButton';
import MovieBanner from '../components/MovieBanner';
import { LoadingView } from './LoadingView';
import { motion } from "framer-motion"
import Title from '../components/Title';

export default function Home() {
    const ref = useRef(true);

    const [popularMovies, setPopularMovies] = useState([]);
    const [mostPopularData, setMostPopularData] = useState(undefined);

    useEffect(() => {
        const firstRender = ref.current;

        if (firstRender) {
            ref.current = false;

            //Get the popular movies
            getPopularMovies().then(popularResult => {
                setPopularMovies(popularResult)

                //Get the most popular movie data
                getMovieExtraData(popularResult[0]).then(mostPopularResult => {
                    console.log(mostPopularResult);
                    setMostPopularData(mostPopularResult);
                });
            });
        }

    })


    if (popularMovies.length > 0 && mostPopularData != undefined) {
        return (
            <div className='w-auto h-max overflow-hidden'>
                <MovieBanner showButtons={false} extraMovieData={mostPopularData} movieInfo={popularMovies[0]} />
                <Title text={'Popular'} />
                <div className='flex flex-wrap items-start justify-center gap-4 mt-4'>
                    {
                        popularMovies.map((item, key) => {
                            return (
                                <motion.div
                                    initial={{ opacity: 0, translateY: 10 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{ duration: 0.25, delay: (0.05 * key) + 0.6 }}>
                                    <MovieButton key={key} movieInfo={item}></MovieButton>
                                </motion.div>

                            )
                        })
                    }
                </div>
            </div>
        )
    }

    return <LoadingView />

}
