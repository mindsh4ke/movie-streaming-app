import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import MovieBanner from '../components/MovieBanner';
import { getMovieDetails, getMovieExtraData, getMovieVideos, getSimilarMovies } from '../core/api-methods';
import { LoadingView } from './LoadingView';
import MovieButton from '../components/MovieButton';
import { motion } from "framer-motion"
import Title from '../components/Title';

export default function MovieDetails() {
  const ref = useRef(true);
  let { id } = useParams();

  const [movie, setMovie] = useState(undefined);
  const [extraMovieData, setExtraMovieData] = useState(undefined);
  const [similarMovies, setSimilarMovies] = useState(undefined);

  useEffect(() => {
    const firstRender = ref.current;

    if (firstRender) {
      ref.current = false;

      Promise.all([getMovieDetails(id), getSimilarMovies(id)]).then(values => {
        console.log(values)
        setMovie(values[0]);
        setSimilarMovies(values[1].slice(0, 9));
        return values[0];
      }).then(movieResult => {
        getMovieExtraData(movieResult).then(result => {
          setExtraMovieData(result)
        })
      })
      //Get the popular movies
      /*getMovieDetails(id).then(movieResult => {
          setMovie(movieResult)

          //Get the most popular movie data
          getMovieExtraData(movieResult).then(extraMovieResult => {
            setExtraMovieData(extraMovieResult);
          });
      });*/
    }

  })

  if (movie != undefined && extraMovieData != undefined) {
    return (
      <div className='w-auto h-max overflow-hidden'>
        <MovieBanner showButtons={true} extraMovieData={extraMovieData} movieInfo={movie} />
        <div className='text-white z-20'>
          <motion.div
            initial={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.25, delay: 0.6 }}>
            <Title text='Similar' />
          </motion.div>
          <ul className='p-4 w-screen flex flex-row items-start justify-center overflow-hidden gap-x-4'>
            {
              similarMovies.map((item, key) => {
                return (
                  <motion.li
                    initial={{ opacity: 0, translateY: 10 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.25, delay: (0.05 * key) + 0.6 }}
                    key={key}
                    className='inline-table float-left'>
                    <MovieButton key={key} movieInfo={item} />
                  </motion.li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  } else {
    return (
      <LoadingView />
    )
  }
}

