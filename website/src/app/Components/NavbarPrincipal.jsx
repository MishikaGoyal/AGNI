
import SearchBar from './Searchbar'
import { FaHome } from "react-icons/fa";

function Navbar() {




  return (
    <navbar  className=''>
    <div className='bg-slate-50 text-black h-[60px]  '>
      <ul>
         <li className=' hover:text-blue-300 '><FaHome  /></li>
      </ul>
      <ul className='flex space-x-6 ml-[20px] justify-center '>
    
    <li className='mt-[10px] hover:text-blue-300'>Know Structure</li>
    <li className='mt-[10px] hover:text-blue-300'>Make Updates</li>
    <li className='mt-[10px]  hover:text-blue-300'>Check Resources</li>
   
      </ul>
      <ul className='justify-end'>
        <li className='ml-[1300px] -mt-[20px]' > <button className=' text-black hover:text-white hover:bg-black  p-2  '>Signout</button></li>
      </ul>
    </div>
  </navbar>
  )
}

export default Navbar