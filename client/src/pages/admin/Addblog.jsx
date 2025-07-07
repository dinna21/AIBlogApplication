import React, { useState } from 'react'
import { assets } from '../../assets/assets'

export default function Addblog() {
  const [image,setImage] = useState(false)
  const [title,setTitle] = useState('')
  const [subTitle,setSubTitle] = useState('')
  const [catogery,setCatogery] = useState('Startup')
  const [isPublished,setIspublished] = useState(false)
  return (
    <form action="" className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 shadow rounded '>
        <p>Upload Thubnail</p>
        <label htmlFor="image">
          <img src={assets.upload_area}  alt="" className='mt-2 h-16 rounded cursor-pointer' />
          <input type="file" id='image' hidden required />
        </label>
      </div>
    </form>
  )
}
