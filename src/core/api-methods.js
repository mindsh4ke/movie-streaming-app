import { getMethodOptions } from "../configuration";

const langComplex = "en-US";
const langSimple = "en";

/**
 * Gets popular movies
 * @returns Array with json data
 */
export function getPopularMovies() {
    return new Promise(
        resolve => {
            let result;
            fetch(`https://api.themoviedb.org/3/movie/popular?language=${langComplex}&page=1`, getMethodOptions)
                .then(response => response.json())
                .then(response => {
                    return resolve(response.results);
                })
                .catch(err => console.error(err));

        }
    );
}

/**
 * Gets movie details by id
 * @returns Array with json data
 */
export function getMovieDetails(id) {
    return new Promise(
        resolve => {
            let result;
            fetch(`https://api.themoviedb.org/3/movie/${id}?language=${langComplex}`, getMethodOptions)
                .then(response => response.json())
                .then(response => {
                    return resolve(response);
                })
                .catch(err => console.error(err));

        }
    );
}

/**
 * Get the similar movies based on genres and keywords.
 * @param {int} id Movie Id
 * @returns List of similar movies
 */
export function getSimilarMovies(id) {
    return new Promise(
        resolve => {
            let result;
            fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=${langComplex}&page=1`, getMethodOptions)
                .then(response => response.json())
                .then(response => {
                    return resolve(response.results);
                })
                .catch(err => console.error(err));

        }
    );
}

export function getMovieVideos(id) {
    return new Promise(
        resolve => {
            let result;
            fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=${langComplex}&page=1`, getMethodOptions)
                .then(response => response.json())
                .then(response => {
                    return resolve(response.results.filter(x => x.type == "Trailer"));
                })
                .catch(err => console.error(err));

        }
    );
}

/**
 * Gets movie extra data
 * @param {object} movieData 
 * @returns Object
 */
export function getMovieExtraData(movieData) {
    return new Promise(
        resolve => {
            let result;
            fetch(`https://api.themoviedb.org/3/movie/${movieData.id}/images`, getMethodOptions)
                .then(response => response.json())
                .then(response => {
                    getMovieGenres().then(genres => {
                        if (movieData.genre_ids == undefined) {
                            result = {
                                logo: response.logos.filter(x => x.iso_639_1 == 'en' && !x.file_path.includes('.svg'))[0],
                                genres: movieData.genres
                            }
                        } else {
                            result = {
                                logo: response.logos.filter(x => x.iso_639_1 == 'en' && !x.file_path.includes('.svg'))[0],
                                genres: genres.genres.filter(x => movieData.genre_ids.includes(x.id))
                            }
                        }

                        return resolve(result);
                    })


                })
                .catch(err => console.error(err));
        }
    )
}

/**
 * Gets the url logo path of a movie by its id
 * @param {int} id Movie Id
 * @returns Logo Url Path
 */
export function getMovieLogo(id) {
    return new Promise(
        resolve => {
            fetch(`https://api.themoviedb.org/3/movie/${id}/images`, getMethodOptions)
                .then(response => response.json())
                .then(response => {
                    return resolve(
                        getImage(response.logos.filter(x => x.iso_639_1 == 'en' && !x.file_path.includes('.svg'))[0].file_path)
                    );
                })
        }
    );
}

export function getMovieGenres() {
    return new Promise(
        resolve => {
            let result;
            fetch(`https://api.themoviedb.org/3/genre/movie/list?language=${langSimple}`, getMethodOptions)
                .then(response => response.json())
                .then(response => {
                    return resolve(response);
                })
                .catch(err => console.error(err));
        }
    )
}

export function getImage(backdropPath) {
    return `https://image.tmdb.org/t/p/w500${backdropPath}`
}

export function getHdImage(backdropPath) {
    return `https://image.tmdb.org/t/p/original${backdropPath}`
}

export function getVideo(videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=es&modestbranding=1&fs=1&autohide=1`
}