/**
 * Button component where classnames for variability passed as props
 */

import { FaArrowRight } from "react-icons/fa";

export const Button = ({bgColor, textColor, name, vis="none", width="w-22", hover="hover:bg-transparent"})=>{
    return(
        <div className={`${bgColor} rounded-3xl p-2 ${width} md:w-32 h-12 ${textColor} cursor-pointer flex items-center justify-center gap-2 ${hover} hover:text-zinc-700 duration-200 delay-100"`}>
            <p className="text-xs md:text-sm text-center font-man">{name}</p>
            <FaArrowRight style={{display:`${vis}`}}/>
        </div>

    )
  
}

