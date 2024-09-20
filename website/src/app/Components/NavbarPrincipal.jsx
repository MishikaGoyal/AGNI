
import Link from 'next/link';

import { FaHome } from "react-icons/fa";

function Navbar() {




  return (
    <navbar  className=''>
    <div className='bg-slate-50 text-black h-[60px]  '>
      <ul>
       <Link href='/principal'>  <li className=' hover:text-blue-300 '><FaHome className='text-2xl ml-[10px]' /></li></Link>
      </ul>
      <ul className='flex space-x-6 ml-[20px] justify-center '>
    
   <Link href='/principal/structure'> <li className='mt-[10px] hover:text-blue-300'>Know Structure</li></Link>
    <Link href='/principal/Progress'><li className='mt-[10px] hover:text-blue-300'>Make Updates</li></Link>
   <Link href='/principal/algorithm'> <li className='mt-[10px]  hover:text-blue-300'>Check Resources</li></Link>
   <Link href='/principal/Guidelines'><li className='mt-[10px]  hover:text-blue-300'>Guidelines</li></Link>
   
      </ul>
      <ul className='justify-end'>
       <Link href='/'><li className='ml-[1300px] -mt-[40px]' > <button className=' text-black hover:text-white hover:bg-black  p-2  '>Signout</button></li></Link> 
      </ul>
    </div>
  </navbar>
  )
}

export default Navbar