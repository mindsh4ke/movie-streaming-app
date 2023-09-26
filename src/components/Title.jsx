import React from 'react'
import PropTypes from 'prop-types'

const Title = props => {
  return (
    <div className='font-bold text-xl ml-8 relative h-6 text-white'>
        <h3 className='absolute'>{props.text}</h3>
    </div>
  )
}

Title.propTypes = {
    text: PropTypes.string
}

export default Title