import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Remixes from './pages/Remixes';
import Premium from './pages/Premium';
import DJs from './pages/DJs';
import { PlayerProvider } from './contexts/PlayerContext';

function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <Layout>
           <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/remixes" element={<Remixes />} />
              <Route path="/djs" element={<DJs />} />
              <Route path="/premium" element={<Premium />} />
           </Routes>
        </Layout>
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default App;
