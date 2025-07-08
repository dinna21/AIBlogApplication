import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
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
  <form onSubmit={onSubmitHandler} action="" className='flex-1 p-10 sm:p-16 bg-gradient-to-br from-blue-100 via-white to-blue-50 text-gray-700 h-full overflow-y-auto'>
    <div className='bg-white w-full max-w-3xl mx-auto p-6 sm:p-10 shadow-xl rounded-lg transition-all duration-300'>
      <p className='text-lg font-semibold mb-2'>Upload Thumbnail</p>
      <label htmlFor="image" className='block'>
        <img 
          src={!image ? assets.upload_area : URL.createObjectURL(image)}  
          alt="" 
          className='mt-2 h-20 sm:h-24 w-full object-cover rounded-lg border-2 border-dashed border-gray-300 hover:border-primary cursor-pointer transition-all duration-200' 
        />
        <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
      </label>

      <p className='mt-6 text-lg font-semibold'>Blog Title</p>
      <input 
        type="text" 
        placeholder='Type Here' 
        required 
        className='w-full max-w-lg mt-2 p-3 border border-gray-300 focus:border-primary outline-none rounded-lg shadow-sm transition-all duration-150' 
        onChange={e => setTitle(e.target.value)} 
        value={title} 
      />

      <p className='mt-6 text-lg font-semibold'>Sub Title</p>
      <input 
        type="text" 
        placeholder='Type Here' 
        required 
        className='w-full max-w-lg mt-2 p-3 border border-gray-300 focus:border-primary outline-none rounded-lg shadow-sm transition-all duration-150' 
        onChange={e => setSubTitle(e.target.value)} 
        value={subTitle} 
      />

      <p className='mt-6 text-lg font-semibold'>Blog Description</p>
      <div className='max-w-lg h-74 pb-16 pt-2 relative rounded-lg border border-gray-200 shadow-inner'>
        <div ref={editorRef} className='px-3 py-2'></div>
        <button 
          type='button' 
          className='absolute bottom-2 right-2 text-xs text-white bg-primary px-4 py-1.5 rounded-lg shadow hover:bg-primary-dark focus:ring-2 focus:ring-offset-1 focus:ring-primary transition-all duration-200 cursor-pointer' 
          onClick={generateContent}
        >
          ✨ Generate With AI
        </button>
      </div>

      <p className='mt-6 text-lg font-semibold'>Blog Category</p>
      <select 
        className='mt-2 px-4 py-3 border border-gray-300 focus:border-primary text-gray-600 outline-none rounded-lg shadow-sm w-full max-w-lg transition-all duration-150' 
        onChange={e => setCatogery(e.target.value)} 
        name="category"
      >
        <option value="">Select category</option>
        {blogCategories.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>

      <div className='flex items-center gap-3 mt-6'>
        <p className='text-lg'>Publish Now</p>
        <input 
          type="checkbox" 
          checked={isPublished} 
          className='scale-125 cursor-pointer accent-primary' 
          onChange={e => setIspublished(e.target.checked)} 
        />
      </div>

      <button 
        className='mt-10 w-44 h-11 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-md text-base font-medium transition-all duration-200 cursor-pointer' 
        type='submit'
      >
        🚀 Add Blog
      </button>
    </div>
  </form>

  )
}
