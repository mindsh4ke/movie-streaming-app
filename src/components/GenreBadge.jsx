import React from 'react'
import PropTypes from 'prop-types'

const GenreBadge = props => {
  return (
    <div className='text-sm px-2 py-1 rounded-full backdrop-blur-md bg-neutral-400 bg-opacity-40'>
        {props.text}
    </div>
  )
}

GenreBadge.propTypes = {
    text: PropTypes.string
}

export default GenreBadge