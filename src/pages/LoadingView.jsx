import React from 'react'
import { ColorRing } from 'react-loader-spinner'

export const LoadingView = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center'>
        <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#E57373', '#BA68C8', '#4DB6AC', '#64B5F6', '#DCE775']}
        />
    </div>
  )
}
