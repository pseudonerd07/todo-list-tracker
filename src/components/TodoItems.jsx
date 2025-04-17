import React from 'react'
import {useState,useRef} from 'react'
import tick_icon from '../assets/tick.png'
import not_tick_icon from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'
export default function TodoItems({text,id,isComplete,deleteTodo,checkButton,deadline}) {

  return (
    <div className='flex items-center w-full mt-1 p-2  rounded-full  transition'>
        <div className='flex items-center flex-grow'>
            <img src={isComplete ? tick_icon : not_tick_icon} onClick={()=>checkButton(id)} alt="" className='size-4 mr-2 cursor-pointer hover:shadow-2xl hover:shadow-black' />
            <p className={` mr-10 flex-grow  text-lg text-black hover:text-gray-600 ${isComplete ? "line-through text-gray-400" : ""  } w-0 min-w-0 break-words whitespace-normal overflow-hidden`}>{text}</p>
            <p className={`text-sm  flex-0 ${isComplete ? "line-through text-gray-400" : ""  } mr-2  font-semibold mr-4  whitespace-nowrap
              ${new Date(deadline).setHours(0,0,0,0) < new Date().setHours(0,0,0,0) ? "text-red-800 " : new Date(deadline).toDateString() === new Date().toDateString() ? "text-orange-700" :"text-green-800"}`}>
                {new Date(deadline).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).replace(',', '')}</p>
        </div>
        <img src={delete_icon} alt="" onClick={()=>{deleteTodo(id)}} className='size-3 items-center mr-3  cursor-pointer  opacity-60 hover:opacity-100 transition-opacity duration-300' />
    </div>
  ) 
}
