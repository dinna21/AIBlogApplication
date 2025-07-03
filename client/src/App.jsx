import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Addblog from './pages/admin/Addblog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import Dashboard from './pages/admin/Dashboard'


export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={<Layout />}>
          <Route path="addBlog" element={<Addblog />} />
          <Route path="ListBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  )
}
