import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

export default function Sidebar() {
  return (
    <div>
      <NavLink
        end={true}
        to='/admin'
        className={({ isActive }) =>
          `flex items-center gap-3 py-4 px-4 md:px-10 md:min-w-64 rounded-md cursor-pointer
          transition-all duration-300 ease-in-out
          hover:bg-primary/5 hover:border-r-4 hover:border-primary
          ${isActive && 'bg-primary/10 border-r-4 border-primary'}`
        }
      >
        <img src={assets.home_icon} alt="Home icon" className='min-w-5 w-6 transition-transform duration-300 group-hover:scale-105' />
        <p className=' md:inline-block text-sm font-medium'>Dashboard</p>
      </NavLink>
      <NavLink
        end={true}
        to='/admin/addblog'
        className={({ isActive }) =>
          `flex items-center gap-3 py-4 px-4 md:px-10 md:min-w-64 rounded-md cursor-pointer
          transition-all duration-300 ease-in-out
          hover:bg-primary/5 hover:border-r-4 hover:border-primary
          ${isActive && 'bg-primary/10 border-r-4 border-primary'}`
        }
      >
        <img src={assets.add_icon} alt="Home icon" className='min-w-5 w-6 transition-transform duration-300 group-hover:scale-105' />
        <p className=' md:inline-block text-sm font-medium'>Add Blog</p>
      </NavLink>
      <NavLink
        end={true}
        to='/admin/listblog'
        className={({ isActive }) =>
          `flex items-center gap-3 py-4 px-4 md:px-10 md:min-w-64 rounded-md cursor-pointer
          transition-all duration-300 ease-in-out
          hover:bg-primary/5 hover:border-r-4 hover:border-primary
          ${isActive && 'bg-primary/10 border-r-4 border-primary'}`
        }
      >
        <img src={assets.list_icon} alt="Home icon" className='min-w-5 w-6 transition-transform duration-300 group-hover:scale-105' />
        <p className=' md:inline-block text-sm font-medium'>List Blog</p>
      </NavLink>

      <NavLink
        end={true}
        to='/admin/comments'
        className={({ isActive }) =>
          `flex items-center gap-3 py-4 px-4 md:px-10 md:min-w-64 rounded-md cursor-pointer
          transition-all duration-300 ease-in-out
          hover:bg-primary/5 hover:border-r-4 hover:border-primary
          ${isActive && 'bg-primary/10 border-r-4 border-primary'}`
        }
      >
        <img src={assets.comment_icon} alt="Home icon" className='min-w-5 w-6 transition-transform duration-300 group-hover:scale-105' />
        <p className=' md:inline-block text-sm font-medium'>comments</p>
      </NavLink>
    </div>
  )
}