import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, blog_data, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment';
import footer from '../components/Footer';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';



export default function Blog() {
  const { id } = useParams();

  const {axios} = useAppContext();


  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState([]);
const fetchBlogData = async () => {
  try {
    const { data } = await axios.get(`/api/blog/${id}`);
    console.log("Blog response:", data);
    if (data.success) {
      setData(data.blog);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Failed to fetch blog");
    console.error("Blog fetch error:", error);
  }
};


const fetchComments = async () => {
      try {
        const {data} = await axios.post('/api/blog/comments',{blogID: id});
        if (data.success) {
          setComments(data.comments);
        }
        else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
};


const addComment =async (e)=> {
      e.preventDefault();
      try {
        const {data} = await axios.post('/api/blog/add-comment',{blog: id,name,content});
        if (data.success) {
          toast.success(data.message);
          setName('');
          setContent('');
        }
        else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
  }
    // depend on `id` so it runs when route changes
    useEffect(() => {
      fetchBlogData();
      fetchComments();
    }, [id]);
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
          <p className='font-semibold mb-5'>Comments {comments.length}</p>
          <div className='flex flex-col gap-4'>
            {comments.map((item, index) => (
              <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                <div className='flex items-center gap-3 mb-2'>
                  <img className='w-6' src={assets.user_icon} alt="" />
                  <p className='font-medium'>{item.name}</p>
                  <p className='text-sm max-w-md ml-8'>{item.content}</p>
                  <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).format('MMMM Do YYYY')}</div>
                </div>
              </div>
            ))
          }
          </div>
        </div>

      {/* Add the Commeebt Section  */}
      <div className='max-w-3xl mx-auto'>
        <p className='font-semibold mb-4 '> Add Your Comment </p>
        <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full p-2 border border-gray-300 rounded outline-none ' required placeholder='Name' />
          <textarea onChange={(e) => setContent(e.target.value)} value={content}  required className='w-full p-2 border border-gray-300 rounded outline-none h-48 ' placeholder='Comment'></textarea>
          <button type='submit' className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Submit</button>
        </form>
      </div>
      {/* Share Buttons  */}
      <div className='my-24 max-w-3xl mx-auto'>
        <p className='font-semibold pm-4'>Share This Article in Social Media</p>
        <div className='flex'>
          <img src={assets.facebook_icon} alt="" />
          <img src={assets.twitter_icon} alt="" />
          <img src={assets.googleplus_icon} alt="" />
        </div>
      </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
}
