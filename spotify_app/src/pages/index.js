import React from 'react'
import { Header } from './layout/header';
import { Outlet } from 'react-router-dom';
import MusicPlayer from './components/MusicPlayer';



export const Index = () => {
  return (
    <>
        <Header />

        <div className='container-fluid' >
            <Outlet />
        </div>
        <MusicPlayer />
    </>
  )
}
