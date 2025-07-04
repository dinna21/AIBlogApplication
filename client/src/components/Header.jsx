import React from 'react'
import { assets } from '../assets/assets'

export default function Header() {
  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
        <div className='text-center mt-20 mb-8'>
            <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary' >
                <p>New AI Feature Intergrated </p>
                <img src={assets.star_icon} className='w-2.5' alt="" />
            </div>
            <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>Your Own <span className='text-primary'>Blogging</span><br />Platform </h1>
            <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>
                Create, share and monetize your content with our AI-powered blogging platform.This is your space to express yourself, connect with others, and build a community around your ideas.
            </p>
            <form action="" className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 rounded-full px-4 py-2.5 bg-white shadow-md'>
                <input className='w-full pl-4 outline-none'  type="text" name='' placeholder='Search For blogs' required />
                <button className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer' type='submit'>Search</button>
            </form>
        </div>
        <img src={assets.gradientBackground} className='absolute -top-50 -z-1 opacity-50' alt="" />

    </div>
  )
}
