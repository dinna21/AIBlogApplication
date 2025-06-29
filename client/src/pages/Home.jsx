import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import NewsLetter from '../components/NewsLetter'

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <BlogList />
      <NewsLetter />
    </>
  )
}
