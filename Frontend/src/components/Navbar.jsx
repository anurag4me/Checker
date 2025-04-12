import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='flex p-5 justify-between items-center bg-zinc-800'>
        <Link to="/"><img className='w-12 h-12 object-cover rounded-full cursor-pointer' src="https://logos-world.net/wp-content/uploads/2023/07/Checker-Motors-Corporation-Logo.jpg" alt="" /></Link>
        
        <ul className='flex gap-3'>
            <li><Link className='btn rounded-xl bg-amber-200 p-2' to="/">Home</Link></li>
            <li><Link className='btn rounded-xl bg-amber-200 p-2' to="/about">About</Link></li>
            <li><Link className='btn rounded-xl bg-amber-200 p-2' to="/contact">Contact</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar