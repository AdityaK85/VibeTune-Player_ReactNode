import React, { useEffect } from 'react'
import { Index } from './pages'
import { ViewDetails } from './pages/viewDetails'
import { Base } from './Admin/components/Base'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom' 
import { PodcastCard } from './pages/components/podcastCard';
import { Dashboard } from './Admin/pages/Dashboard'
import { AddArtists } from './Admin/pages/AddArtists'
import { Music } from './Admin/pages/Music'
import { NewMusic } from './Admin/pages/NewMusic'
import { MusicPlayerProvider } from './pages/components/MusicPlayerContext';


export const Routing = () => {
  
  return (
      <MusicPlayerProvider>
        <Router>
            <Routes>
              {/* Website urls */}
                <Route path='/'  element={<Index />} >
                  <Route index  element={<PodcastCard />} />
                  <Route path='/view-details'  element={<ViewDetails />} />
                </Route>

              {/* Admin panel urls */}
              <Route path="/admin" element={<Base />}  >
                <Route path='home' element={<Dashboard />} />
                <Route path='add-artist' element={<AddArtists />} />
                <Route path='music-list' element={<Music />} />
                <Route path='new-music' element={<NewMusic />} />
              </ Route>
              
            </Routes>
        </Router>
    </MusicPlayerProvider>
  )
}