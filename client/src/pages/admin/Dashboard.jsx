import React, { useEffect, useState } from 'react'
import { assets,dashboard_data } from '../../assets/assets'
import BlogTableItems from '../../components/admin/BlogTableItems';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [dashBoardData, setdashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      console.log('Fetching dashboard data...'); // Debug log
      const { data } = await axios.get('/api/admin/dashboard');
      
      console.log('API Response:', data); // Debug log
      
      if (data.success) {
        console.log('Dashboard data:', data.dashBoardData); // Debug log
        setdashboardData(data.dashBoardData);
      } else {
        console.error('API Error:', data.message); // Debug log
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Fetch Error:', error); // Debug log
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  // Debug log for render
  console.log('Current dashboardData state:', dashBoardData);

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashBoardData.blogs}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
          </div>
        </div>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashBoardData.comments}</p>
            <p className='text-gray-400 font-light'>Comments</p>
          </div>
        </div>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashBoardData.drafts}</p>
            <p className='text-gray-400 font-light'>Drafts</p>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
        <img src={assets.dashboard_icon_4} alt="" />
        <p>Latest Blogs</p>
      </div>
      <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-600 text-left uppercase'>
            <tr>
              <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
              <th scope='col' className='px-2 py-4'>Blog Title</th>
              <th scope='col' className='px-2 py-4'>Date</th>
              <th scope='col' className='px-2 py-4'>Status</th>
              <th scope='col' className='px-2 py-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dashBoardData.recentBlogs && dashBoardData.recentBlogs.length > 0 ? (
              dashBoardData.recentBlogs.map((blog, index) => {
                return <BlogTableItems key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
              })
            ) : (
              <tr>
                <td colSpan="5" className="px-2 py-4 text-center text-gray-400">
                  {dashBoardData.recentBlogs ? 'No blogs found' : 'Loading...'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}