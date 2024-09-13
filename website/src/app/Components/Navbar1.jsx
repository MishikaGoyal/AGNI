import React from 'react'
import Navbar from './Navbar'

function Navbar1() {
  return (
    <navbar >
    <div className='bg-gray-900 text-white h-[60px]'>
      <ul className='justify-between'>
       <li> <h1 className="tracking-in-expand-fwd ml-[40px]  text-xl">WELCOME BACK!!</h1></li>
        <li className='-mt-[10px]'><button className='ml-[1300px] -mt-[90px] text-white hover:text-black p-2 hover:bg-white'>Signout</button></li>
      </ul>
    </div>
  </navbar>
  )
}


export default Navbar1