import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import CardSlider from './CardSlider/CardSlider'
import BannerSlider from './BannerSlider/BannerSlider'

export default function App() {
  return (
   <BrowserRouter>
   <Routes>
      <Route path='/' element={<CardSlider/>}/>
      <Route path='/banner' element={<BannerSlider/>}/>
   </Routes>
   </BrowserRouter>
  )
}
