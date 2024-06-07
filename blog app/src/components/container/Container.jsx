import React from 'react'

// Container me styling properties define krte h
// Container ki values as it is display hoti h

function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>
    {children} </div>;
}

export default Container