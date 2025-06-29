import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { blog_data } from '../assets/assets';
import Navbar from '../components/Navbar';

export default function Blog() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      const found = blog_data.find(item => item._id === id);
      setData(found);
    };
    fetchBlogData();
  }, [id]); // depend on `id` so it runs when route changes

  return data ? (
    <div>
      <Navbar />
      <div>

      </div>

      <div>
        
      </div>
    </div>
  ) : (
    <div>Loading…</div>
  );
}
