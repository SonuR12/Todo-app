import React from 'react'

const NavBar = () => {
  return (
    <div className='flex items-center justify-between bg-violet-500 text-white p-2 sm:p-4 xl:px-36 sm:text-lg fixed top-0 w-full z-10'>
        <ul className='hover:cursor-pointer'>
            <li>Your ToDo...</li>
        </ul>
      {/* <ul className='flex sm:gap-8 gap-2 hover:cursor-pointer'>
        <li>Home</li>
        <li>Tasks</li>
        <li>Deleted</li>
      </ul> */}
    </div>
  )
}

export default NavBar
