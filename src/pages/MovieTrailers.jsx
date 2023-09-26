import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getHdImage, getMovieDetails, getMovieLogo, getMovieVideos, getPopularMovies, getVideo } from '../core/api-methods';
import { LoadingView } from './LoadingView';
import MovieBanner from '../components/MovieBanner';

export default function MovieTrailers() {
    const ref = useRef(true);
    let { id } = useParams();

    const [movie, setMovie] = useState(undefined);
    const [movieVideos, setMovieVideos] = useState(undefined);
    const [selectedVideo, setSelectedVideo] = useState(undefined);
    const [movieLogo, setMovieLogo] = useState("");

    useEffect(() => {
        const firstRender = ref.current;

        if (firstRender) {
            ref.current = false;

            Promise.all([getMovieDetails(id), getMovieVideos(id), getMovieLogo(id)]).then(values => {
                console.log(values)
                setMovie(values[0]);
                setMovieVideos(values[1]);
                setSelectedVideo(values[1][0]);
                setMovieLogo(values[2]);
            })
        }
    })

    if (movie != undefined && movieVideos != undefined) {
        return (
            <div className='w-auto h-max overflow-hidden flex flex-row'>
                <nav className='w-60 h-full overflow-y-auto'>
                    <div className='mx-4 h-24 bg-contain bg-no-repeat bg-center transition-all' style={{ backgroundImage: `url(${movieLogo})` }} />
                    {
                        movieVideos.map((item, key) => {
                            return (
                                <div className='cursor-pointer text-white p-2 hover:bg-neutral-800' onClick={() => setSelectedVideo(item)} key={key}>{item.name}</div>
                            )
                        })
                    }
                </nav>
                <iframe width='1445' height='812' src={getVideo(selectedVideo.key)}>
                </iframe>

            </div>
        )
    } else {
        return (
            <LoadingView />
        )
    }
}
