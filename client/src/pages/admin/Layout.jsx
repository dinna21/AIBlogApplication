import React, { use } from 'react'
import { assets } from '../../assets/assets'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import { useAppContext } from '../../context/AppContext'

export default function Layout() {

  const {axios,setToken,navigate} = useAppContext();

  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null);
    navigate('/');
  }
  return (
    <>
        <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-400'>
        <img src={assets.logo} alt="" className='w-32 sm:w-40 cursor-pointer' onClick={() => navigate('/') } />
        <  button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
        </div>

        <div className='flex h-[calc(100vh-70px)]'>
            <Sidebar />
            <Outlet />
            {/* add the child elements in the app.jsx file  */}
        </div>
    </>
  )
}
