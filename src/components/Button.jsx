import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const Button = props => {

    function colors () {
        if (props.variation == ButtonVariations.Accent) {
            return "bg-blue-950 hover:bg-black hover:ring-2 hover:ring-white"
        } else if (props.variation == ButtonVariations.Seconday){
            return "backdrop-blur-md bg-neutral-400 bg-opacity-40 hover:bg-slate-600 hover:bg-opacity-100"
        } else if (props.variation == ButtonVariations.Icon) {
            return "";
        }
    }

  return (
    <div onClick={props.onClick} className={`flex flex-row items-center gap-x-2 cursor-pointer p-4 w-max rounded-2xl text-white font-bold transition-all hover:scale-105 active:scale-95 ${colors()}`}>
        <span class="material-symbols-rounded ">{props.icon}</span>{props.text}
    </div>
  )
}

Button.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string,
    variation: PropTypes.string,
    onClick: PropTypes.func
}

export const ButtonVariations = {
    Accent: "accent",
    Seconday: "secondary",
    Icon: "icon"
}
export default Button
