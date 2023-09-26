import React from 'react'
import PropTypes from 'prop-types'
import { getImage } from '../core/api-methods'
import { useNavigate } from 'react-router-dom';

const MovieButton = props => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/movie/${props.movieInfo.id}`);
    window.location.reload(false);
  }

  return (
    <div onClick={handleClick} onMouseEnter={props.onHover} className={`cursor-pointer flex flex-col-reverse text-white w-48 h-64 rounded-2xl relative bg-cover bg-center transition-all duration-200 hover:ring-4 hover:ring-white hover:scale-105 ${props.className}`} style={{backgroundImage: `url(${getImage(props.movieInfo.poster_path)})`}}>
      
    </div>
  )
}

MovieButton.propTypes = {
    movieInfo: PropTypes.object,
    onHover: PropTypes.func,
    className: PropTypes.string
}

export default MovieButton