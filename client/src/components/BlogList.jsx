import React, { useState } from 'react';
import { blogCategories } from '../assets/assets';
import { motion } from "framer-motion"; // not "motion/react"
import Blogcard from './Blogcard';
import { useAppContext } from '../context/AppContext';

export default function BlogList() {
  const [menu, setMenu] = useState('All');
  const { blogs, input } = useAppContext();

  const filteredBlogs = blogs
    .filter(blog =>
      input === '' ||
      blog.title.toLowerCase().includes(input.toLowerCase()) ||
      blog.category.toLowerCase().includes(input.toLowerCase())
    )
    .filter(blog => menu === 'All' || blog.category === menu);

  return (
    <div>
      <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
        {blogCategories.map((item) => (
          <div key={item} className='relative'>
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 pt-0.5'}`}>
              {item}
              {menu === item && (
                <motion.div
                  layoutId='underline'
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full '
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 xl:mx-20'>
        {filteredBlogs.map((blog) => (
          <Blogcard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
