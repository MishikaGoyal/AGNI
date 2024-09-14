import React from 'react'
import Navbar from './Navbar'

function Navbar1() {
  return (
    <nav className='bg-gray-900 text-white h-[60px] flex items-center'>
      <div className='w-full max-w-screen-xl mx-auto px-4'>
        <ul className='flex justify-self-start w-full'>
          <li>
            <h1 className="text-xl font-semibold tracking-tight">WELCOME PRINCIPAL</h1>
          </li>
        </ul>
      </div>
    </nav>

  )
}


export default Navbar1