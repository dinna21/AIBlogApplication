import React, { useState } from 'react'
import { assets } from '../../assets/assets'

export default function Addblog() {
  const [image,setImage] = useState(false)
  const [title,setTitle] = useState('')
  const [subTitle,setSubTitle] = useState('')
  const [catogery,setCatogery] = useState('Startup')
  const [isPublished,setIspublished] = useState(false)
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  }
  return (
    <form  onSubmit={onSubmitHandler} action="" className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 shadow rounded '>
        <p>Upload Thubnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image) }  alt="" className='mt-2 h-16 rounded cursor-pointer' />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </label>
      </div>
    </form>
  )
}
