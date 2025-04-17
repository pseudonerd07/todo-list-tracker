import React from 'react'
import {useState,useRef} from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'
import { useEffect } from 'react'
export default function Todo() {
    const inputRef = useRef()
    const dateRef = useRef()
    const [TodoList,setTodoList] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);
    const add=() =>{
        const text = inputRef.current.value.trim(); 
        const deadline = dateRef.current.value
        console.log(text)
        if(text === "" || deadline === "")return null;
        const tododata = {
            id:Date.now(),
            deadline:new Date(deadline),
            text:text,
            isComplete:false
        }
        setTodoList((prev)=>[...prev,tododata])
        inputRef.current.value=""
    }
    
    const deleteTodo = (id)=>{
        setTodoList((prevTodosArray)=>{
            return prevTodosArray.filter((todoData)=> todoData.id !== id)
        })
    }

    const checkButton = (id)=>{
        setTodoList((prevTodosArray)=>
            prevTodosArray.map(todo=>
                todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
            )
        )
    }
    
    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(TodoList));
    },[TodoList]);
  
  
    return (
    <div className='bg-white place-self-center w-full max-w-md flex flex-col p-7 min-h-[550px] rounded-xl '>
        <div className='flex  items-center '>
            <img  className='ml-2.5 size-8' src={todo_icon} alt="todo-img" />
            <h1 className='font-semibold text-3xl'>To-Do List</h1>
        </div>  

        <div className='flex items-center w-full p-2 mt-3 mb-3'>
            <input ref={inputRef} type="text" placeholder='What to-do?' className='text-gray-400 w-auto flex-grow border outline-none border-gray-300 rounded-full p-2 caret-orange-400' />
            <input  ref={dateRef} type="date"  className='text-gray-400 ml-1 pt-2 w-[37px] border cursor-pointer outline-none border-gray-300 rounded-full p-2 ' />
            <button onClick={add} className='cursor-pointer  bg-orange-500 hover:bg-orange-700 active:bg-orange-200 active:text-gray-800 rounded-4xl px-4 py-2 ml-2 text-white transition'>Add</button>
        </div>

        {TodoList.slice().sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .map((item, index) => (
            <TodoItems 
                key={index} 
                text={item.text} 
                id={item.id} 
                isComplete={item.isComplete} 
                deadline={item.deadline} 
                deleteTodo={deleteTodo} 
                checkButton={checkButton} 
            />
        ))}
    </div>

    
  )
}
