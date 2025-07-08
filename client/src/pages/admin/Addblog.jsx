import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../../assets/assets'
import Quill from 'quill'
export default function Addblog() {
  const editorRef = useRef(null)
  const quillRef = useRef(null)
  const [image,setImage] = useState(false)
  const [title,setTitle] = useState('')
  const [subTitle,setSubTitle] = useState('')
  const [catogery,setCatogery] = useState('Startup')
  const [isPublished,setIspublished] = useState(false)
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  }
  // for generating ai automated the blog discrioption 
  const generateContent = async (e) => {

  }
  useEffect(()=> {
      if(!quillRef.current && editorRef.current)
      {
        quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
      }
  },[])

  return (
    <form  onSubmit={onSubmitHandler} action="" className='flex-1 p-15 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 shadow rounded '>
        <p>Upload Thubnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image) }  alt="" className='mt-2 h-16 rounded cursor-pointer' />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </label>
        <p className='mt-4'>Blog Title</p>
        <input type="text" placeholder='Type Here ' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={e=>setTitle(e.target.value)} value={title} />
        
        <p className='mt-4'>Sub Title</p>
        <input type="text" placeholder='Type Here ' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={e=>setSubTitle(e.target.value)} value={subTitle} />

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 pt-2 relative '>
              <div ref={editorRef}>
              </div>
              <button type='button' className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer' onClick={generateContent}>Generate With AI</button>
        </div>
        
      </div>
    </form>
  )
}
