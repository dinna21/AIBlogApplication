import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Addblog from './pages/admin/Addblog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import Dashboard from './pages/admin/Dashboard'
import Login from './components/admin/Login'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'



export default function App() {
  const {token} = useAppContext();
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />}/>
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          <Route path="addBlog" element={<Addblog />} />
          <Route path="ListBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
          <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  )
}
