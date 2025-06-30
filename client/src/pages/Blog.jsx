import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, blog_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment';


export default function Blog() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      const found = blog_data.find(item => item._id === id);
      setData(found);
    };
    fetchBlogData();
  }, [id]); // depend on `id` so it runs when route changes
  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} className='absolute -top-50 -z-1 opacity-50' alt="" />
      <Navbar />
      <div className='text-center mt-20 text-gray-500'>
        <p className='text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Michel Brown</p>
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'> 
        <img src={data.image} className='rounded-3xl mb-5' alt="" />
        <div className='rich-text max-w-3xl md:mx-auto my-10 mt-6' dangerouslySetInnerHTML={{__html: data.description}}>
        </div>

        {/* Commets section */}
        <div className='mt-14 mb-10 max-w-3xl mx:auto'>
          <p>

          </p>
        </div>


      </div>
    </div>
  ) : (
    <div>Loading…</div>
  );
}
