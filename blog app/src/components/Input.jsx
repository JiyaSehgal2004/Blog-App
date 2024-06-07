import React, {useId} from 'react'

// useId is a React Hook for generating unique IDs that can be passed to accessibility attributes.


// React forwardRef allows parent components to move down (or “forward”) refs to their children. 
// It gives a child component a reference to DOM entity created by its parent component in React. 
// This helps the child to read and modify the element from any location where it is used.

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className='',
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
            className='inline-block mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref} // ye reference liya h user se as prop, ye reference degi parent component ke andar
                // isi ke liye forwardRef use kiya h
                // ref yahan se pass kiya jaega aur parent se state ka access liya jaega
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input
