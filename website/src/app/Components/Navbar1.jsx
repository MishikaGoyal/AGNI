import React from 'react'
import Navbar from './Navbar'

function Navbar1({text}) {
  return (
    <nav className='bg-gray-900 text-white h-[60px] flex items-center'>
      <div className='w-full px-4'>
        <ul className='flex justify-start'>
          <li>
            <h1 className="text-xl font-semibold tracking-tight">WELCOME {text}</h1>
          </li>
        </ul>
        
      </div>
    </nav>


  )
}


export default Navbar1